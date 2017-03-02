import React from 'react';

import FailureCard from './cards/Failure';
import StatusCard from './cards/Status';

export default (props) => {
    if (!props.active && props.success) {
        return props.children;
    }

    if (!props.active && !props.success) {
        return (<FailureCard reason={props.reason} title={props.title} />);
    }

    return (<StatusCard message={props.message} progress={props.progress} />);
};
