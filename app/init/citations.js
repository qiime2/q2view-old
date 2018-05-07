import { updateLoadMessage } from '../Loader/dux';
import { setCitations, getReader } from './dux';
import bibtexDeduplication from '../lib/bibtex';


export default () => (dispatch, getState) => {
    dispatch(updateLoadMessage('loading citations'));

    const reader = getReader(getState());

    return reader.getCitations().then((citations) => {
        if (citations === null) {
            dispatch(setCitations(null));
            return;
        }

        // clean up citations to remove duplicates
        const dedup = bibtexDeduplication();
        const formatted = dedup(citations);

        dispatch(setCitations(formatted));
    });
};
