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
};

export default nextConfig;
