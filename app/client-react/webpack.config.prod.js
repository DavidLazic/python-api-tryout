const path = require('path');
const webpack = require('webpack');

module.exports = {
    devtool: 'source-map',
    entry: [
        './src/index'
    ],
    output: {
        path: path.join(__dirname, '../static/js/'),
        filename: 'bundle.js',
        publicPath: '../static/js/'
    },
    plugins: [
        /**
        * This plugin assigns the module and chunk ids by occurence count. What this
        * means is that frequently used IDs will get lower/shorter IDs - so they become
        * more predictable.
        */
        new webpack.optimize.OccurenceOrderPlugin(),
        /**
        * See description in 'webpack.config.dev' for more info.
        */
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        /**
        * Some of you might recognize this! It minimizes all your JS output of chunks.
        * Loaders are switched into a minmizing mode. Obviously, you'd only want to run
        * your production code through this!
        */
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            }
        })
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel'],
                include: path.join(__dirname, 'src')
            },
            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!sass-loader'
            },
            {
                test: /\.(png|eot?.+|svg?.+|ttf?.+|otf?.+|woff?.+|woff2?.+)$/,
                loader: 'file-loader'
            }
        ]
    }
};
