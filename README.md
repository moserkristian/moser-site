# Moser.Site

Site for Moser Consulting s.r.o. Contract .NET work. The two-page CV lives in `cv/` and at `/cv` on the site.

## Run locally

Projects target `net8.0`. SDK 8 or later can build them.

```bash
dotnet test Moser.Site.sln
```

Site (http://localhost:5051):

```bash
dotnet run --project src/Moser.Site
```

Contact API (http://localhost:7071/api/contact):

```bash
cp src/Moser.Site.Api/local.settings.json.example src/Moser.Site.Api/local.settings.json
# Functions host storage: Azurite (or a storage connection string)
npx --yes azurite --silent --location /tmp/azurite --blobPort 10000 --queuePort 10001 --tablePort 10002
func start --script-root src/Moser.Site.Api
```

Install [Azure Functions Core Tools](https://learn.microsoft.com/azure/azure-functions/functions-run-local) for `func`. `LEADS_STORAGE=InMemory` in the example settings stores form rows in process memory. Point `LEADS_STORAGE` at a storage connection string to use Table Storage (`leads`).

In Development the site posts to `http://localhost:7071/api/contact`. On Azure Static Web Apps it posts to `/api/contact`.

Print the CV from `/cv` (A4, two pages) or open `cv/Kristian-Moser-CV.pdf`. Word portals can use `cv/Kristian-Moser-CV.docx`. Rebuild the Word file with `python3 cv/generate_docx.py`. Rebuild the PDF with Chrome:

```bash
google-chrome --headless --disable-gpu --no-pdf-header-footer \
  --print-to-pdf=cv/Kristian-Moser-CV.pdf \
  file://$PWD/cv/kristian-moser-cv.html
cp cv/Kristian-Moser-CV.pdf src/Moser.Site/wwwroot/Kristian-Moser-CV.pdf
```

## Stack

Blazor WebAssembly (`net8.0`) on Azure Static Web Apps (Free). Isolated-worker Azure Functions (`net8.0`, Functions v4) for the contact form. Table Storage for leads. Application Insights. Bicep in `infra/`. GitHub Actions publishes the WASM `wwwroot` and the Functions project. There is no relational database.

`net8.0` is the latest LTS the Static Web Apps managed API runtime accepts (`dotnet-isolated:8.0`). The front end is static files after publish.

## Deploy

1. Create a resource group and deploy Bicep:

```bash
az group create --name rg-moser-site --location westeurope
az deployment group create \
  --resource-group rg-moser-site \
  --template-file infra/main.bicep \
  --parameters infra/main.parameters.json
```

2. Put the Static Web Apps deployment token in the GitHub secret `AZURE_STATIC_WEB_APPS_API_TOKEN`. Do not print the token.

```bash
az staticwebapp secrets list --name <static-web-app-name> --query properties.apiKey -o tsv
```

3. Push to `main`. `.github/workflows/azure-static-web-apps.yml` publishes `src/Moser.Site` and deploys `published/wwwroot` with `output_location` set to that `wwwroot`, plus `src/Moser.Site.Api` as the managed API.

Stay on the Free SKU. Do not switch the Static Web App to Standard or move the API onto a separate plan unless you intend to leave the free tier.
