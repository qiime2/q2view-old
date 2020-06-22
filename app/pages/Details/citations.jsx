import React from 'react';
import { connect } from 'react-redux';

import { getCitations, getReader } from '../../init/dux';
import { getCitationStyle, setCitationStyle } from '../Provenance/dux';


const component = ({ citations, uuid, citationStyle, dispatchSetCitationStyle }) => {
    if (!citations) {
        return (<p style={{ marginTop: '5px' }}>No citations were recorded for this file.</p>);
    }

    const blob = new Blob([citations], { type: 'text/plain' });
    const download = URL.createObjectURL(blob);

    return (<div style={{ marginTop: '5px' }}>
        <label htmlFor="citation-style">
            Citation Format: <select
                id="citation-style" value={citationStyle} onChange={dispatchSetCitationStyle}
            >
                <option value="bibtex">BibTeX</option>
            </select>
        </label>
        <a href={download} download={`${uuid}.bib`} style={{ float: 'right' }}><b>Download</b></a>
        <pre>{ citations }</pre>
    </div>);
};


const mapDispatchToProps = dispatch => ({
    dispatchSetCitationStyle: event => dispatch(setCitationStyle(event.target.value))
});

const mapStateToProps = state => ({
    citations: getCitations(state),
    citationStyle: getCitationStyle(state),
    uuid: getReader(state).uuid
});

export default connect(mapStateToProps, mapDispatchToProps)(component);
