import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import component from './component';
import { setRawSource } from '../../init/dux';
import { parseFileNameFromURL } from '../../lib/util';

const mapDispatchToProps = dispatch => ({
    submitURL: (event) => {
        event.preventDefault();
        const textInput = event.target[1];
        const url = textInput.value.trim();
        textInput.value = '';
        dispatch(setRawSource({
            from: 'remote',
            data: url,
            name: parseFileNameFromURL(url)
        }));
        const encodedURL = encodeURIComponent(url);
        const newRoute = `/?src=${encodedURL}`;
        dispatch(push(newRoute));
    },
    submitFile: (files) => {
        const file = files[0];
        if (file) {
            dispatch(setRawSource({
                from: 'local',
                data: file,
                name: file.name
            }));
            dispatch(push('/?src=local'));
        } else {
            alert('Not a .qza/.qzv file.');
        }
    }
});

export default connect(null, mapDispatchToProps)(component);
