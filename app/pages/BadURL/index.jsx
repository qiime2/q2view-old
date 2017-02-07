import React from 'react';
import { Link } from 'react-router';
import { Grid } from 'react-bootstrap';

export default () => (
    <Grid>
        <h1>Page Not Found</h1>
        <p>Sorry, the page you are looking for does not exist.</p>
        <p><Link to="/">back to home</Link></p>
    </Grid>
);
