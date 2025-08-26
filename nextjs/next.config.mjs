/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "adfinis.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "adfinis-assets.ams3.digitaloceanspaces.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "adfinis-assets.ams3.cdn.digitaloceanspaces.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  eslint: {
    dirs: ["src"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600, must-revalidate", // 1 hour
          },
        ],
      },
    ]
  },
}

export default nextConfig
