import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  // Register plugins required by options below
  plugins: ['@hey-api/client-axios'],

  // Client implementation is provided via the plugin above

  // Use the live spec for development (you can pin to ./openapi.json for reproducibility)
  input: 'https://api.barrels.gd/api/v1/openapi.json',
  output: './lib/api',
});
