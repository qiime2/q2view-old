import { connect } from 'react-redux';

import component from './component';

import dx, { getMetadata } from './dux';

export { dx as peekDux };

const mapStateToProps = state => ({
    metadata: getMetadata(state)
});

export default connect(mapStateToProps)(component);
