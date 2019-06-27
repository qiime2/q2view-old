import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { getMetadata } from '../pages/Details/dux';
import { hasProvenance } from '../pages/Provenance/dux';
import { getFileName, getDownload } from '../init/dux';

import Menu from './Menu';

const mapStateToProps = (state) => {
    const metadata = getMetadata(state);

    return {
        hasVisualization: metadata && metadata.type === 'Visualization',
        hasMetadata: !!metadata,
        hasProvenance: hasProvenance(state),
        downloadURL: getDownload(state),
        fileName: getFileName(state)
    };
};

const mapDispatchToProps = dispatch => ({
    push: path => dispatch(push(path))
});


export default connect(mapStateToProps, mapDispatchToProps)(Menu);
