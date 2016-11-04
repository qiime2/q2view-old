
import checkBrowserCompatibility from './browser';
import initalizeServiceWorker from './serviceWorker';
import { resolveFile, resolveURL } from './resolve';
import { redirectToDefault } from './redirect';
import initSession from './session';
import loadMetadata from './metadata';
import loadProvenance from './provenance';

import dx, { getBrowserCompatible, getServiceWorker, getRawSource, setRawSource,
             getSource, hasSession, getProvenance } from './dux';
import { loadSuccess, loadFailed, updateLoadProgress } from '../Loader/dux';
import { getMetadata } from '../pages/Peek/dux';
import redirect from './redirect';

export { dx as initDux }

const requireResult = Object.create(null);
requireResult['/peek/'] = true;
requireResult['/visualization/'] = true;
requireResult['/provenance/'] = true;


export const navigationAction = ({ pathname, query, search }) => (dispatch, getState) => {
    if (pathname == '/incompatible-browser/') {
        dispatch(loadSuccess());
        return;
    }

    const state = getState();
    const todo = [];

    if (!getBrowserCompatible(state)) {
        todo.push(checkBrowserCompatibility);
    }

    if (!getServiceWorker(state)) {
        todo.push(initalizeServiceWorker);
    }

    if (query.src) {
        let isLocal = (query.src === 'local' ||
            /^[0-9a-f]{8}-([0-9a-f]{4}-){3}[0-9a-f]{12}$/i.test(query.src));

        if (isLocal) {
            if (!getRawSource(state)) {
                // No backing data, explain and early return
                    dispatch(loadFailed(
                        `This was a temporary page and is not shareable. To share
                        QIIME 2 Artifacts and Visualizations, please upload
                        your file to a file hosting service and provide the
                        resulting URL to the home screen of this application.`,
                        'Expired Page'));
                return;
            }

            if (!getSource(state)) {
                todo.push(resolveFile);

                // first time load, prevent accidental navigation away
                window.addEventListener("beforeunload", (event) => {
                    const confirmationMessage = "You will lose your current view.";
                    event.returnValue = confirmationMessage;
                    return confirmationMessage
                });
            }
        } else {
            // URL source
            if (!getRawSource(state)) {
                // easily handled right away
                dispatch(setRawSource({
                    from: 'remote',
                    data: decodeURIComponent(query.src)
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

        if (pathname == '/') {
            todo.push(redirectToDefault);
        }
    }

    const traverseTodo = (i) => {
        if (i < todo.length) {
            dispatch(todo[i]()).then(() => {
                i++;
                dispatch(updateLoadProgress(i / todo.length));
                traverseTodo(i);
            }).catch((error) => {
                dispatch(loadFailed(error));
                throw error;
            })
        } else {
            dispatch(loadSuccess());
        }
    }

    if (todo.length) {
        traverseTodo(0);
    }
}
