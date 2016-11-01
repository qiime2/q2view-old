import React from 'react';
import JSONTree from 'react-json-tree'
import { Grid, Panel } from 'react-bootstrap';

export default ({ reader }) => {
    const data = reader && reader.getMetadata();
    return (
        <Grid>
            {data && (
                <Panel header={`Peek of ${data.uuid}`}>
                    <JSONTree data={data} />
                </Panel>
            )}
        </Grid>
    );
}
