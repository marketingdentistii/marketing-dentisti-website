import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  redirects: async () =>
    [
      {
        source: "/kit-pazienti-nuovi",
        destination: "/kit-gratis",
        permanent: true,
      },
      {
        source: "/kit-pazienti-nuovi/stampa",
        destination: "/kit-gratis/stampa",
        permanent: true,
      },
    ],
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
