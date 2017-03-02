import React from 'react';
import { Grid, Row, Col, Button, FormGroup, InputGroup, FormControl } from 'react-bootstrap';
import Dropzone from 'react-dropzone';

const dropStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
    width: 'auto',
    height: '200px',
    border: 'dashed',
    borderRadius: '2px',
    borderWidth: '2px',
    borderColor: '#555',
    color: '#999',
    cursor: 'pointer'
};

const onDropStyle = {
    ...dropStyle,
    border: 'solid',
    borderRadius: '5px',
    boxShadow: 'inset 3px 3px 10px #555',
    color: 'rgba(0, 0, 0, 0)'
};

export default ({ submitFile, submitURL }) => (
    <Grid style={{ marginTop: '20px' }}>
        <Row>
            <Col md={12}>
                <form onSubmit={submitURL}>
                    <FormGroup>
                        <InputGroup bsSize="large">
                            <FormControl
                                type="text"
                                placeholder="Enter a public URL to your QIIME 2 Artifact or Visualization (.qza/.qzv)" // eslint-disable-line max-len
                            />
                            <InputGroup.Button>
                                <Button type="submit" bsStyle="primary">Go!</Button>
                            </InputGroup.Button>
                        </InputGroup>
                    </FormGroup>
                </form>
            </Col>
        </Row>
        <h3 style={{ textAlign: 'center', marginBottom: '30px' }}>- or -</h3>
        <Row>
            <Col md={12}>
                <Dropzone
                    style={dropStyle} activeStyle={onDropStyle} disablePreview multiple={false}
                    accept=".qza,.qzv" onDrop={submitFile}
                >
                    <p style={{ fontSize: '18px', padding: '10px' }}>
                        Drag and drop (or click) to view a local QIIME 2 Artifact
                        or Visualization (.qza/.qzv)
                    </p>
                </Dropzone>
            </Col>
        </Row>
    </Grid>
);
