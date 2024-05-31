/** @type {import('next').NextConfig} */
const nextConfig = {
    trailingSlash: true,
    env: {
        ENDPOINT_BACKEND : "http://127.0.0.1:8080",
        ENDPOINT_SOCKET : "http://localhost:3001"
    },
    experimental: {
        serverActions: {
            allowedOrigins: [
                'http://localhost:3000',
                'https://audiotranscription.cc/',
                'https://backend.audiotranscription.cc/',
                'https://socket.audiotranscription.cc/'
            ],
            allowedForwardedHosts: [
                'http://localhost:3000',
                'https://audiotranscription.cc/',
                'https://backend.audiotranscription.cc/',
                'https://socket.audiotranscription.cc/'
            ]
        }
    },
    typescript: {
        ignoreBuildErrors: true,
    },
}

module.exports = nextConfig
