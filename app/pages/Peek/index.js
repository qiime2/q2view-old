import { connect } from 'react-redux';

import component from './component';

import dx, { getMetadata } from './dux';
import { getCitations } from '../../init/dux';

export { dx as peekDux };

const mapStateToProps = state => ({
    metadata: getMetadata(state),
    citations: getCitations(state)
});

export default connect(mapStateToProps)(component);
