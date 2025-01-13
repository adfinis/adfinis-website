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
    ],
  },
  eslint: {
    dirs: ["src"],
  },
}

export default nextConfig
