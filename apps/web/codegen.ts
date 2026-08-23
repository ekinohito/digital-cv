import type { CodegenConfig } from "@graphql-codegen/cli";

const runtime = globalThis as typeof globalThis & {
  process?: { env?: Record<string, string | undefined> };
};

const config: CodegenConfig = {
  schema: runtime.process?.env?.GRAPHQL_SCHEMA ?? "../api/schema.gql",
  documents: ["src/**/*.{ts,tsx}", "!src/gql/**/*"],
  generates: {
    "./src/gql/": {
      preset: "client",
      presetConfig: {
        fragmentMasking: {
          unmaskFunctionName: "getFragmentData",
        },
      },
      config: {
        useTypeImports: true,
        strictScalars: true,
        scalars: {
          DateTime: "string",
        },
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
