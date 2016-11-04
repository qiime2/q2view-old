import React from 'react';
import Loader from '../Loader';


const frameWrapper = {
    position: 'fixed',
    width: '100%',
    // "Temporary" hack
    height: 'calc(100% - 52px)',
    overflow: 'auto'
};

export default ({ children }) => (
    <div style={frameWrapper}>
        <div className="js-needed">
            <Loader>{children}</Loader>
        </div>
    </div>
);
