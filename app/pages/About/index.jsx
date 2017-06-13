import React from 'react';
import { Panel, Alert, Table, Grid, Row, Col } from 'react-bootstrap';
import GitHubForkRibbon from 'react-github-fork-ribbon';

export default () => (
    <Grid>
        <GitHubForkRibbon
            href="https://github.com/qiime2/q2view"
            target="_blank"
            position="right"
            color="green"
        >
            Fork me on GitHub
        </GitHubForkRibbon>
        <h2>About QIIME 2 View</h2>
        <p>
            QIIME 2 View (or q2view for short) is an entirely client-side interface for viewing
            QIIME 2 artifacts and visualizations (.qza/.qzv files respectively). This means that
            you do not need to have a working QIIME 2 installation to inspect QIIME 2 results.
            It also means that the files you provide are not sent beyond your browser. In other
            words, this entire site functions without a server (which makes it very inexpensive
            to operate).
        </p>
        <p>
            Additionally, q2view supports viewing externally hosted files, which means you can
            provide a link to your file (for example on Dropbox) and q2view will automatically
            download and display it. Better yet, the resulting pages are themselves shareable,
            so if a collaborator does not have QIIME 2, you can simply upload your results and
            share your q2view links with your collaborator. q2view will automatically fetch your
            results and display them to your collaborator.
        </p>
        <p>
            This is all made possible through the new HTML5 <a
                href="https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API"
                target="_blank"
                rel="noopener noreferrer"
            >Service Worker API</a>.
            Because QIIME 2 results are actually zip files containing a <code>/data/
            </code> directory, q2view can hoist that content by giving its service worker a
            reference to the file. It can then serve individual HTML pages (as well as data,
            Javascript, and CSS) from that zipped directory as if they were a part of the website
            itself. This means our visualizations can become powerfully interactive and rich without
            compromising the portability of them.
        </p>
        <p>
            q2view also understands the <code>/provenance/</code> directory of every QIIME 2 result
            which means in addition to rehosting interactive rich content, it can display the
            specific actions, parameters, and even versions of the software used to generate the
            content. This means you never need to worry about losing track of what your
            visualizations represent.
        </p>
        <h2 id="troubleshooting">Troubleshooting</h2>
        <p>This section is for common errors you may encounter when using q2view.</p>
        <Panel>
            <Row>
                <Col md={6}>
                    <Alert bsStyle="danger">TypeError: Failed to fetch</Alert>
                </Col>
                <Col md={6}>
                    <Alert bsStyle="danger">
                        TypeError: NetworkError when attempting to fetch resource.
                    </Alert>
                </Col>
            </Row>
            <p>
                This can happen for a variety of reasons, but the most common are either the URL
                does not exist, you&apos;ve lost your internet connection, or the server does not
                support CORS and must set the <a href="#headers">required headers</a>.
            </p>
        </Panel>
        <Panel>
            <Alert bsStyle="danger">
                Error: Can&apos;t find end of central directory : is this a zip file ?
                If it is, see http://stuk.github.io/jszip/documentation/howto/read_zip.html
            </Alert>
            <p>
                What you have provided is not a QIIME 2 .qza or .qzv file. It is possible that
                q2view is seeing an HTML page which may contain a .qza/.qzv file. If that is the
                case, try to find the link that is a <em>direct download</em> and provide that
                instead.
            </p>
        </Panel>
        <Panel>
            <Alert bsStyle="danger">Error: Not a valid QIIME 2 archive.</Alert>
            <p>
                The file you have provided is a .zip file, not a .qza or .qzv file (or there is
                something terribly wrong with your .qza/.qzv file). This interface only works
                on QIIME 2 files.
            </p>
        </Panel>
        <h2 id="headers">Required Headers</h2>
        <p>
            The following headers must be returned by the server in order for view.qiime2.org to
            be able to read the response. If they are not set, then the browser will deny access
            under the <a
                href="https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy"
                target="_blank"
                rel="noopener noreferrer"
            >Same-Origin Policy</a>.
        </p>
        <Table>
            <thead>
                <tr>
                    <th>Header Name</th>
                    <th>Header Value</th>
                    <th>Notes</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Access-Control-Allow-Origin</td>
                    <td>view.qiime2.org</td>
                    <td>(using * as the value is also acceptable)</td>
                </tr>
                <tr>
                    <td>Access-Control-Allow-Methods</td>
                    <td>GET, HEAD</td>
                    <td>(more methods may be provided, but these must at least be present)</td>
                </tr>
            </tbody>
        </Table>
        <p>
            Additionally, the <strong>server must provide its content using HTTPS
            </strong> otherwise the Same-Origin Policy prevents access to the data.
        </p>
    </Grid>
);
