import React from 'react';
import Loader from '../Loader';


const frameWrapper = {
    position: 'fixed',
    width: '100%',
    marginTop: '-20px',
    height: 'calc(100% - 50px)', // "Temporary" hack, BS navbar is 50px tall
    overflow: 'auto'
};

export default ({ children }) => (
    <div style={frameWrapper}>
        <div className="js-needed">
            <Loader>{children}</Loader>
        </div>
    </div>
);
