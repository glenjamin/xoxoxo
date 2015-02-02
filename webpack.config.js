var webpack = require('webpack');

module.exports = {
    entry: './client/app.es6',
    output: {
        path: __dirname + '/',
        filename: 'bundle.js'
    },
    devtool: '#eval-source-map',
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
            }
        })
    ],
    module: {
        loaders: [
            {   test: /\.es6?$/,
                exclude: /node_modules/,
                loader: '6to5-loader?optional=selfContained'}
        ]
    }
};
