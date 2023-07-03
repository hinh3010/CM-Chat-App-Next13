/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            "localhost",
            "source.unsplash.com",
            "*",
            "d5xh8as6wnpix.cloudfront.net",
            "res.cloudinary.com"
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
