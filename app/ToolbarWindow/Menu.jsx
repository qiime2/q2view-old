import React from 'react';
import { NavItem, Navbar, Nav, Dropdown } from 'react-bootstrap';

import queryString from 'query-string';
import LinkToggle from './LinkToggle';

import logo from './img/q2view.png';
import linkIcon from './img/link-grey.png';
import downloadIcon from './img/download-grey.png';

const fileNameStyle = {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: 'calc(100% - 515px)',
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
            <Navbar
                style={{
                    borderRadius: '0px',
                    boxShadow: '0px 1px 5px #999',
                    zIndex: 1,
                    border: '0px',
                    marginBottom: '21px'
                }}
            >
                <Navbar.Header>
                    <Navbar.Brand>
                        {/* Hitting home *should* unload the document */}
                        <a href="/">
                            <img
                                style={{ height: '40px', marginTop: '-10px' }}
                                src={logo}
                                alt="QIIME 2 View"
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
                        File:
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
                            {...this.makeLinkProps('/details')}
                            className={(this.props.location.pathname === '/details/') ? 'active' : ''}
                        >
                            Details
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
                        {this.props.downloadURL && (
                        <div className="hidden-xs" style={{ margin: '13px', display: 'inline-block', float: 'left' }}>
                            <Dropdown>
                                <LinkToggle bsRole="toggle">
                                    <img src={linkIcon} alt="Link" />
                                </LinkToggle>
                                <div className="dropdown-menu" style={{ padding: '10px' }} bsRole="menu">
                                    <div style={{ marginBottom: '3px' }}>
                                        <a href={window.document.location.toString()}>
                                            Shareable Link:
                                        </a>
                                    </div>
                                    <div>
                                        <input
                                            readOnly
                                            value={window.document.location.toString()}
                                            type="text"
                                            style={{ color: 'black' }}
                                            onSelect={e => e.stopPropagation()}
                                        />
                                    </div>
                                </div>
                            </Dropdown>
                            <a href={this.props.downloadURL} style={{ marginLeft: '20px' }}>
                                <img src={downloadIcon} alt="Download" />
                            </a>
                        </div>
                    )}
                    </Nav>
                </Navbar.Collapse>
                )}
            </Navbar>
        );
    }
}
