/** @type {import('next').NextConfig} */
const nextConfig = {
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
  },
};

export default nextConfig;
