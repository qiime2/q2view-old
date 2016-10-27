// ----------------------------------------------------------------------------
// Copyright (c) 2016--, QIIME development team.
//
// Distributed under the terms of the Modified BSD License.
//
// The full license is in the file LICENSE, distributed with this software.
// ----------------------------------------------------------------------------

import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import { Router, RouterContext, match, createMemoryHistory, browserHistory,
         IndexRoute, Route, createRoutes } from 'react-router';

import ToolbarWindow from './ToolbarWindow';
import Home from './pages/Home';
import Visualization from './pages/Visualization';
import Peek from './pages/Peek';
import Provenance from './pages/Provenance';
import BadURL from './pages/BadURL';
import IncompatibleBrowser from './pages/IncompatibleBrowser';
import indexHTML from './index.html.handlebars';
import { onEnter, onChange } from './lib/init';

import '!file?name=/css/bootstrap.min.css!bootstrap/dist/css/bootstrap.min.css';
import '!file?name=/css/bootstrap.min.css.map!bootstrap/dist/css/bootstrap.min.css.map';
import favicon from '!file?name=/img/favicon-[hash:6].ico!./assets/favicon.ico';


const routes = (
    <Route path="/" component={ToolbarWindow} onEnter={onEnter} onChange={onChange}>
        <IndexRoute component={Home} />
        <Route path="visualization" component={Visualization} />
        <Route path="peek" component={Peek} />
        <Route path="provenance" component={Provenance} />
        <Route path="incompatible-browser" component={IncompatibleBrowser} />
        <Route path="*" component={BadURL} />
    </Route>
);


// Live browser context
if (typeof document !== 'undefined') {
    // window.addEventListener("beforeunload", (event) => {
    //     const confirmationMessage = "You will lose your current view.";
    //     event.returnValue = confirmationMessage;
    //     return confirmationMessage
    // });

    ReactDOM.render(<Router history={browserHistory} routes={routes} />,
                    document.getElementById('main'));
}

// Static render context
export default (locals, callback) => {
    const history = createMemoryHistory();
    const location = history.createLocation(locals.path);  // the current path
    const store = JSON.stringify({foo: 'bar', x: [1, 2, 3]});
    match({ routes, location }, (error, redirectLocation, renderProps) => {
        const content = ReactDOMServer.renderToString(<RouterContext {...renderProps} />);
        callback(null, indexHTML({store, favicon, content}));
    });
}
