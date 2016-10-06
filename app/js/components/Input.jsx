// ----------------------------------------------------------------------------
// Copyright (c) 2016--, QIIME development team.
//
// Distributed under the terms of the Modified BSD License.
//
// The full license is in the file LICENSE, distributed with this software.
// ----------------------------------------------------------------------------

import React from 'react';

import style from '../../css/Input.css';

class Input extends React.Component {

    onSubmitHandler(e) {
        
    }

    render() {
        return (
            <div className={style.input}>
                <form onSubmit={onSubmitHandler}>
                    <div className="input-group">
                        <span className="input-group-btn">
                            <button
                                type="button"
                                className="btn btn-primary pull-left"
                                onClick={() => {}}
                            >
                                <span
                                    className="glyphicon glyphicon-import"
                                />
                                <span> Import</span>
                            </button>
                        </span>
                        <input
                            readOnly
                            name="type"
                            className="form-control"
                            type="text"
                            placeholder="QIIME 2 Visualization File"
                        />
                        <span className="input-group-btn">
                            <button type="submit" className="btn btn-success">
                                View!
                            </button>
                        </span>
                    </div>
                </form>
            </div>
        );
    }
}

export default Input;
