import React from 'react';
import { connect } from 'react-redux';
import Citation from 'citation-js';

import { getCitations, getReader } from '../../init/dux';
import { getCitationStyle, setCitationStyle } from '../Provenance/dux';

import asm from './citation-templates/asm.csl';
import cell from './citation-templates/cell.csl';
import chicago from './citation-templates/chicago.csl';
import mla from './citation-templates/mla.csl';
import nature from './citation-templates/nature.csl';

const component = ({ citations, uuid, citationStyle, dispatchSetCitationStyle }) => {
    if (!citations) {
        return (<p style={{ marginTop: '5px' }}>No citations were recorded for this file.</p>);
    }

    const register = Citation.CSL.register.addTemplate;
    register('asm', asm);
    register('cell', cell);
    register('chicago', chicago);
    register('mla', mla);
    register('nature', nature);

    const formatCitation = new Citation(citations);
    let formatted;
    let fileContent;
    let display;
    let fileExt;

    if (citationStyle === 'bibtex') {
        formatted = formatCitation.format('bibtex');
        display = <pre dangerouslySetInnerHTML={{ __html: formatted }} />;
        fileContent = formatted;
        fileExt = 'bib';
    } else if (citationStyle === 'ris') {
        formatted = formatCitation.format('ris');
        display = <pre dangerouslySetInnerHTML={{ __html: formatted }} />;
        fileContent = formatted;
        fileExt = citationStyle;
    } else {
        formatted = formatCitation.format('bibliography', {
            format: 'html',
            template: citationStyle,
            lang: 'en-US'
        });

        fileContent = formatCitation.format('bibliography', {
            type: 'string',
            template: citationStyle,
            lang: 'en-US'
        });

        display = <div dangerouslySetInnerHTML={{ __html: formatted }} />;
        fileExt = `${citationStyle}.txt`;
    }

    const blob = new Blob([fileContent], { type: 'text/plain' });
    const download = URL.createObjectURL(blob);

    return (<div style={{ marginTop: '10px' }}>
        <label htmlFor="citation-style">
        Citation Format: <select
            id="citation-style" value={citationStyle} onChange={dispatchSetCitationStyle}
        >
            <option value="citation-apa">APA</option>
            <option value="asm">ASM</option>
            <option value="bibtex">BibTeX</option>
            <option value="cell">Cell</option>
            <option value="chicago">Chicago</option>
            <option value="mla">MLA</option>
            <option value="nature">Nature</option>
            <option value="ris">RIS</option>
        </select>
        </label>
        <a href={download} download={`${uuid}.${fileExt}`} style={{ float: 'right' }}><b>Download</b></a>
        <div>
            {display}
        </div>
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
