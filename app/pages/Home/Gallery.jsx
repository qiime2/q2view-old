/* eslint-disable no-multi-str */

import React from 'react';
import { Row, Col, Thumbnail, Button } from 'react-bootstrap';

import taxaThumb from './img/taxa_thumb.png';
import summarizeThumb from './img/summarize_thumb.png';
import emperorThumb from './img/emperor_thumb.png';
import volatilityThumb from './img/volatility_thumb.png';
import alphaRareThumb from './img/alpha_rarefaction_thumb.png';
import alphaSigThumb from './img/alpha_significance_thumb.png';

const taxaThumObj = {
    title: 'Taxonomic Bar Plots',
    desc: 'Explore the taxonomy of samples in the Moving Pictures Tutorial. Try\
            selecting different taxonomic levels and metadata-based sample sorting.',
    href: '/?type=html&src=https%3A%2F%2Fdocs.qiime2.org%2F2019.4%2Fdata%2F\
            tutorials%2Fmoving-pictures%2Ftaxa-bar-plots.qzv',
    img: taxaThumb
};

const volThumObj = {
    name: volatilityThumb,
    title: 'Volatility Control Chart',
    desc: 'Explore interactive line plots to assess how volatile a dependent variable\
            is over a continuous, independent variable in one or more groups.',
    href: '/?type=html&src=https%3A%2F%2Fdocs.qiime2.org%2F2019.4%2Fdata\
            %2Ftutorials%2Flongitudinal%2Fvolatility.qzv',
    img: volatilityThumb
};

const sumThumObj = {
    title: 'Feature Table Summary',
    desc: 'Preview the impact of rarefying your data by manipulating the sampling\
            depth to determine which samples or sample groups would be filtered.',
    href: '/?type=html&src=https%3A%2F%2Fdocs.qiime2.org%2F2019.4%2Fdata%2F\
            tutorials%2Fmoving-pictures%2Ftable.qzv',
    img: summarizeThumb
};

const empThumObj = {
    name: emperorThumb,
    title: 'Emperor Ordination',
    desc: 'View the differences between sample composition using unweighted UniFrac in\
            ordination space. Color the samples by different metadata columns.',
    href: '/?type=html&src=https%3A%2F%2Fdocs.qiime2.org%2F2019.4%2Fdata%2F\
            tutorials%2Fmoving-pictures%2Fcore-metrics-results%2Funweighted_\
            unifrac_emperor.qzv',
    img: emperorThumb
};

const alphaRObj = {
    title: 'Alpha Rarefaction Plots',
    desc: 'Explore alpha diversity as a function of sampling depth using the qiime\
            diversity alpha-rarefaction visualizer.\
            ',
    href: '/?type=html&src=https%3A%2F%2Fdocs.qiime2.org%2F2019.4%2Fdata%2F\
            tutorials%2Fmoving-pictures%2Falpha-rarefaction.qzv',
    img: alphaRareThumb
};

const alphaSObj = {
    title: 'Alpha Diversity Boxplots',
    desc: 'View the association between categorical metadata columns and alpha \
            diversity data for Faith Phylogenetic Diversity and evenness metrics.',
    href: '/?type=html&src=https%3A%2F%2Fdocs.qiime2.org%2F2019.4%2Fdata%2Ftutorials\
            %2Fmoving-pictures%2Fcore-metrics-results%2Ffaith-pd-group-significance.qzv',
    img: alphaSigThumb
};


const Gallery = ({ img, title, desc, href }) => (
    <Thumbnail style={{ height: 428.8 }} src={img} alt={title}>
        <h3>{title}</h3>
        <p>{desc}</p>
        <p style={{ textAlign: 'right', position: 'absolute', bottom: 25, right: 25 }}>
            <Button
                bsStyle="primary"
                href={href}
            >Try it!
            </Button>
        </p>
    </Thumbnail>

);


export default () => (
    <div>
        <Row style={{ display: 'flex' }}>
            <Col xs={6} md={4}> <Gallery {...taxaThumObj} /></Col>
            <Col xs={6} md={4}> <Gallery {...volThumObj} /></Col>
            <Col xs={6} md={4}> <Gallery {...empThumObj} /></Col>
        </Row>
        <Row style={{ display: 'flex' }}>
            <Col xs={6} md={4}><Gallery {...sumThumObj} /></Col>
            <Col xs={6} md={4}><Gallery {...alphaRObj} /></Col>
            <Col xs={6} md={4}><Gallery {...alphaSObj} /></Col>
        </Row>
    </div>

);
