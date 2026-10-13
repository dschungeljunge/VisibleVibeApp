/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  transpilePackages: ["@excalidraw/excalidraw"],
  async redirects() {
    return [
      { source: "/connect/community", destination: "/connect", permanent: false },
    ];
  },
};

export default nextConfig;
