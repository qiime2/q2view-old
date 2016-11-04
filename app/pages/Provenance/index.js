import React from 'react';
import { connect } from 'react-redux';

import dx, { getViewTitle } from './dux';
import component from './component';

export { dx as provenanceDux };

const mapStateToProps = (state) => ({
    viewTitle: getViewTitle(state)
})

export default connect(mapStateToProps)(component);
