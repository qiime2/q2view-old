import { connect } from 'react-redux';

import dx, { mapStateToProps } from './dux';
import Loader from './Loader';

export { dx as loaderDux };

export default connect(mapStateToProps)(Loader);
