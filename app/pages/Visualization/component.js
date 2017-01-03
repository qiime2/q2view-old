import React from 'react';

export default ({ iframeURL }) => (
    <iframe frameBorder="0" src={ iframeURL } style={ {width: '100%', height: '100%', position: 'absolute'} }>
    </iframe>
)
