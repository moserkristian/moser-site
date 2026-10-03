export const site = {
  name: "Kristián Moser",
  domain: "kristianmoser.com",
  title: "Senior .NET engineer",
  place: "Bratislava",
  hero: "ASP.NET Core, React, and service architecture.",
  lede: "Contract work through Moser Consulting s.r.o. Bratislava or remote.",
  email: "moser.kristian@gmail.com",
  phone: "+421 918 829 553",
  linkedIn: "https://linkedin.com/in/moserkristian",
  gitHub: "https://github.com/moserkristian",
  gitHubHandle: "github.com/moserkristian",
  linkedInHandle: "linkedin.com/in/moserkristian",
  company: "Moser Consulting s.r.o.",
  profile:
    "Senior .NET engineer (C#, ASP.NET Core, Blazor). Product and client work in laboratory APIs, aviation data, and industrial cloud. Open to contract work through Moser Consulting s.r.o.",
} as const;

export type Service = {
  id: string;
  title: string;
  summary: string;
  points: string[];
};

export const services: Service[] = [
  {
    id: "apis",
    title: "APIs and backends",
    summary: "ASP.NET Core APIs, tests, and file handling.",
    points: [
      "REST APIs with tests.",
      "File handling and monitoring.",
      "Cleanup of messy layering.",
    ],
  },
  {
    id: "ui",
    title: "Web UI",
    summary: "React or Blazor on the same stack as the API.",
    points: [
      "React and TypeScript.",
      "Blazor when the UI should stay in .NET.",
      "Forms and operational screens.",
    ],
  },
  {
    id: "architecture",
    title: "Service architecture",
    summary: "Service boundaries and a local run that works.",
    points: [
      "Inter-service APIs.",
      "Fewer database round trips.",
      "Docker and CI/CD in the same delivery.",
    ],
  },
  {
    id: "integration",
    title: "Data integration",
    summary: "Feeds into a cloud database, including geospatial.",
    points: [
      "Ingest and publish (for example NOTAM to AIXM JSON).",
      "PostgreSQL / PostGIS.",
      "Pipelines with tests.",
    ],
  },
];

export const contactNeeds: { id: string; label: string }[] = [
  ...services.map((service) => ({ id: service.id, label: service.title })),
  { id: "contract", label: "Something else" },
];

export function selectedNeed(raw: string | null): string {
  const need = raw?.trim().toLowerCase() ?? "";
  if (need === "blazor") return "ui";
  return contactNeeds.some((item) => item.id === need) ? need : "";
}

export type CaseNote = {
  id: string;
  kind: string;
  title: string;
  meta: string;
  body: string;
  href?: string;
  hrefLabel?: string;
};

export const cases: CaseNote[] = [
  {
    id: "moser-consulting",
    kind: "Now",
    title: "Moser Consulting s.r.o.",
    meta: "Senior .NET engineer · Aug 2024 – Present · Bratislava / Remote",
    body: "Client and product work under one company.",
  },
  {
    id: "ng-aviation",
    kind: "Client",
    title: "NG Aviation",
    meta: "Mar 2025 – Oct 2025 · Bratislava · Hybrid",
    body: "NOTAM feeds had to land as AIXM JSON and be published to a cloud database. REST APIs over that aerospace data, PostgreSQL / PostGIS for geospatial queries, and cleaner layering in the existing services. Docker and CI/CD were part of the delivery.",
  },
  {
    id: "comap",
    kind: "Client",
    title: "ComAp Group",
    meta: "Aug 2024 – Feb 2025 · Prague · Hybrid",
    body: "Early cloud platform work: service boundaries, inter-service APIs, and a Clean Architecture split. .NET Aspire ran the services locally for development and tests. Blazor UI against those APIs, and fewer unnecessary database round trips with a clearer command/query split.",
  },
  {
    id: "sfcfo",
    kind: "Client",
    title: "sfCFO",
    meta: "Jan 2026 – Feb 2026 · Remote",
    body: "Short scoped delivery on a .NET 9 Blazor Server product (MudBlazor, EF Core): a Mapbox GL map view and E.164 phone input.",
  },
  {
    id: "policy-qa",
    kind: "Open work",
    title: "Policy Q&A",
    meta: "2026 – Present",
    body: "Markdown policies go through retrieval and come back as answers with citations. A C# Allow / Deny / NeedsHuman layer sits on top, with tests. Built with Blazor, .NET Aspire, and Ollama.",
    href: "https://github.com/moserkristian/Moser.RagAi",
    hrefLabel: "github.com/moserkristian/Moser.RagAi",
  },
  {
    id: "thermo-fisher",
    kind: "Earlier",
    title: "Thermo Fisher Scientific",
    meta: "Senior .NET engineer · Sep 2022 – Apr 2024 · Bratislava · Hybrid",
    body: "ASP.NET Core Web APIs for laboratory test results. File handling on AWS. Tests, monitoring, and pipelines. Written English across time zones.",
  },
  {
    id: "socialna-poistovna",
    kind: "Earlier",
    title: "Sociálna poisťovňa",
    meta: "Software engineer · Sep 2019 – Jan 2022 · Bratislava · Hybrid",
    body: ".NET internal systems, incident handling, and backup and recovery automation.",
  },
  {
    id: "frequentis",
    kind: "Earlier",
    title: "Frequentis",
    meta: "Junior software engineer · Jan 2018 – Jun 2019 · Bratislava · Hybrid",
    body: "Optimised 6–7 multithreaded components (about 24% better performance). Real-time client–server UI and a small HTML/JS client.",
  },
];

export const cvSkills: { label: string; value: string }[] = [
  { label: "Languages", value: "C#, SQL, JavaScript" },
  { label: "Backend", value: "ASP.NET Core, REST APIs, Entity Framework Core, Blazor" },
  { label: "Delivery", value: "Azure DevOps, Docker, CI/CD" },
  { label: "Cloud", value: "Microsoft Azure" },
  { label: "Data", value: "SQL Server, PostgreSQL, PostGIS, T-SQL / SQL" },
];

export const cvClients = [
  {
    name: "NG Aviation",
    meta: "Mar 2025 – Oct 2025 · Bratislava · Hybrid",
    notes: [
      "NOTAM ingestion to AIXM JSON and publish to a cloud database.",
      "REST APIs over aerospace data.",
      "PostgreSQL / PostGIS for geospatial queries.",
      "Docker and CI/CD.",
      "Cleaned up layering in existing services.",
    ],
  },
  {
    name: "ComAp Group",
    meta: "Aug 2024 – Feb 2025 · Prague · Hybrid",
    notes: [
      "Early cloud platform work: service boundaries, inter-service APIs, Clean Architecture split.",
      ".NET Aspire for local multi-service run and test.",
      "Blazor UI against those APIs.",
      "Fewer unnecessary database round trips with a clearer command/query split.",
    ],
  },
  {
    name: "sfCFO",
    meta: "Jan 2026 – Feb 2026 · Remote",
    notes: [
      "Short scoped delivery on a .NET 9 Blazor Server product (MudBlazor, EF Core): Mapbox GL map view and E.164 phone input.",
    ],
  },
  {
    name: "Policy Q&A",
    meta: "2026 – Present · Personal product",
    notes: [
      "Markdown policies to retrieval to answers with citations.",
      "C# Allow / Deny / NeedsHuman layer, with tests.",
      "Blazor, .NET Aspire, Ollama.",
      "https://github.com/moserkristian/Moser.RagAi",
    ],
  },
];

export const cvEarlier = [
  {
    heading: "Senior .NET engineer — Thermo Fisher Scientific",
    meta: "Sep 2022 – Apr 2024 · Bratislava · Hybrid",
    notes: [
      "ASP.NET Core Web APIs for laboratory test results.",
      "AWS for file handling.",
      "Tests, monitoring, pipelines.",
      "Written English across time zones.",
    ],
  },
  {
    heading: "Software engineer — Sociálna poisťovňa",
    meta: "Sep 2019 – Jan 2022 · Bratislava · Hybrid",
    notes: [
      ".NET internal systems.",
      "Incident handling.",
      "Backup and recovery automation.",
    ],
  },
  {
    heading: "Junior software engineer — Frequentis",
    meta: "Jan 2018 – Jun 2019 · Bratislava · Hybrid",
    notes: [
      "Optimised 6–7 multithreaded components; measured about 24% better performance.",
      "Real-time client–server UI.",
      "Small HTML/JS client.",
    ],
  },
];
