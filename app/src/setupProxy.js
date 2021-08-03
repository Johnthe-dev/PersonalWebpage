const proxy = require('http-proxy-middleware');
//
module.exports = function(app) {
    app.use('/apis',
        proxy({
        logLevel: 'debug',
        target: "https://johnson-rodgers.com/public_html/",
        changeOrigin: true,
        secure: true,
    }));
};