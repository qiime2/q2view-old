import { connect } from 'react-redux';

import { getSelection } from './dux';

import SelectionView from './selection';

const mapStateToProps = state => ({
    selection: getSelection(state)
});

export default connect(mapStateToProps)(SelectionView);
