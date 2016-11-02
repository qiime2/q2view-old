import { updateLoadMessage } from '../Loader/dux';

export default () => (dispatch, getState) => (
    new Promise((resolve, reject) => {
        dispatch(updateLoadMessage('loading metadata'));

        resolve();
    })
);
