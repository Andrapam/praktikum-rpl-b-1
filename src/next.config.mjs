/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow external images if needed
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  // Transpile leaflet for SSR compatibility
  transpilePackages: ["react-leaflet", "leaflet"],
  // Proxy API requests to Laravel backend
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://127.0.0.1:8000/api/:path*",
      },
      {
        source: "/storage/:path*",
        destination: "http://127.0.0.1:8000/storage/:path*",
      },
    ];
  },
};

export default nextConfig;
