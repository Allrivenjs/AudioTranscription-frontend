/** @type {import('next').NextConfig} */
const nextConfig = {
    trailingSlash: true,
    env: {
        ENDPOINT_BACKEND : "http://127.0.0.1:8080",
        ENDPOINT_SOCKET : "http://localhost:3001"
    }
}

module.exports = nextConfig
