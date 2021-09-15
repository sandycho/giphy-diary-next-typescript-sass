/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    images: {
        domains: ['media0.giphy.com', 'media1.giphy.com', 'media2.giphy.com', 'media3.giphy.com', 'media4.giphy.com', 'media5.giphy.com', 'media6.giphy.com'],
    },
    env: {
        API_URL: "http: //localhost:3000",
        GIPHY_URL: "https://api.giphy.com/v1/gifs",
        GIPHY_API_KEY: "XYZ"
    }
}