import { updateLoadMessage } from '../Loader/dux';

export default () => (dispatch, getState) => (
    new Promise((resolve, reject) => {
        dispatch(updateLoadMessage('initializing loopback session'));

        resolve();
    })
);
