// next.config.js
module.exports = {
    productionBrowserSourceMaps: true,
    reactStrictMode: true, // Enables React's Strict Mode
    eslint: {
        ignoreDuringBuilds: true,
    },

    swcMinify: true, // Uses SWC for minification
    // Add custom Webpack configurations if needed
    webpack(config, { isServer }) {
        // Custom Webpack configuration (if needed)
        return config;
    },
    // Configure the basePath or assetPrefix if required
    // basePath: '/your-base-path', // If you're deploying to a sub-path
};
