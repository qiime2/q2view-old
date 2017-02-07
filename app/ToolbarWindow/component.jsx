import React from 'react';

import MenuContainer from './MenuContainer';
import Content from './Content';

export default ({ children, location }) => (
    <div>
        <MenuContainer location={location} />
        <Content>{children}</Content>
    </div>
);
