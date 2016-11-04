import React from 'react';

import JSONTree from 'react-json-tree';
import theme from '../../lib/theme';


const expander = (keyName, data, level) => {
    return keyName[0] != 'python-packages';
}

export default ({ selection }) => {
    if (selection === null) {
        return (<p>Click on an element of the Provenance Graph to learn more.</p>);
    } else if (typeof selection === 'undefined') {
        return (<p>This artifact has no provenance.</p>);
    } else {
        return (<JSONTree theme={theme} getItemString={() => null} hideRoot={true} shouldExpandNode={expander} data={ selection } />);
    }
}
