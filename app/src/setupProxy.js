const proxy = require('http-proxy-middleware');
//
module.exports = function(app) {
    app.use('/apis',
        proxy({
        logLevel: 'debug',
        target: "https://138.68.44.162/php/public_html/",
        changeOrigin: true,
        secure: true,
    }));
};