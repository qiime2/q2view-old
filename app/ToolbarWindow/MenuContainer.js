import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import Menu from './Menu';
import { mapStateToProps } from '../dux';

const mapDispatchToProps = (dispatch) => ({
    push: (path) => dispatch(push(path))
});


export default connect(mapStateToProps, mapDispatchToProps)(Menu);
