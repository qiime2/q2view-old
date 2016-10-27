import React from 'react';


const frameWrapper = {
    position: 'fixed',
    width: '100%',
    height: 'calc(100% - 52px)',
    overflow: 'auto'
};

export default ({ children }) => (
    <div style={frameWrapper}>
        <div className="js-needed">
            {children}
        </div>
    </div>
);
