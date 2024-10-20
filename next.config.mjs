const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'static0.fitbit.com',
            },
            {
                protocol: 'https',
                hostname: 'www.gstatic.com',
            },
        ],
    },
    async redirects() {
        return [
            {
                source: '/',
                destination: '/health-gains',
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
