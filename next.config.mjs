import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

/** @type {import('next').NextConfig} */
const nextConfig = {
  staticPageGenerationTimeout: 10000,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "internal-api-drive-stream-sg.larksuite.com",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "docs.aelf.dev",
        port: "",
        pathname: "**",
      },
    ],
    unoptimized: true,
  },
  experimental: {
    workerThreads: false,
    cpus: 1,
  },
  output: "export",
  trailingSlash: true,
  serverRuntimeConfig: {
    projectRoot: __dirname,
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false };

    return config;
  },
};

export default nextConfig;
