import "./env.mjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "lh3.googleusercontent.com",
        pathname: "*",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
