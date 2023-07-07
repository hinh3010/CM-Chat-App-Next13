/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            "res.cloudinary.com",
            "localhost",
            "source.unsplash.com",
            "*",
            "d5xh8as6wnpix.cloudfront.net"
        ],
    },
    webpack: (config) => {
        // Enable webpack to handle the canvas.node . binary
        config.module.rules.push({
            test: /canvas[\/\\]build[\/\\].*\.(node|bin)$/,
            use: [
                {
                    loader: 'raw-loader',
                    options: {
                        esModule: false,
                    },
                },
            ],
        });

        return config;
    }
};

module.exports = nextConfig;
