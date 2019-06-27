import React from 'react';
import JSONTree from 'react-json-tree';
import { Grid, Panel } from 'react-bootstrap';


import Citations from './citations';
import theme from '../../lib/theme';


export default ({ metadata }) => (
    <Grid>
        <Panel header={`Details of ${metadata.name}`} style={{ marginTop: '30px' }}>
            <JSONTree theme={theme} getItemString={() => null} hideRoot data={metadata} />
        </Panel>
        <Panel header={'Citations'}>
            <Citations />
        </Panel>
    </Grid>
);
