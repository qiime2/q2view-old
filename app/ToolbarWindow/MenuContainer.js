import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { getMetadata } from '../pages/Peek/dux';

import Menu from './Menu';

const mapStateToProps = (state) => ({
    metadata: getMetadata(state)
})

const mapDispatchToProps = (dispatch) => ({
    push: (path) => dispatch(push(path))
});


export default connect(mapStateToProps, mapDispatchToProps)(Menu);
