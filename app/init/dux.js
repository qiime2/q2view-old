import { Dux, defineAction } from '../lib/dx';

export const setServiceWorker = defineAction(
    'SET_SERVICE_WORKER', sw => ({ sw }));

export const setBrowserCompatible = defineAction(
    'SET_BROWSER_COMPATIBLE', browserCompatible => ({ browserCompatible }));

export const setRawSource = defineAction(
    'SET_RAW_SOURCE', (rawSrc) => {
        if (rawSrc !== null && rawSrc.from === 'remote') {
            const source = new URL(rawSrc.data);
            if (source.hostname === 'www.dropbox.com') {
                source.searchParams.set('dl', '1');
                const path = `${source.pathname}?${source.searchParams}`
                const data = `https://dl.dropboxusercontent.com${path}`
                return { rawSrc: { ...rawSrc, data } };
            }
        }
        return ({ rawSrc });
    });

export const setSource = defineAction(
    'SET_SOURCE', src => ({ src }));

export const setReader = defineAction(
    'SET_READER', reader => ({ reader }));

export const setProvenance = defineAction(
    'SET_PROVENANCE', prov => ({ prov }));

export const setCitations = defineAction(
    'SET_CITATIONS', citations => ({ citations }));

const dx = new Dux('init', {
    browserCompatible: null,
    sw: null,
    rawSrc: null,
    src: null,
    reader: null,
    prov: null,
    citations: null
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
export const getCitations = dx.makeSelector(({ citations }) => citations);
export const getFileName = dx.makeSelector(({ rawSrc }) => {
    if (rawSrc === null) {
        return null;
    }
    return rawSrc.name;
});
export const getDownload = dx.makeSelector(({ rawSrc }) => {
    if (rawSrc !== null && rawSrc.from === 'remote') {
        return rawSrc.data;
    }
    return null;
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
    }),
    [setCitations]: (state, { citations }) => ({
        ...state,
        citations
    })
});

export default dx;
