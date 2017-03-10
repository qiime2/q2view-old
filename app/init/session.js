import { updateLoadMessage } from '../Loader/dux';
import { getReader } from './dux';

export default () => (dispatch, getState) => {
    dispatch(updateLoadMessage('initializing loopback session'));
    const reader = getReader(getState());
    reader.attachToServiceWorker();
    return fetch('/_/wakeup');
};
