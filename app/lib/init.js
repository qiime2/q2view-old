import { push } from 'react-router-redux';

const redirect = (path) => (dispatch) => {
    // Prevent infinite recursion
    window.setTimeout(() => dispatch(push(path)), 0);
}


const checkSystemCompatibility = (dispatch) => {
    // dispatch(redirect('/incompatible-browser/'));
    // return Promise.reject(false);
}


const onEnter = (dispatch) => (nextState) => {
    if (typeof window !== 'undefined') {
        checkSystemCompatibility(dispatch)
            // .then(initServiceWorker)
            // .catch(() => dispatch(redirect('/incompatible-browser/')));
    }
}


const onChange = (dispatch) => (prevState, nextState) => {
    if (prevState.location.pathname == '/incompatible-browser/') {
        // There is no escape...
        dispatch(redirect('/incompatible-browser/'));
    }
}


export const makeRouteProps = (dispatch) => ({
    onEnter: onEnter(dispatch),
    onChange: onChange(dispatch)
})
