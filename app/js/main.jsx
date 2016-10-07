// ----------------------------------------------------------------------------
// Copyright (c) 2016--, QIIME development team.
//
// Distributed under the terms of the Modified BSD License.
//
// The full license is in the file LICENSE, distributed with this software.
// ----------------------------------------------------------------------------

import React from 'react';
import { render } from 'react-dom';
import runtime from 'serviceworker-webpack-plugin/lib/runtime';

import '!style-loader!css-loader!bootstrap-css-only'; // eslint-disable-line
import App from './components/App';

if ('serviceWorker' in navigator) {
    runtime.register();
}

render(
    <App />,
    document.getElementById('root')
);
