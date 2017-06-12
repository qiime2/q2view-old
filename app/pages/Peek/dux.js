import { Dux, defineAction } from '../../lib/dx';
import { setRawSource } from '../../init/dux';

export const setMetadata = defineAction(
    'SET_METADATA', metadata => ({ metadata }));

const dx = new Dux('metadata', null);

export const getMetadata = dx.makeSelector((state) => {
    if (state === null || !state.uuid) {
        return null;
    }
    return state;
});

dx.makeReducer({
    [setMetadata]: (state, { metadata }) => ({ ...state, ...metadata }),
    [setRawSource]: (state, { rawSrc }) => ({ ...state, name: rawSrc.name })
});

export default dx;
