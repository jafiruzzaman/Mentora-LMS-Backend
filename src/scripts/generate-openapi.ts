import { generateOpenAPIDocument } from "@trpc/openapi";
import { writeFile } from "node:fs/promises";

const document = await generateOpenAPIDocument("./src/trpc/app-router.ts", {
  exportName: "appRouter",
  title: "Mentora LMS API",
  version: "1.0.0",
});

// The local URL of the tRPC HTTP endpoint.
document.servers = [
  {
    url: "http://localhost:8080/api/trpc",
    description: "Local development",
  },
];

await writeFile("./openapi.json", JSON.stringify(document, null, 2) + "\n");

console.log("OpenAPI documentation generated.");
