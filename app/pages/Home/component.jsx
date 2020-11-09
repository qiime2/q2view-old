import React from 'react';
import { Link } from 'react-router';
import { Grid, Row, Col } from 'react-bootstrap';

import FromLocal from './FromLocal';
import FromURL from './FromURL';
import Gallery from './Gallery';

export default ({ submitFile, submitURL, redirectTo }) => (
    <Grid style={{ marginTop: '20px' }}>
        <Row>
            <Col md={12}>
                <p style={{ fontSize: '18px' }}>
                    This interface can view .qza and .qzv files
                    directly in your browser without uploading to a server.
                    <span>&nbsp;<Link to="/about">Click here</Link> to learn more.</span>
                </p>
            </Col>
        </Row>
        <Row>
            <Col md={12}><FromLocal submit={submitFile} /></Col>
        </Row>
        <Row>
            <Col md={12}><FromURL submit={submitURL} /></Col>
        </Row>
        <Row>
            <Col md={12}>
                <h2>Gallery</h2>
                <p style={{ fontSize: '18px' }}>
                    Don&apos;t have a QIIME 2 result of your own to view? Try one of these!
                </p>
                <Gallery redirectTo={redirectTo} />
            </Col>
        </Row>
    </Grid>
);
