var webpack = require('webpack');

module.exports = {
    entry: './client/app.jsx',
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
            {   test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: '6to5-loader?optional=selfContained'}
        ]
    }
};
