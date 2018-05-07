import { connect } from 'react-redux';

import DAGView from './dag';
import { getElements, getHeight, setSelection, clearSelection } from './dux';

const mapStateToProps = state => ({
    elements: getElements(state),
    height: getHeight(state)
});

const mapDispatchToProps = dispatch => ({
    setSelection: selection => dispatch(setSelection(selection)),
    clearSelection: () => dispatch(clearSelection())
});

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(DAGView);
