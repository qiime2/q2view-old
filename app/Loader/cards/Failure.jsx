import React from 'react';

import BaseCard from './BaseCard';

const Failure = ({ reason, title }) => (
    <BaseCard title={title}>
        <p>{ reason.toString() }</p>
    </BaseCard>
);

Failure.propTypes = {
    reason: React.PropTypes.instanceOf(Error),
    title: React.PropTypes.string
};

export default Failure;
