import { connect } from 'react-redux';

import component from './component';
import { getReader } from '../../dux';

const mapStateToProps = (state) => {
    reader: getReader(state);
}

export default connect(mapStateToProps)(component);
