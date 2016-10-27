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
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';

import ToolbarWindow from './ToolbarWindow';
import Home from './pages/Home';
import Visualization from './pages/Visualization';
import Peek from './pages/Peek';
import Provenance from './pages/Provenance';
import BadURL from './pages/BadURL';
import IncompatibleBrowser from './pages/IncompatibleBrowser';
import indexHTML from './index.html.handlebars';
import { makeRouteProps } from './lib/init';

import '!file?name=/css/bootstrap.min.css!bootstrap/dist/css/bootstrap.min.css';
import '!file?name=/css/bootstrap.min.css.map!bootstrap/dist/css/bootstrap.min.css.map';
import favicon from '!file?name=/img/favicon-[hash:6].ico!./favicon.ico';


const makeRoutes = (dispatch) => (
    <Route path="/" component={ToolbarWindow} {...makeRouteProps(dispatch)}>
        <IndexRoute component={Home} />
        <Route path="visualization" component={Visualization} />
        <Route path="peek" component={Peek} />
        <Route path="provenance" component={Provenance} />
        <Route path="incompatible-browser" component={IncompatibleBrowser} />
        <Route path="*" component={BadURL} />
    </Route>
);

const rootReducer = combineReducers({routing: routerReducer});

const makeMiddleware = (history) => applyMiddleware(
    thunk,
    routerMiddleware(history)
);

// Live browser context
if (typeof document !== 'undefined') {
    window.addEventListener("beforeunload", (event) => {
        const confirmationMessage = "You will lose your current view.";
        event.returnValue = confirmationMessage;
        return confirmationMessage
    });
    const store = createStore(rootReducer,
                              window.__DEHYDRATED_STORE__,
                              makeMiddleware(browserHistory));
    const history = syncHistoryWithStore(browserHistory, store);

    ReactDOM.render((
        <Provider store={store}>
            <Router history={history} routes={makeRoutes(store.dispatch)} />
        </Provider>), document.getElementById('main'));
}

// Static render context
export default (locals, callback) => {
    let history = createMemoryHistory();
    const store = createStore(rootReducer, makeMiddleware(history));
    history = syncHistoryWithStore(history, store);
    const location = history.createLocation(locals.path);  // the current path
    const routes = makeRoutes(store.dispatch);

    match({ routes, location }, (error, redirectLocation, renderProps) => {
        const content = ReactDOMServer.renderToString(
            <Provider store={store}>
                <RouterContext {...renderProps} />
            </Provider>
        );

        callback(null, indexHTML({
            store: JSON.stringify(store.getState()),
            favicon,
            content
        }));
    });
}
