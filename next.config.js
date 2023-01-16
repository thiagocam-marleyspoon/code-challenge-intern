/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: ["marleyspoon.com"],
    },
};

module.exports = nextConfig;
