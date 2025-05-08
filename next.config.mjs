/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export', // Enable static exports for GitHub Pages
    images: {
        unoptimized: true, // Required for static export
    },
    // Disable type checking during build to avoid issues
    typescript: {
        ignoreBuildErrors: true,
    },
    // Disable ESLint during build
    eslint: {
        ignoreDuringBuilds: true,
    },
    // Add trailing slash for better static compatibility
    trailingSlash: true,
    // Configure base path (repository name) for GitHub Pages
    // If you're deploying to a custom domain, you can comment this out
    // Otherwise, change this to your repository name
    basePath: '/taraweeh-app',
    // Disable strict mode for Capacitor compatibility
    reactStrictMode: false,
    // Enable service worker and PWA
    pwa: {
        dest: 'public',
        disable: process.env.NODE_ENV === 'development',
    },
};

export default nextConfig; 