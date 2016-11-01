import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import { getDuxInRow } from './lib/dx';

import appDux from './dux';
import { loaderDux } from './Loader';


export default combineReducers({
    routing,
    app: getDuxInRow(
        appDux,
        loaderDux
    )
});
