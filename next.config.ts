const nextConfig = {
  output: "export",
  trailingSlash: true,
  turbopack: {
    root: process.cwd(),
},

  images: {
    unoptimized: true,

    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.youtube.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;