/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
        unoptimized: true,
    },
    // Optional: Add a trailing slash to all paths `/about` -> `/about/`
    trailingSlash: true,
};

export default nextConfig;
