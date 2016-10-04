// ----------------------------------------------------------------------------
// Copyright (c) 2016--, QIIME development team.
//
// Distributed under the terms of the Modified BSD License.
//
// The full license is in the file LICENSE, distributed with this software.
// ----------------------------------------------------------------------------

const HtmlWebpackPlugin = require('html-webpack-plugin');

const extendConfig = require('./webpack.shared');


module.exports = extendConfig((config) => {
    return {
        plugins: [...config.plugins,
            new HtmlWebpackPlugin({
                template: 'app/index.html',
                inject: true
            })
        ],
        devServer: {
            contentBase: 'build'
        }
    };
}, true);
