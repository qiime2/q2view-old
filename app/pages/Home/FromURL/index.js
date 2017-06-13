import { connect } from 'react-redux';

import component from './component';
import dx, { getActiveView, setActiveView } from './dux';

export { dx as fromURLDux };

const mapStateToProps = state => ({
    view: getActiveView(state)
});

const mapDispatchToProps = dispatch => ({
    dispatchDefault: () => dispatch(setActiveView('DEFAULT')),
    dispatchViewDropbox: () => dispatch(setActiveView('DROPBOX')),
    dispatchViewExternalURL: () => dispatch(setActiveView('EXTERNAL'))
});

export default connect(mapStateToProps, mapDispatchToProps)(component);
