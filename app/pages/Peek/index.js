import { connect } from 'react-redux';

import component from './component';

import dx from './dux';

export { dx as peekDux };

export default connect()(component);
