import { timeoutAt, waitUntil } from '../lib/util';
import { setServiceWorker } from './dux';
import { updateLoadMessage } from '../Loader/dux';

export default () => (dispatch) => {
    dispatch(updateLoadMessage('initializing service worker'));

    return window.navigator.serviceWorker.register('/service-worker.js')
        .then(reg => Promise.race([
            timeoutAt(5000, 'Service worker registration timed out.'),
            waitUntil(() => reg.active)
        ])).then(sw => dispatch(setServiceWorker(sw)));
};
