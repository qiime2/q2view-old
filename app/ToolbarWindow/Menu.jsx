import React from 'react';
import { Link, browserHistory } from 'react-router';
import { NavItem, Navbar, Nav, NavDropdown, MenuItem} from 'react-bootstrap';

import queryString from 'query-string';

import logo from './img/qiime2-rect-100.png';


export default class Menu extends React.Component {
    makeLinkProps(path, queryParams={}) {
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
        }
    }

    render() {
        return (
            <Navbar>
                <Navbar.Header>
                    <a href='/'>
                        <img style={{height: '40px', marginRight: '10px', marginTop: '4px'}} className='navbar-left' src={logo} alt='QIIME 2'/>
                    </a>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav pullRight={true}>
                        <Navbar.Brand>
                            {/* Hitting home *should* unload the document */}
                            <a href='/'>
                                https://view.qiime2.org/
                            </a>
                        </Navbar.Brand>

                    {this.props.hasVisualization && (
                        <NavItem {...this.makeLinkProps('/visualization', {'type': 'html'})}
                         className={(this.props.location.pathname === '/visualization/') ? 'active': ''}>
                            Visualization
                        </NavItem>
                    )}
                    {this.props.hasMetadata && (
                        <NavItem {...this.makeLinkProps('/peek')}
                         className={(this.props.location.pathname === '/peek/') ? 'active': ''}>
                            Peek
                        </NavItem>
                    )}
                    {this.props.hasProvenance && (
                        <NavItem {...this.makeLinkProps('/provenance')}
                         className={(this.props.location.pathname === '/provenance/') ? 'active': ''}>
                            Provenance
                        </NavItem>
                    )}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}
