// ----------------------------------------------------------------------------
// Copyright (c) 2016-2023, QIIME 2 development team.
//
// Distributed under the terms of the Modified BSD License.
//
// The full license is in the file LICENSE, distributed with this software.
// ----------------------------------------------------------------------------

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');

const extendConfig = require('./webpack.shared');

const paths = [
    '/',
    '/about',
    '/visualization',
    '/peek',
    '/provenance',
    '/incompatible-browser',
    '/404.html'
];

module.exports = extendConfig(config => ({
    plugins: [...config.plugins,
        new StaticSiteGeneratorPlugin('main', paths),
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false }
        }),
        new ExtractTextPlugin('css/main.css'),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        })
    ]
}), false);
