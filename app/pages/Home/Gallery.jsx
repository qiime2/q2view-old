import React from 'react';
import { Row, Col, Thumbnail, Button } from 'react-bootstrap';

import taxaThumb from './img/taxa_thumb.png';
import summarizeThumb from './img/summarize_thumb.png';
import emperorThumb from './img/emperor_thumb.png';
import volatilityThumb from './img/volatility_thumb.png';
import alphaRareThumb from './img/alpha_rarefaction_thumb.png';
import alphaSigThumb from './img/alpha_significance_thumb.png';

export default () => (
    <div>
        <Row>
            <Col xs={6} md={4}>
                <Thumbnail src={taxaThumb} alt="Taxonomic Bar Plots">
                    <h3>Taxonomic Bar Plots</h3>
                    <p>
                        Explore the taxonomy of samples in the Moving Pictures Tutorial. Try
                        selecting different taxonomic levels and metadata-based sample sorting.
                    </p>
                    <p style={{ textAlign: 'right' }}>
                        <Button
                            bsStyle="primary"
                            href={'/?type=html&src=https%3A%2F%2Fdocs.qiime2.org%2F2019.4%2Fdata%2F' +
                                  'tutorials%2Fmoving-pictures%2Ftaxa-bar-plots.qzv'}
                        >Try it!</Button>
                    </p>
                </Thumbnail>
            </Col>
            <Col xs={6} md={4}>
                <Thumbnail src={volatilityThumb} alt="Volatility Control Chart">
                    <h3>Volatility Control Chart</h3>
                    <p>
                        Explore interactive line plots to assess how volatile a dependent variable
                        is over a continuous, independent variable in one or more groups.
                    </p>
                    <p style={{ textAlign: 'right' }}>
                        <Button
                            bsStyle="primary"
                            href={'/?type=html&src=https%3A%2F%2Fdocs.qiime2.org%2F2019.4%2Fdata' +
                                  '%2Ftutorials%2Flongitudinal%2Fvolatility.qzv'}
                        >Try it!</Button>
                    </p>
                </Thumbnail>
            </Col>
            <Col xs={6} md={4}>
                <Thumbnail src={emperorThumb} alt="Emperor Ordination">
                    <h3>3D PCoA with Emperor</h3>
                    <p>
                        View the differences between sample composition using unweighted UniFrac in
                        ordination space. Color the samples by different metadata columns.
                    </p>
                    <p style={{ textAlign: 'right' }}>
                        <Button
                            bsStyle="primary"
                            href={'/?type=html&src=https%3A%2F%2Fdocs.qiime2.org%2F2019.4%2Fdata%2F' +
                                  'tutorials%2Fmoving-pictures%2Fcore-metrics-results%2Funweighted_' +
                                  'unifrac_emperor.qzv'}
                        >Try it!</Button>
                    </p>
                </Thumbnail>
            </Col>
        </Row>

        <Row>
            <Col xs={6} md={4}>
                <Thumbnail src={summarizeThumb} alt="Feature Table Summary">
                    <h3>Explore Sampling Depth</h3>
                    <p>
                        Preview the impact of rarefying your data by manipulating the sampling
                        depth to determine which samples or sample groups would be filtered.
                    </p>
                    <p style={{ textAlign: 'right' }}>
                        <Button
                            bsStyle="primary"
                            href={'/?type=html&src=https%3A%2F%2Fdocs.qiime2.org%2F2019.4%2Fdata%2F' +
                                  'tutorials%2Fmoving-pictures%2Ftable.qzv'}
                        >Try it!</Button>
                    </p>
                </Thumbnail>
            </Col>
            <Col xs={6} md={4}>
                <Thumbnail src={alphaRareThumb} alt="Alpha Rarefaction Plots">
                    <h3>Alpha Rarefaction Plots</h3>
                    <p>
                        Explore alpha diversity as a function of sampling depth using the
                        qiime diversity alpha-rarefaction visualizer.
                    </p>
                    <p style={{ textAlign: 'right' }}>
                        <Button
                            bsStyle="primary"
                            href={'/?type=html&src=https%3A%2F%2Fdocs.qiime2.org%2F2019.4%2Fdata%2F' +
                                  'tutorials%2Fmoving-pictures%2Falpha-rarefaction.qzv'}
                        >Try it!</Button>
                    </p>
                </Thumbnail>
            </Col>
            <Col xs={6} md={4}>
                <Thumbnail src={alphaSigThumb} alt="Alpha Diversity Boxplots">
                    <h3>Alpha Diversity Boxplots</h3>
                    <p>
                        View the association between categorical metadata columns and alpha
                        diversity data for Faith Phylogenetic Diversity and evenness metrics.
                    </p>
                    <p style={{ textAlign: 'right' }}>
                        <Button
                            bsStyle="primary"
                            href={'/?type=html&src=https%3A%2F%2Fdocs.qiime2.org%2F2019.4%2Fdata%2Ftutorials' +
                                  '%2Fmoving-pictures%2Fcore-metrics-results%2Ffaith-pd-group-significance.qzv'}
                        >Try it!</Button>
                    </p>
                </Thumbnail>
            </Col>
        </Row>
    </div>

);
