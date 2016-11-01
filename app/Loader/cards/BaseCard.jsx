import React from 'react';
import { Grid, Jumbotron } from 'react-bootstrap';

export default ({ children, title }) => (
    <Grid>
        <Jumbotron style={{'background-color': 'transparent',  'padding': '0px'}}>
            <h1>{ title }</h1>
            { children }
        </Jumbotron>
    </Grid>
)
