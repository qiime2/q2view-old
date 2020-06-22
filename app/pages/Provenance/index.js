import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import queryString from 'query-string';

import dx, { getViewTitle } from './dux';
import component from './component';

export { dx as provenanceDux };

const makeLink = (src, dispatchPush) => {
    let newQueryString = queryString.stringify({
        src
    });
    if (newQueryString) {
        newQueryString = `?${newQueryString}`;
    }
    const newPath = `details/${newQueryString}`;
    return {
        onClick: (e) => {
            dispatchPush(newPath);
            e.preventDefault();
        },
        href: newPath
    };
};

const mapStateToProps = state => ({
    viewTitle: getViewTitle(state),
    src: state.routing.locationBeforeTransitions.query.src
});

const mapDispatchToProps = dispatch => ({
    push: path => dispatch(push(path))
});

const mergeProps = ({ viewTitle, src }, propsFromDispatch, ownProps) => ({
    viewTitle,
    goToDetailsProps: makeLink(src, propsFromDispatch.push),
    ...ownProps
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(component);
