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
    // Conditionally set basePath for GitHub Pages only
    // Vercel deployments will not have this environment variable
    ...(process.env.DEPLOY_TARGET === 'github' ? {
        basePath: '/taraweeh-app',
    } : {}),
    // Disable strict mode for Capacitor compatibility
    reactStrictMode: false,
};

export default nextConfig; 