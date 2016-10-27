import React from 'react';
import { Link, browserHistory } from 'react-router';
import { NavItem, Navbar, Nav, NavDropdown, MenuItem} from 'react-bootstrap';

import queryString from 'query-string';


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
            <Navbar style={{'margin-bottom': 0}}>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to='/'>q2view</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav pullRight={true}>
                        <NavDropdown title="Visualization">
                            <MenuItem {...this.makeLinkProps('/visualization', {'type': 'html'})}>
                                html
                            </MenuItem>
                            <MenuItem {...this.makeLinkProps('/visualization', {'type': 'svg'})}>
                                svg
                            </MenuItem>
                            <MenuItem {...this.makeLinkProps('/visualization', {'type': 'csv'})}>
                                csv
                            </MenuItem>
                        </NavDropdown>
                        <NavItem {...this.makeLinkProps('/provenance')}>
                            Provenance
                        </NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}
