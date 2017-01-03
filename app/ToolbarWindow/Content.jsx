import React from 'react';
import Loader from '../Loader';


const frameWrapper = {
    position: 'fixed',
    width: '100%',
    height: '100%',
    marginTop: '-20px',
    overflow: 'auto'
};

export default ({ children }) => (
    <div style={frameWrapper}>
        <div className="js-needed">
            <Loader>{children}</Loader>
        </div>
    </div>
);
