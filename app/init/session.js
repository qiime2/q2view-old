import { updateLoadMessage } from '../Loader/dux';
import { getReader, getServiceWorker } from './dux';

export default () => (dispatch, getState) => {
    dispatch(updateLoadMessage('initializing loopback session'));
    const state = getState();
    const reader = getReader(state);
    const sw = getServiceWorker(state);
    return reader.attachToServiceWorker(sw);
};
