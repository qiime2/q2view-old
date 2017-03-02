import { updateLoadMessage } from '../Loader/dux';
import { setBrowserCompatible } from './dux';


export default () => dispatch => new Promise((resolve, reject) => {
    const redirectToIncompatibleBrowser = () => {
        // unloads document entirely, all scripts will stop executing
        window.location = '/incompatible-browser/';
        reject('redirecting...');
    };

    dispatch(updateLoadMessage('checking browser compatibility'));

    if (typeof window.navigator === 'undefined') {
        redirectToIncompatibleBrowser();
    }

    if (typeof window.navigator.serviceWorker === 'undefined') {
        redirectToIncompatibleBrowser();
    }

    if (typeof window.MessageChannel === 'undefined') {
        redirectToIncompatibleBrowser();
    }

    if (typeof window.history === 'undefined') {
        redirectToIncompatibleBrowser();
    }

    if (typeof window.history.pushState === 'undefined') {
        redirectToIncompatibleBrowser();
    }

    dispatch(setBrowserCompatible(true));
    resolve();
});
