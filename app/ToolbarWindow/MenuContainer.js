import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import Menu from './Menu';

const mapDispatchToProps = (dispatch) => ({
    push: (path) => dispatch(push(path))
});


export default connect(null, mapDispatchToProps)(Menu);
