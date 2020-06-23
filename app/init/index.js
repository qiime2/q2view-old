
import checkBrowserCompatibility from './browser';
import initalizeServiceWorker from './serviceWorker';
import { resolveFile, resolveURL } from './resolve';
import { redirectToDefault } from './redirect';
import initSession from './session';
import loadMetadata from './metadata';
import loadProvenance from './provenance';
import loadCitations from './citations';
import { parseFileNameFromURL } from '../lib/util';

import dx, { getBrowserCompatible, getServiceWorker, getRawSource, setRawSource,
    getSource, hasSession, getProvenance, getFileName, getCitations } from './dux';
import { loadSuccess, loadFailed, updateLoadProgress } from '../Loader/dux';
import { getMetadata } from '../pages/Details/dux';


export { dx as initDux };

const requireResult = Object.create(null);
requireResult['/details/'] = true;
requireResult['/visualization/'] = true;
requireResult['/provenance/'] = true;


export const navigationAction = ({ pathname, query, search, action }) => (dispatch, getState) => {
    if (pathname === '/incompatible-browser/') {
        dispatch(loadSuccess());
        return;
    }

    const state = getState();
    const todo = [];

    if (pathname === '/' && search && action === 'POP' && getRawSource(state)) {
        window.location.replace('/');
    }

    if (pathname === '/' && search === '') {
        todo.push(() => () => new Promise((resolve) => {
            dispatch({ type: 'RESET_APP' });
            resolve();
        }));
    }

    if (!getBrowserCompatible(state)) {
        todo.push(checkBrowserCompatibility);
    }

    if (!getServiceWorker(state)) {
        todo.push(initalizeServiceWorker);
    }

    if (query.src) {
        const isLocal = (query.src === 'local' ||
            /^[0-9a-f]{8}-([0-9a-f]{4}-){3}[0-9a-f]{12}$/i.test(query.src));

        if (isLocal) {
            if (!getRawSource(state)) {
                // No backing data, explain and early return
                dispatch(loadFailed(
                    new Error(`This was a temporary page and is not shareable.
                    To share QIIME 2 Artifacts and Visualizations, please upload
                    your file to a file hosting service and provide the
                    resulting URL to the home screen of this application.`),
                    'Expired Page'));
                return;
            }

            if (!getSource(state)) {
                todo.push(resolveFile);

                // first time load, prevent accidental navigation away
                window.addEventListener('beforeunload', (event) => {
                    const confirmationMessage = 'You will lose your current view.';
                    event.returnValue = confirmationMessage; // eslint-disable-line no-param-reassign, max-len
                    return confirmationMessage;
                });
            }
        } else {
            // URL source
            if (!getRawSource(state)) {
                // easily handled right away
                const urlString = decodeURIComponent(query.src);
                dispatch(setRawSource({
                    from: 'remote',
                    data: urlString,
                    name: parseFileNameFromURL(urlString)
                }));
            }

            if (!getSource(state)) {
                todo.push(resolveURL);
            }
        }

        if (!hasSession(state)) {
            todo.push(initSession);
        }

        if (!getMetadata(state)) {
            todo.push(loadMetadata);
        }

        if (!getProvenance(state)) {
            todo.push(loadProvenance);
        }

        if (!getCitations(state)) {
            todo.push(loadCitations);
        }

        if (pathname === '/') {
            todo.push(redirectToDefault);
        }
    }

    const traverseTodo = (i) => {
        if (i < todo.length) {
            dispatch(todo[i]()).then(() => {
                i += 1; // eslint-disable-line no-param-reassign
                dispatch(updateLoadProgress(i / todo.length));
                traverseTodo(i);
            }).catch((error) => {
                dispatch(loadFailed(error));
                throw error;
            });
        } else {
            dispatch(loadSuccess());
            const fileName = getFileName(getState());
            if (fileName !== null) {
                document.title = `${fileName} | QIIME 2 View`;
            }
        }
    };

    if (todo.length) {
        traverseTodo(0);
    }
};
