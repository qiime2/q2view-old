import React from 'react';
import { ProgressBar } from 'react-bootstrap';

import BaseCard from './BaseCard';

export default ({ message, progress }) => (
    <BaseCard title="Loading">
        <div>
            <ProgressBar active now={progress} min={0} max={1} style={{ marginBottom: '10px' }} />
            <p style={{ textAlign: 'right' }}>({ message })</p>
        </div>
    </BaseCard>
);
