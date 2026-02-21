/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    transpilePackages: ['three'],
    output: 'export',
    images: { unoptimized: true },
    basePath: '/3d-cv',
    assetPrefix: '/3d-cv/',
};

export default nextConfig;
