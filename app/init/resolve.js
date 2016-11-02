import { updateLoadMessage } from '../Loader/dux';

export const resolveFile = () => (dispatch, getState) => (
    new Promise((resolve, reject) => {
        dispatch(updateLoadMessage('validating local file'));

        resolve();
    })
);

export const resolveURL = () => (dispatch, getState) => (
    new Promise((resolve, reject) => {
        dispatch(updateLoadMessage('validating remote file'));

        resolve();
    })
);
