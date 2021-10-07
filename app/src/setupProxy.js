const proxy = require('http-proxy-middleware');
//
module.exports = function(app) {
    app.use('/apis',
        proxy({
        logLevel: 'debug',
        target: "https://johnthe.dev/public_html/",
        changeOrigin: true,
        secure: true,
    }));
};