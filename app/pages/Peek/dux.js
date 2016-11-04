import { Dux, defineAction } from '../../lib/dx';

export const setMetadata = defineAction(
    'SET_METADATA', (metadata) => ({ metadata }));

const dx = new Dux('metadata', null)

export const getMetadata = dx.makeSelector(state => state);

dx.makeReducer({
    [setMetadata]: (state, { metadata }) => metadata
});

export default dx;
