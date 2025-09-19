/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // Handle static assets
  webpack: (config, { isServer }) => {
    // Handle GLTF files
    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/models/',
          outputPath: 'static/models/',
        },
      },
    });

    // Handle other asset types
    config.module.rules.push({
      test: /\.(obj|mtl|fbx)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/assets/',
          outputPath: 'static/assets/',
        },
      },
    });

    return config;
  },

  // Configure public directory for static assets
  async rewrites() {
    return [
      {
        source: '/models/:path*',
        destination: '/models/:path*',
      },
      {
        source: '/textures/:path*',
        destination: '/textures/:path*',
      },
      {
        source: '/icons/:path*',
        destination: '/icons/:path*',
      },
    ];
  },
};

module.exports = nextConfig;