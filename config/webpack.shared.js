// ----------------------------------------------------------------------------
// Copyright (c) 2016--, QIIME development team.
//
// Distributed under the terms of the Modified BSD License.
//
// The full license is in the file LICENSE, distributed with this software.
// ----------------------------------------------------------------------------

const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');

module.exports = function extendConfig(override, isDev) {
    var cssLoader = 'css-loader?modules&importLoaders=1' + // eslint-disable-line no-var
                    '&localIdentName=[name]--[local]-[hash:base64:5]';
    if (!isDev) {
        cssLoader = ExtractTextPlugin.extract('style-loader', cssLoader);
    } else {
        cssLoader = `style-loader!${cssLoader}`;
    }

    const defaultConfig = {
        entry: [
            path.resolve(__dirname, '../app/main.jsx')
        ],
        output: {
            path: path.resolve(__dirname, '../build'),
            filename: '/js/bundle.js',
            libraryTarget: 'umd'
        },
        devtool: "source-map",
        plugins: [
            new ServiceWorkerWebpackPlugin({
                entry: path.join(__dirname, '../app/service-worker.js'),
                filename: '/js/service-worker.js',
                excludes: [
                    '**/*.hot-update.js'
                ]
            })
        ],
        resolve: {
            extensions: ['', '.js', '.jsx']
        },
        module: {
            loaders: [
                {
                    test: /\.png$/,
                    // inline files < 5kb
                    loader: 'url-loader?limit=5000&name=/img/[name]-[hash:6].[ext]'
                },
                {
                    test: /\.jsx?$/,
                    loader: 'babel-loader',
                    exclude: path.join(__dirname, '../node_modules/')
                },
                {
                    test: /\.css$/,
                    loader: cssLoader
                },
                {
                    test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
                    loader: 'url-loader'
                },
                {
                    test: /\.handlebars$/,
                    loader: 'handlebars'
                },
            ]
        }
    };

    return Object.assign({}, defaultConfig, override(defaultConfig));
};
