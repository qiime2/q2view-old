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
                    placeholder="shared link to a .qza/.qzv file on Dropbox"
                />
            </Col>
        </Row>
        <h3>Dropbox Instructions:</h3>
        <ol>
            <li>Find the file you would like to share.</li>
            <li>
                Create a <a
                    href="https://www.dropbox.com/help/files-folders/view-only-access"
                    target="_blank"
                    rel="noopener noreferrer"
                >shared <strong>link</strong></a> to it.
            </li>
            <li>Provide that link in the input form above and hit &quot;Go!&quot;</li>
        </ol>
    </div>
);
