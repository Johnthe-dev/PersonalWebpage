const proxy = require('http-proxy-middleware');
//
module.exports = function(app) {
    app.use(proxy('/apis', {
        logLevel: 'debug',
        target: "http://138.68.44.162/php/public_html/",
        changeOrigin: true,
        secure: true,
    }));
};