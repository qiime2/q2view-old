import React from 'react';
import { Grid } from 'react-bootstrap';

const BaseCard = ({ children, title }) => (
    <Grid>
        <h1>{ title }</h1>
        { children }
    </Grid>
);

BaseCard.propTypes = {
    children: React.PropTypes.element,
    title: React.PropTypes.string
};


export default BaseCard;
