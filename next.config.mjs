/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export', // Enable static exports for GitHub Pages
    basePath: '/Taraweeh-app', // Match your repository name
    images: {
        unoptimized: true, // Required for static export
    },
    distDir: 'out', // Output to the 'out' directory
};

export default nextConfig; 