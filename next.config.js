const withTM = require('next-transpile-modules')(['@enonic/nextjs-adapter']);

// neededed to eval inline react scripts
const cspHeaders = [
    {
        key: 'Content-Security-Policy',
        value: `script-src 'self' 'unsafe-eval' 'unsafe-inline';`
    }
]

module.exports = withTM({
    reactStrictMode: false,

    async headers() {
        return [
            {
                // Apply these headers to all routes in your application.
                source: '/:path*',
                headers: cspHeaders,
            },
        ]
    },
});
