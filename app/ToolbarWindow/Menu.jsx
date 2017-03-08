import React from 'react';
import { NavItem, Navbar, Nav } from 'react-bootstrap';

import queryString from 'query-string';

import logo from './img/q2view.png';

const fileNameStyle = {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: 'calc(100% - 450px)',
    overflow: 'hidden',
    fontSize: '16px',
    float: 'none',
    display: 'inline-block',
    marginBottom: '0px'
};

export default class Menu extends React.Component {
    makeLinkProps(path, queryParams = {}) {
        const { src } = this.props.location.query;
        let newQueryString = queryString.stringify({
            src,
            ...queryParams
        });
        if (newQueryString) {
            newQueryString = `?${newQueryString}`;
        }
        const newPath = `${path}/${newQueryString}`;
        return {
            onClick: (e) => {
                this.props.push(newPath);
                e.preventDefault();
            },
            href: newPath
        };
    }

    render() {
        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        {/* Hitting home *should* unload the document */}
                        <a href="/">
                            <img
                                style={{ height: '40px', marginTop: '-10px' }}
                                src={logo}
                                alt="QIIME 2"
                            />
                        </a>
                    </Navbar.Brand>
                    {(this.props.hasVisualization || this.props.hasMetadata || this.props.hasProvenance) && ( // eslint-disable-line max-len
                    <Navbar.Toggle />
                    )}
                </Navbar.Header>
                {(this.props.hasVisualization || this.props.hasMetadata || this.props.hasProvenance) && ( // eslint-disable-line max-len
                <Navbar.Collapse style={{ textAlign: 'center' }}>
                    <Navbar.Text style={fileNameStyle} className="hidden-xs">
                        Current File:
                        <strong title={this.props.fileName}> {this.props.fileName}</strong>
                    </Navbar.Text>
                    <Nav pullRight>
                        {this.props.hasVisualization && (
                        <NavItem
                            {...this.makeLinkProps('/visualization', { type: 'html' })}
                            className={(this.props.location.pathname === '/visualization/') ? 'active' : ''}
                        >
                            Visualization
                        </NavItem>
                    )}
                        {this.props.hasMetadata && (
                        <NavItem
                            {...this.makeLinkProps('/peek')}
                            className={(this.props.location.pathname === '/peek/') ? 'active' : ''}
                        >
                            Peek
                        </NavItem>
                    )}
                        {this.props.hasProvenance && (
                        <NavItem
                            {...this.makeLinkProps('/provenance')}
                            className={(this.props.location.pathname === '/provenance/') ? 'active' : ''}
                        >
                            Provenance
                        </NavItem>
                    )}
                    </Nav>
                </Navbar.Collapse>
                )}
            </Navbar>
        );
    }
}
