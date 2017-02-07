import { Dux, defineAction } from '../../lib/dx';

export const updateVisPath = defineAction(
    'UPDATE_VIS_PATH', path => ({ path }));

const dx = new Dux('visualization', null);

export const getVisPath = dx.makeSelector(state => state);

dx.makeReducer({
    [updateVisPath]: (state, { path }) => ({ path })
});

export default dx;
