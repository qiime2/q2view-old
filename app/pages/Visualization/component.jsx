import React from 'react';


const style = {
    width: '100%',
    height: '100%',
    position: 'absolute'
};


export default ({ iframeURL }) => (
    <iframe
        frameBorder="0"
        src={iframeURL}
        style={style}
    />
);
