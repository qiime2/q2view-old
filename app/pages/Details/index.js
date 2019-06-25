import { connect } from 'react-redux';

import component from './component';

import dx, { getMetadata } from './dux';
import { getCitations } from '../../init/dux';

export { dx as detailsDux };

const mapStateToProps = state => ({
    metadata: getMetadata(state),
    citations: getCitations(state)
});

export default connect(mapStateToProps)(component);
