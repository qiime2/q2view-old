import React from 'react';

class LinkToggle extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        e.preventDefault();
        this.props.onClick(e);
    }

    render() {
        return (
            <a href="" onClick={this.handleClick} style={{ backgroundColor: 'transparent' }}>
                {this.props.children}
            </a>
        );
    }
}

export default LinkToggle;
