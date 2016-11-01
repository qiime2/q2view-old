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
         IndexRoute, Route } from 'react-router';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import serviceWorker from 'serviceworker-webpack-plugin/lib/runtime';

import rootReducer from './reducer';

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

const makeRoutes = (store) => (
    <Route path="/" component={ToolbarWindow} >
        <IndexRoute component={Home} />
        <Route path="visualization" component={Visualization} />
        <Route path="peek" component={Peek} />
        <Route path="provenance" component={Provenance} />
        <Route path="incompatible-browser" component={IncompatibleBrowser} />
        <Route path="*" component={BadURL} />
    </Route>
);

const makeMiddleware = (history) => applyMiddleware(
    thunk,
    routerMiddleware(history)
);

import { loadSuccess } from './Loader/dux';

// Live browser context, executed only in a browser
if (typeof document !== 'undefined') {
    // window.addEventListener("beforeunload", (event) => {
    //     const confirmationMessage = "You will lose your current view.";
    //     event.returnValue = confirmationMessage;
    //     return confirmationMessage
    // });
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(rootReducer,
                              window.__DEHYDRATED_STORE__,
                              composeEnhancers(makeMiddleware(browserHistory)));
    const history = syncHistoryWithStore(browserHistory, store);

    ReactDOM.render((
        <Provider store={store}>
            <Router history={history} routes={makeRoutes(store)} />
        </Provider>), document.getElementById('main'));

    store.dispatch(loadSuccess());
    // serviceWorker.register();

    // browserHistory.listen((location) => store.dispatch(redirectAction(location)))
    // const dependencyEngine = new DependencyEngine(store);
    // store.subscribe(dependencyEngine.handleChange);
}

// Static render context, function called by `static-site-generator-webpack-plugin`
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
            bundle: locals.assets.main,
            store: JSON.stringify(store.getState()),
            favicon,
            content
        }));
    });
}
