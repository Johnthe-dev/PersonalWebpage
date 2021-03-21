const proxy = require('http-proxy-middleware');
//
module.exports = function(app) {
    app.use(proxy('/apis', {
        logLevel: 'debug',
        target: "C:/Users/Bladv/Desktop/www/var/html/PersonalWebpage/php/public_html/apis",
        changeOrigin: true,
        secure: true,
    }));
};