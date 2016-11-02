import React from 'react';
import JSONTree from 'react-json-tree';
import { Grid, Panel } from 'react-bootstrap';

export default ({ metadata }) => (
    <Grid>
        <Panel header={`Peek of ${metadata.uuid}`} style={{marginTop: '30px'}}> 
            <JSONTree data={ metadata } />
        </Panel>
    </Grid>
);
