import React from 'react';
import { Col, Row } from 'react-bootstrap';

import URLInput from './URLInput';

export default ({ submit, cancel }) => (
    <div style={{ paddingBottom: '30px' }}>
        <Row>
            <Col md={12}>
                <URLInput
                    submit={submit}
                    cancel={cancel}
                    placeholder="URL to a .qza/.qzv file on the web"
                />
            </Col>
        </Row>
        <Row>
            <Col md={6}>
                <h3>Web URL Instructions:</h3>
                <p>Provide a link to your file in the input form above and hit &quot;Go!&quot;.</p>
                <p>
                    Note: the server that is hosting your file must support <a
                        href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        CORS
                    </a>. See <a href="/about/#headers" target="_blank" rel="noopener noreferrer">
                        Required Headers
                    </a> for more information.
                </p>
            </Col>
            <Col md={6}>
                <h3>Known Supported Websites:</h3>
                <ul>
                    <li>
                        <a href="https://docs.qiime2.org" target="_blank" rel="noopener noreferrer">
                            docs.qiime2.org
                        </a>
                    </li>
                    <li>
                        <a href="https://forum.qiime2.org" target="_blank" rel="noopener noreferrer">
                            forum.qiime2.org
                        </a>
                    </li>
                    <li>
                        websites hosted
                        on <a href="https://pages.github.com/" target="_blank" rel="noopener noreferrer">
                            GitHub Pages
                        </a>
                    </li>
                    <li>
                        &lt;your webserver here&gt;
                        (see <a href="/about/#headers" target="_blank" rel="noopener noreferrer">
                            Required Headers
                        </a>)
                    </li>
                </ul>
            </Col>
        </Row>
    </div>
);
