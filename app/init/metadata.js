import { updateLoadMessage } from '../Loader/dux';
import { getReader } from './dux';
import { setMetadata } from '../pages/Details/dux';

export default () => (dispatch, getState) => {
    const reader = getReader(getState());
    dispatch(updateLoadMessage('loading metadata'));

    return reader.getMetadata().then((metadata) => {
        dispatch(setMetadata(metadata));
    });
};
