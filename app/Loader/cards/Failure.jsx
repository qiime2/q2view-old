import React from 'react';

import BaseCard from './BaseCard';

export default ({ reason, title }) => (
    <BaseCard title={ title }>
        <p>{ reason.toString() }</p>
    </BaseCard>
)
