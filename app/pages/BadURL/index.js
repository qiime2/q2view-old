import React from 'react';
import { Link } from 'react-router';
import {Grid, Jumbotron} from 'react-bootstrap';

export default () => (
    <Grid>
        <Jumbotron style={{textAlign: 'center', backgroundColor: 'transparent'}}>
            <h1>Page Not Found :-(</h1>
            <p style={{'margin-top': '2em'}}>Sorry, the page you are looking for does not exist.</p>
            <p><Link to='/'>back to home</Link></p>
        </Jumbotron>
    </Grid>
);
