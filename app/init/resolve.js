import { updateLoadMessage } from '../Loader/dux';
import { getRawSource, setSource, setReader } from './dux';
import Reader from '../lib/reader';

export const resolveFile = () => (dispatch, getState) => {
    dispatch(updateLoadMessage('validating local file'));
    const rawSrc = getRawSource(getState());

    return Reader.createReaderFromFile(rawSrc.data).then((reader) => {
        dispatch(setSource(reader.uuid));
        dispatch(setReader(reader));
    });
};

export const resolveURL = () => (dispatch, getState) => {
    dispatch(updateLoadMessage('validating remote file'));
    const rawSrc = getRawSource(getState());

    return fetch(rawSrc.data, { method: 'HEAD', mode: 'cors' })
        .then((response) => {
            if (response.ok) {
                const headers = response.headers;
                let contentLength = headers.get('Content-Length');
                // not everyone sets 'Access-Control-Allow-Headers: *' (GitHub pages!)
                if (contentLength !== null) {
                    contentLength = parseInt(contentLength, 10);
                }
                if (headers.has('Accept-Ranges') && headers.get('Accept-Ranges') === 'bytes') {
                    // TODO: be smarter with the Ranges header
                    return fetch(rawSrc.data).then(res => res.blob());
                } else if (contentLength === null || contentLength <= 15 * 1024 * 1024) {
                    return fetch(rawSrc.data).then(res => res.blob());
                }
                throw Error(`File is too large (${contentLength} bytes) and the` +
                            ' server does accept the "Ranges" header');
            } else {
                throw Error(`Network error, recieved ${response.status} from server.`);
            }
        }).then(Reader.createReaderFromFile).then((reader) => {
            dispatch(setSource(encodeURIComponent(rawSrc.data)));
            dispatch(setReader(reader));
        });
};
