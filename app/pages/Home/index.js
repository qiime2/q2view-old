import React from 'react';
import {Grid, Button, Jumbotron} from 'react-bootstrap';
import Dropzone from 'react-dropzone';

export default () => (
    <Grid>
    <Jumbotron>
    <h2>Get started</h2>
    <p>Drag and drop a QIIME 2 Artifact or Visualization into this field. Or provide a URL to one!</p>
    <p><Dropzone multiple={false}>
        Drag and drop (or click) to view a QIIME 2 Artifact or Visualization.
    </Dropzone></p>
    </Jumbotron>
    </Grid>
);
