import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  // Register plugins required by options below
  plugins: ["@hey-api/client-axios"],

  // Choose the client implementation
  client: "axios",

  // Use the live spec for development (you can pin to ./openapi.json for reproducibility)
  input: "https://api.barrels.gd/api/v1/openapi.json",
  output: "./lib/api",

  asClass: true,
  services: {
    asClass: true,
    operationId: {
      type: "short",
    },
  },
});
