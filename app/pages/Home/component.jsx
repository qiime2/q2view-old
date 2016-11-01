import React from 'react';
import {Grid, Button, Jumbotron, FormGroup, InputGroup, FormControl, Glyphicon } from 'react-bootstrap';
import Dropzone from 'react-dropzone';

const dropStyle = {
    'line-height': '200px',
    'vertical-align': 'middle',
    'text-align': 'center',
    width: 'auto',
    border: 'dashed',
    'border-radius': '2px'
}

export default () => (
    <Grid>
        <Jumbotron style={{'background-color': 'transparent', 'padding': '0px'}}>
            <h1 style={ {'margin-bottom': '20px'} }>Get started</h1>
            <FormGroup>
              <InputGroup bsSize='large'>
                <FormControl type="text" placeholder="Enter a public URL to your QIIME 2 Artifact or Visualization (.qza/.qzv)"/>
                <InputGroup.Button>
                  <Button>Go!</Button>
                </InputGroup.Button>
              </InputGroup>
            </FormGroup>
            <p style={ {'text-align': 'center'} }>- or -</p>
            <Dropzone style={ dropStyle } multiple={false} accept=".qza,.qzv" onDrop={(a, r) => {console.log(a); console.log(r)}}>
                <p>Drag and drop (or click) to view a local QIIME 2 Artifact or Visualization (.qza/.qzv)</p>
            </Dropzone>
        </Jumbotron>
    </Grid>
);
