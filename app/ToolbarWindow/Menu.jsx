import React from 'react';
import { Link, browserHistory } from 'react-router';
import { NavItem, Navbar, Nav, NavDropdown, MenuItem} from 'react-bootstrap';

import queryString from 'query-string';

import logo from './img/qiime2-square-40.png';


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
            <Navbar style={{marginBottom: 0}}>
                <Navbar.Header>
                    <a href='https://qiime2.org'>
                        <img style={{height: '40px', marginRight: '10px', marginTop: '4px'}} className='navbar-left' src={logo} alt='QIIME 2'/>
                    </a>
                    <Navbar.Brand>
                        {/* Hitting home *should* unload the document */}
                        <a href='/'>
                            q2view
                        </a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav pullRight={true}>
                    {this.props.hasVisualization && (
                        <NavItem {...this.makeLinkProps('/visualization', {'type': 'html'})}>
                            Visualization
                        </NavItem>
                    )}
                    {this.props.hasMetadata && (
                        <NavItem {...this.makeLinkProps('/peek')}>
                            Peek
                        </NavItem>
                    )}
                    {this.props.hasProvenance && (
                        <NavItem {...this.makeLinkProps('/provenance')}>
                            Provenance
                        </NavItem>
                    )}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}
