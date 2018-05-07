import { Dux, defineAction } from '../../lib/dx';
import { getReader } from '../../init/dux';


const _setSelection = defineAction(
    'SET_PROVENANCE_SELECTION', selection => ({ selection }));

export const setViewTitle = defineAction(
    'SET_PROVENANCE_VIEW_TITLE', viewTitle => ({ viewTitle }));

export const setElements = defineAction(
    'SET_PROVENANCE_ELEMENTS', elements => ({ elements }));

export const setHeight = defineAction(
    'SET_PROVENANCE_HEIGHT', height => ({ height }));

export const clearSelection = defineAction(
    'CLEAR_PROVENANCE_SELECTION');

export const setCitationStyle = defineAction(
    'SET_CITATION_STYLE', citationStyle => ({ citationStyle }));

export const setSelection = ({ type, uuid }) => (dispatch, getState) => {
    const reader = getReader(getState());
    let selectionData = null;
    if (type === 'action') {
        dispatch(setViewTitle('Action Details'));
        selectionData = reader.getProvenanceAction(uuid);
    } else {
        dispatch(setViewTitle('Result Details'));
        selectionData = reader.getProvenanceArtifact(uuid);
    }

    selectionData.then(data => dispatch(_setSelection(data)))
                 .catch(() => dispatch(_setSelection(undefined)));
};

const dx = new Dux('provenance', {
    selection: null,
    viewTitle: 'Details',
    elements: null,
    exists: false,
    height: 0,
    citationStyle: 'bibtex'
});

export const getElements = dx.makeSelector(({ elements }) => elements);
export const getViewTitle = dx.makeSelector(({ viewTitle }) => viewTitle);
export const getHeight = dx.makeSelector(({ height }) => height);
export const getSelection = dx.makeSelector(({ selection }) => selection);
export const hasProvenance = dx.makeSelector(({ exists }) => exists);
export const getCitationStyle = dx.makeSelector(({ citationStyle }) => citationStyle);

dx.makeReducer({
    [setElements]: (state, { elements }) => ({
        ...state,
        elements,
        selection: null,
        exists: true
    }),
    [_setSelection]: (state, { selection }) => ({
        ...state,
        selection,
        exists: true
    }),
    [setHeight]: (state, { height }) => ({
        ...state,
        height,
        exists: true
    }),
    [clearSelection]: state => ({
        ...state,
        viewTitle: 'Details',
        selection: null,
        exists: true
    }),
    [setViewTitle]: (state, { viewTitle }) => ({
        ...state,
        viewTitle,
        exists: true
    }),
    [setCitationStyle]: (state, { citationStyle }) => ({
        ...state,
        citationStyle
    })
});

export default dx;
