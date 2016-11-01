import React from 'react';

import BaseCard from './BaseCard';

export default ({ reason }) => (
    <BaseCard title='Something went wrong!'>
        <p>{ reason }</p>
    </BaseCard>
)
