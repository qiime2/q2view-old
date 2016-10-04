// ----------------------------------------------------------------------------
// Copyright (c) 2016--, QIIME development team.
//
// Distributed under the terms of the Modified BSD License.
//
// The full license is in the file LICENSE, distributed with this software.
// ----------------------------------------------------------------------------

import React from 'react';

import image from '../../img/qiime_logo_large.png';

const Header = () => (
    <div className="page-header">
        <img className="img-responsive" alt="QIIME Logo" src={image} />
    </div>
);

export default Header;
