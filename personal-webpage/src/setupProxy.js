const proxy = require('http-proxy-middleware');
//
module.exports = function(app) {
    app.use(proxy('/apis', {
        logLevel: 'debug',
        target: "http://143.198.100.70/PersonalWebpage/php/public_html/",
        changeOrigin: true,
        secure: true,
    }));
};