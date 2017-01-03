import React from 'react';
import { Grid } from 'react-bootstrap';

export default ({ children, title }) => (
    <Grid>
        <h1>{ title }</h1>
        { children }
    </Grid>
)
