import { connect } from 'react-redux';

import component from './component';
import { getReader } from '../../init/dux';

const mapStateToProps = state => ({
    iframeURL: getReader(state).getURLOfPath('data/index.html')
});

export default connect(mapStateToProps)(component);
