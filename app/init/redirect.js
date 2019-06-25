import { push } from 'react-router-redux';
import { updateLoadMessage } from '../Loader/dux';
import { getMetadata } from '../pages/Details/dux';
import { getSource } from './dux';

const redirect = path => (dispatch) => {
    // Prevent infinite recursion
    window.setTimeout(() => dispatch(push(path)), 0);
};

export const redirectToDefault = () => (dispatch, getState) => {
    dispatch(updateLoadMessage('redirecting'));
    const state = getState();
    const { type } = getMetadata(state);
    const src = getSource(state);

    if (type === 'Visualization') {
        dispatch(redirect(`/visualization/?type=html&src=${src}`));
    } else {
        dispatch(redirect(`/details/?src=${src}`));
    }

    return Promise.resolve();
};

export default redirect;
