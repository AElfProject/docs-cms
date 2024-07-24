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
      {
        protocol: "https",
        hostname: "open.larksuite.com",
        port: "",
        pathname: "**",
      },
    ],
  },
  experimental: {
    workerThreads: false,
    cpus: 1,
  },
  output: "export",
  trailingSlash: true,
};

export default nextConfig;
