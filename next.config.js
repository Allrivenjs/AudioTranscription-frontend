/** @type {import('next').NextConfig} */
const nextConfig = {
    trailingSlash: true,
    env: {
        ENDPOINT_BACKEND : "https://backend.audiotranscription.cc/",
        ENDPOINT_SOCKET : "https://socket.audiotranscription.cc/"
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
