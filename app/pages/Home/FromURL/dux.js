import { Dux, defineAction } from '../../../lib/dx';

export const setActiveView = defineAction(
    'SET_FROMURL_VIEW', activeView => ({ activeView }));

const dx = new Dux('fromURLView', 'DEFAULT');

export const getActiveView = dx.makeSelector(state => state);

dx.makeReducer({
    [setActiveView]: (state, { activeView }) => activeView
});

export default dx;
