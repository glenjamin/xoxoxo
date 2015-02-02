var http = require('http');

var express = require('express');

var webpackDevMiddleware = require("webpack-dev-middleware");
var webpack = require('webpack');

var app = express();

var compiler = webpack(require('./webpack.config'));
compiler.plugin("compile", function() { console.log("webpack building..."); });
compiler.plugin("done", function(stats) {
    console.log(
        "webpack bundle built in %dms", stats.endTime - stats.startTime);
});
app.use(webpackDevMiddleware(compiler, { noInfo: true }));

app.get("/", function(req, res) {
    res.send(
        "<html><head><title>xoxoxo</title></head>" +
        "<body><script src='./bundle.js'></script></body></html>"
    );
});

var server = http.createServer(app);
server.listen(process.env.PORT || 6060, function() {
    console.log("Listening on %j", server.address());
});
