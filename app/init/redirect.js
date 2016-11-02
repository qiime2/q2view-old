import { push } from 'react-router-redux';
import { updateLoadMessage } from '../Loader/dux';

const redirect = (path) => (dispatch) => {
    // Prevent infinite recursion
    window.setTimeout(() => dispatch(push(path)), 0);
};

export const redirectToDefault = () => (dispatch, getState) => (
    new Promise((resolve, reject) => {
        dispatch(updateLoadMessage('redirecting'));

        resolve();
    })
);

export default redirect;
