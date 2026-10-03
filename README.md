# Moser.Site

Site for Kristián Moser at kristianmoser.com. Contract work is through Moser Consulting s.r.o. The two-page CV lives in `cv/` and at `/cv` on the site.

## Run locally

Projects target `net8.0`. SDK 8 or later can build them. The site needs Node.js 22.

```bash
dotnet test Moser.Site.sln
cd src/web
npm ci
npm test
npm run build
```

Site (http://localhost:5051):

```bash
cd src/web
npm run dev
```

Contact API (http://localhost:7071/api/contact):

```bash
cp src/Moser.Site.Api/local.settings.json.example src/Moser.Site.Api/local.settings.json
# Functions host storage: Azurite (or a storage connection string)
npx --yes azurite --silent --location /tmp/azurite --blobPort 10000 --queuePort 10001 --tablePort 10002
func start --script-root src/Moser.Site.Api
```

Install [Azure Functions Core Tools](https://learn.microsoft.com/azure/azure-functions/functions-run-local) for `func`. `LEADS_STORAGE=InMemory` in the example settings stores form rows in process memory. Point `LEADS_STORAGE` at a storage connection string to use Table Storage (`leads`).

The dev server proxies `/api` to `http://localhost:7071`. On Azure Static Web Apps the form posts to `/api/contact`.

Print the CV from `/cv` (A4, two pages) or open `cv/Kristian-Moser-CV.pdf`. Word portals can use `cv/Kristian-Moser-CV.docx`. Rebuild the Word file with `python3 cv/generate_docx.py`. Rebuild the PDF with Chrome:

```bash
google-chrome --headless --disable-gpu --no-pdf-header-footer \
  --print-to-pdf=cv/Kristian-Moser-CV.pdf \
  file://$PWD/cv/kristian-moser-cv.html
cp cv/Kristian-Moser-CV.pdf src/web/public/Kristian-Moser-CV.pdf
```

## Stack

React and TypeScript (Vite) on Azure Static Web Apps (Free). Isolated-worker Azure Functions (`net8.0`, Functions v4) for the contact form. Shared validation in `Moser.Shared`. Table Storage for leads. Application Insights. Bicep in `infra/`. GitHub Actions builds `src/web` and deploys `src/web/dist` with `src/Moser.Site.Api`. There is no relational database.

`net8.0` is the latest LTS the Static Web Apps managed API runtime accepts (`dotnet-isolated:8.0`). The front end is static files after `npm run build`.

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

3. Push to `main`. `.github/workflows/azure-static-web-apps.yml` builds `src/web` and deploys `src/web/dist`, plus `src/Moser.Site.Api` as the managed API.

Stay on the Free SKU. Do not switch the Static Web App to Standard or move the API onto a separate plan unless you intend to leave the free tier.
