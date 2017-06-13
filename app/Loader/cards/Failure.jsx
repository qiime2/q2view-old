import React from 'react';
import { Alert } from 'react-bootstrap';

import BaseCard from './BaseCard';

const Failure = ({ reason, title }) => (
    <BaseCard title={title}>
        <Alert bsStyle="danger">{ reason.toString() }</Alert>
        <p><strong>
            Please see the <a href="/about/#troubleshooting">troubleshooting section
            </a> for assistance.</strong></p>
    </BaseCard>
);

Failure.propTypes = {
    reason: React.PropTypes.instanceOf(Error),
    title: React.PropTypes.string
};

export default Failure;
