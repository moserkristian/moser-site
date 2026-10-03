@description('Azure region. West Europe suits a Bratislava operator and hosts Static Web Apps.')
param location string = 'westeurope'

@description('Short name used in resource names.')
@minLength(3)
@maxLength(10)
param namePrefix string = 'moser'

@description('Free SKU only. Do not change to Standard unless you mean to leave the free tier.')
@allowed([
  'Free'
])
param staticWebAppSku string = 'Free'

var suffix = uniqueString(resourceGroup().id)
var storageName = take(replace('st${namePrefix}${suffix}', '-', ''), 24)
var staticWebAppName = 'stapp-${namePrefix}-${suffix}'
var workspaceName = 'log-${namePrefix}-${suffix}'
var appInsightsName = 'appi-${namePrefix}-${suffix}'
var tags = {
  project: 'moser-site'
}

resource workspace 'Microsoft.OperationalInsights/workspaces@2022-10-01' = {
  name: workspaceName
  location: location
  tags: tags
  properties: {
    sku: {
      name: 'PerGB2018'
    }
    retentionInDays: 30
  }
}

resource appInsights 'Microsoft.Insights/components@2020-02-02' = {
  name: appInsightsName
  location: location
  tags: tags
  kind: 'web'
  properties: {
    Application_Type: 'web'
    WorkspaceResourceId: workspace.id
    IngestionMode: 'LogAnalytics'
  }
}

resource storage 'Microsoft.Storage/storageAccounts@2023-01-01' = {
  name: storageName
  location: location
  tags: tags
  sku: {
    name: 'Standard_LRS'
  }
  kind: 'StorageV2'
  properties: {
    accessTier: 'Hot'
    allowBlobPublicAccess: false
    minimumTlsVersion: 'TLS1_2'
    supportsHttpsTrafficOnly: true
  }
}

resource tableService 'Microsoft.Storage/storageAccounts/tableServices@2023-01-01' = {
  parent: storage
  name: 'default'
}

resource leadsTable 'Microsoft.Storage/storageAccounts/tableServices/tables@2023-01-01' = {
  parent: tableService
  name: 'leads'
}

resource staticWebApp 'Microsoft.Web/staticSites@2022-09-01' = {
  name: staticWebAppName
  location: location
  tags: tags
  sku: {
    name: staticWebAppSku
    tier: staticWebAppSku
  }
  properties: {
    buildProperties: {
      appLocation: 'src/web'
      apiLocation: 'src/Moser.Site.Api'
      outputLocation: 'dist'
    }
  }
}

var storageConnection = 'DefaultEndpointsProtocol=https;AccountName=${storage.name};AccountKey=${storage.listKeys().keys[0].value};EndpointSuffix=core.windows.net'

resource staticWebAppSettings 'Microsoft.Web/staticSites/config@2022-09-01' = {
  parent: staticWebApp
  name: 'appsettings'
  properties: {
    LEADS_STORAGE: storageConnection
    APPLICATIONINSIGHTS_CONNECTION_STRING: appInsights.properties.ConnectionString
  }
}

output resourceGroupName string = resourceGroup().name
output staticWebAppName string = staticWebApp.name
output staticWebAppHostname string = staticWebApp.properties.defaultHostname
output storageAccountName string = storage.name
output applicationInsightsName string = appInsights.name
