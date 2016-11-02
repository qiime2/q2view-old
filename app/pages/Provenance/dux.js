import { Dux, defineAction } from '../../lib/dx';

export const setProvenance = defineAction(
    'SET_PROVENANCE', (provenance) => ({ provenance }));

const dx = new Dux('provenance', null)

export const getProvenance = dx.makeSelector(state => state);

dx.makeReducer({
    [setProvenance]: (state, { provenance }) => provenance
});

export default dx;
