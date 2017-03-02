import React from 'react';

import { Grid, Row, Col, Panel } from 'react-bootstrap';

import DAGView from './dagContainer';
import SelectionView from './selectionContainer';


const Pane = ({ children }) => (
    <div style={{ height: '100%', overflow: 'auto', position: 'relative' }}>
        { children }
    </div>
);

export default ({ viewTitle }) => (
    <Grid>
        <Row style={{ marginTop: '30px' }}>
            <Col md={7}>
                <Panel header={(<h3>Provenance Graph</h3>)}>
                    <Pane><DAGView /></Pane>
                </Panel>
            </Col>
            <Col md={5}>
                <Panel header={(<h3>{ viewTitle }</h3>)}>
                    <Pane><SelectionView /></Pane>
                </Panel>
            </Col>
        </Row>
    </Grid>
);
