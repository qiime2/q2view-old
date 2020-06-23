import React from 'react';

import Dropbox from './Dropbox';
import ExternalURL from './ExternalURL';

const linkStyle = {
    whiteSpace: 'nowrap',
    cursor: 'pointer'
};

/* eslint-disable jsx-a11y/no-static-element-interactions */
export default ({ submit, view, dispatchViewDropbox, dispatchViewExternalURL,
    dispatchDefault }) => {
    let dom = null;
    switch (view) {
    case 'DROPBOX':
        dom = <Dropbox submit={submit} cancel={dispatchDefault} />;
        break;
    case 'EXTERNAL':
        dom = <ExternalURL submit={submit} cancel={dispatchDefault} />;
        break;
    default:
        dom = (<p style={{ textAlign: 'center', fontSize: '18px' }}>
            You can also provide a link to
            a <a onClick={dispatchViewDropbox} style={linkStyle} role="button" >
                file on Dropbox</a> or
            a <a onClick={dispatchViewExternalURL} style={linkStyle} role="button">
                file from the web</a>.
        </p>);
        break;
    }

    return dom;
};
