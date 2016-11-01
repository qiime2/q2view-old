import React from 'react';
import { ProgressBar } from 'react-bootstrap';

import BaseCard from './BaseCard';

export default ({ message, progress }) => (
    <BaseCard title='Loading'>
        <ProgressBar active now={ progress } min={0} max={1} style={ {'margin-bottom': '10px'} }/>
        <p style={ {'text-align': 'right'} }>({ message })</p>
    </BaseCard>
)
