// ----------------------------------------------------------------------------
// Copyright (c) 2016-2023, QIIME 2 development team.
//
// Distributed under the terms of the Modified BSD License.
//
// The full license is in the file LICENSE, distributed with this software.
// ----------------------------------------------------------------------------
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import { Router, RouterContext, match, createMemoryHistory, browserHistory,
    IndexRoute, Route } from 'react-router';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';

import rootReducer from './reducer';

import ToolbarWindow from './ToolbarWindow';
import Home from './pages/Home';
import Visualization from './pages/Visualization';
import Details from './pages/Details';
import Provenance from './pages/Provenance';
import BadURL from './pages/BadURL';
import IncompatibleBrowser from './pages/IncompatibleBrowser';
import About from './pages/About';
import indexHTML from './index.html.handlebars';
import { navigationAction } from './init';
import { loadSuccess, updateLoadProgress } from './Loader/dux';

/* eslint-disable */
import '!file?name=/css/bootstrap.min.css!bootstrap/dist/css/bootstrap.min.css';
import '!file?name=/css/bootstrap.min.css.map!bootstrap/dist/css/bootstrap.min.css.map';
import favicon from '!file?name=/img/favicon-[hash:6].ico!./favicon.ico';
/* eslint-enable */

const makeRoutes = store => ( // eslint-disable-line no-unused-vars
    <Route path="/" component={ToolbarWindow} >
        <IndexRoute component={Home} />
        <Route path="visualization" component={Visualization} />
        <Route path="details" component={Details} />
        <Route path="provenance" component={Provenance} />
        <Route path="incompatible-browser" component={IncompatibleBrowser} />
        <Route path="about" component={About} />
        <Route path="*" component={BadURL} />
    </Route>
);

const makeMiddleware = history => applyMiddleware(
    thunk,
    routerMiddleware(history)
);

// Live browser context, executed only in a browser
if (typeof document !== 'undefined') {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(rootReducer,
        window.__DEHYDRATED_STORE__,
        composeEnhancers(makeMiddleware(browserHistory)));
    const history = syncHistoryWithStore(browserHistory, store);

    ReactDOM.render((
        <Provider store={store}>
            <Router history={history} routes={makeRoutes(store)} />
        </Provider>), document.getElementById('main'));

    // update to reflect assets are downloaded. progress value isn't significant.
    store.dispatch(updateLoadProgress(0.05));

    // Dispatch the navigationAction on first load
    store.dispatch(navigationAction(history.getCurrentLocation()));
    // Subsequent changes are captured here
    browserHistory.listen((location) => {
        window.ga('send', 'pageview', location.pathname + location.search);
        store.dispatch(navigationAction(location));
    });
}

// Static render context, function called by `static-site-generator-webpack-plugin`
export default (locals, callback) => {
    let history = createMemoryHistory();
    const store = createStore(rootReducer, makeMiddleware(history));
    history = syncHistoryWithStore(history, store);
    const location = history.createLocation(locals.path); // the current path
    const routes = makeRoutes(store.dispatch);

    if (locals.path === '/incompatible-browser' || locals.path === '/404.html' || locals.path === '/about') {
        // skip loading bar
        store.dispatch(loadSuccess());
    }

    match({ routes, location }, (error, redirectLocation, renderProps) => {
        const content = ReactDOMServer.renderToString(
            <Provider store={store}>
                <RouterContext {...renderProps} />
            </Provider>
        );
        callback(null, indexHTML({
            bundle: locals.assets.main,
            store: JSON.stringify(store.getState()),
            favicon,
            content
        }));
    });
};
