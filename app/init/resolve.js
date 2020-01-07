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
            if (!response.ok) {
                throw Error(`Network error, recieved ${response.status} from server.`);
            }
            return fetch(rawSrc.data).then(res => res.blob());
        }).then(Reader.createReaderFromFile).then((reader) => {
            dispatch(setSource(encodeURIComponent(rawSrc.data)));
            dispatch(setReader(reader));
        });
};
