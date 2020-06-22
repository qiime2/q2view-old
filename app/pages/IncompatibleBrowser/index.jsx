import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import chrome from './img/chrome.png';
import firefox from './img/firefox.png';

const downloadChrome = 'https://www.google.com/chrome/browser/';
const downloadFirefox = 'https://www.mozilla.org/firefox';

export default () => (
    <Grid style={{ textAlign: 'center' }}>
        <h1>Incompatible Browser</h1>
        <Row style={{ marginBottom: '50px' }}>
            <Col md={12}>
                Sorry, your current browser does not support the latest
                web-technologies that this site needs.
            </Col>
        </Row>
        <Row className="show-grid">
            <Col md={6} mdPush={6} style={{ 'margin-bottom': '4em' }}>
                <a href={downloadFirefox}><img src={firefox} alt="Firefox" /></a>
                <h3>
                    Download <strong><a href={downloadFirefox}>Mozilla Firefox&reg;</a></strong>
                </h3>
                <p>(requires version 47 or later;<br />will not work in private browsing)</p>
            </Col>
            <Col md={6} mdPull={6}>
                <a href={downloadChrome}><img src={chrome} alt="Chrome" /></a>
                <h3>
                    Download <strong><a href={downloadChrome}>Google Chrome&reg;</a></strong>
                </h3>
                <p>(requires version 49 or later)</p>
            </Col>
        </Row>
    </Grid>
);
