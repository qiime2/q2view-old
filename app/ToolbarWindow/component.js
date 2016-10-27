import React from 'react';
import { NavItem, Navbar, Nav, NavDropdown, MenuItem} from 'react-bootstrap';
import { Link, browserHistory } from 'react-router';

import queryString from 'query-string';

class ToolbarWindow extends React.Component {
    linkTo(path, queryParams={}) {
        return () => {
            const { src } = queryString.parse(location.search)
            const newQueryString = queryString.stringify({
                src,
                ...queryParams
            })
            browserHistory.push(`${path}/?${newQueryString}`)
        }
    }

    render() { return (
        <div>
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to='/'>q2view</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav pullRight={true}>
                        <NavDropdown title="Visualization">
                            <MenuItem onClick={ this.linkTo('/visualization', {'type': 'html'}) }>
                                html
                            </MenuItem>
                            <MenuItem onClick={ this.linkTo('/visualization', {'type': 'svg'}) }>
                                svg
                            </MenuItem>
                            <MenuItem onClick={ this.linkTo('/visualization', {'type': 'csv'}) }>
                                csv
                            </MenuItem>
                        </NavDropdown>
                        <NavItem onClick={ this.linkTo('/provenance') }>
                            Provenance
                        </NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <div className='js-needed'>{ this.props.children }</div>
        </div>
    )}
}


export default ToolbarWindow;
