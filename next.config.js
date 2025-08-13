/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    output: 'export',
    distDir: 'dist',
    images: {   
        unoptimized: true,
        // remotePatterns: [
        //     {
        //         protocol: 'https',
        //         hostname: 'example.com',
        //         port: '',
        //         pathname: '/**',
        //     },
        // ],
    },
}
 
module.exports = nextConfig