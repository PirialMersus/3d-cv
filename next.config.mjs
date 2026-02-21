/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
    reactStrictMode: true,
    transpilePackages: ['three'],
    output: 'export',
    images: { unoptimized: true },
    basePath: isProd ? '/3d-cv' : '',
    assetPrefix: isProd ? '/3d-cv/' : '',
};

export default nextConfig;
