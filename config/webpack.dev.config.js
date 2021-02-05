// ----------------------------------------------------------------------------
// Copyright (c) 2016-2021, QIIME 2 development team.
//
// Distributed under the terms of the Modified BSD License.
//
// The full license is in the file LICENSE, distributed with this software.
// ----------------------------------------------------------------------------

const HtmlWebpackPlugin = require('html-webpack-plugin');

const extendConfig = require('./webpack.shared');


module.exports = extendConfig(config => ({
    plugins: [...config.plugins,
        new HtmlWebpackPlugin({
            template: 'app/index.html.handlebars',
            inject: true
        })
    ],
    devServer: {
        contentBase: 'build',
        historyApiFallback: true
    }
}), true);
