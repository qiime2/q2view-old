import { Dux, defineAction } from '../lib/dx';

export const setServiceWorker = defineAction(
    'SET_SERVICE_WORKER', sw => ({ sw }));

export const setBrowserCompatible = defineAction(
    'SET_BROWSER_COMPATIBLE', browserCompatible => ({ browserCompatible }));

export const setRawSource = defineAction(
    'SET_RAW_SOURCE', rawSrc => ({ rawSrc }));

export const setSource = defineAction(
    'SET_SOURCE', src => ({ src }));

export const setReader = defineAction(
    'SET_READER', reader => ({ reader }));

export const setProvenance = defineAction(
    'SET_PROVENANCE', prov => ({ prov }));

const dx = new Dux('init', {
    browserCompatible: null,
    sw: null,
    rawSrc: null,
    src: null,
    reader: null,
    prov: null
});

export const getBrowserCompatible = dx.makeSelector(
    ({ browserCompatible }) => browserCompatible);
export const getServiceWorker = dx.makeSelector(({ sw }) => sw);
export const getRawSource = dx.makeSelector(({ rawSrc }) => rawSrc);
export const getSource = dx.makeSelector(({ src }) => src);
export const getReader = dx.makeSelector(({ reader }) => reader);
export const hasSession = dx.makeSelector(
    ({ reader }) => (reader !== null && reader.port !== null));
export const getProvenance = dx.makeSelector(({ prov }) => prov);
export const getFileName = dx.makeSelector(({ rawSrc }) => {
    if (rawSrc === null) {
        return null;
    }
    return rawSrc.name;
});


dx.makeReducer({
    [setBrowserCompatible]: (state, { browserCompatible }) => ({
        ...state,
        browserCompatible
    }),
    [setServiceWorker]: (state, { sw }) => ({
        ...state,
        sw
    }),
    [setRawSource]: (state, { rawSrc }) => ({
        ...state,
        rawSrc
    }),
    [setSource]: (state, { src }) => ({
        ...state,
        src
    }),
    [setReader]: (state, { reader }) => ({
        ...state,
        reader
    }),
    [setProvenance]: (state, { prov }) => ({
        ...state,
        prov
    })
});

export default dx;
