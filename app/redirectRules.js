import { push } from 'react-router-redux';

const redirect = (path) => (dispatch) => {
    // Prevent infinite recursion in `onEnter` from `react-router`
    window.setTimeout(() => dispatch(push(path)), 0);
}

const requireResult = Object.create(null);
requireResult['/peek'] = true;
requireResult['/visualization'] = true;
requireResult['/provenance'] = true;


const redirectAction = ({ pathname, query }) => (dispatch, getState) => {
    const state = getState();



    if (pathname in requireResult && !query.src) {
        dispatch(redirect('/'));
        return;
    }

    if ((pathname == '/' || pathname in requireResult)
            && query.src && getSource(state) === null) {
        dispatch(loadSource(query.src)).then()
    }


    dispatch(resolveDependencies());

}
