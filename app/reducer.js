import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import { getDuxInRow } from './lib/dx';

import { initDux } from './init';
import { loaderDux } from './Loader';
import { peekDux } from './pages/Peek';
import { provenanceDux } from './pages/Provenance';


export default combineReducers({
    routing,
    app: getDuxInRow(
        initDux,
        loaderDux,
        peekDux,
        provenanceDux
    )
});
