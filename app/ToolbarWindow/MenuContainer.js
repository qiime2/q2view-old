import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { getMetadata } from '../pages/Peek/dux';
import { hasProvenance } from '../pages/Provenance/dux';

import Menu from './Menu';

const mapStateToProps = (state) => {
    const metadata = getMetadata(state);

    return {
        hasVisualization: metadata && metadata.type === 'Visualization',
        hasMetadata: !!metadata,
        hasProvenance: hasProvenance(state),
    };
}

const mapDispatchToProps = (dispatch) => ({
    push: (path) => dispatch(push(path))
});


export default connect(mapStateToProps, mapDispatchToProps)(Menu);
