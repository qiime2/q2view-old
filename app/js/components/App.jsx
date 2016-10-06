// ----------------------------------------------------------------------------
// Copyright (c) 2016--, QIIME development team.
//
// Distributed under the terms of the Modified BSD License.
//
// The full license is in the file LICENSE, distributed with this software.
// ----------------------------------------------------------------------------

import React from 'react';

import JSZip from 'jszip';

import Header from './Header';
import Input from './Input';

const App = () => (
    <div className="container-fluid">
        <div className="col-md-10 col-md-offset-1">
        <Header />
        <form action="#">
            <input type="file" accept=".qzv" onChange={(e) => {
                const zip = new JSZip();
                zip.loadAsync(e.target.files[0])
                .then((data) => {
                    let dataObjects =  Object.keys(data.files).filter((key) => key.split('/')[1] === 'data').map((key) => data.files[key]);
                    dataObjects = dataObjects.map(dataObject =>  {
                        dataObject.name = `./${dataObject.name.split('/').slice(2).join('/')}`;
                        if (dataObject.name.endsWith('index.html')) {
                            dataObject.name = './visualization.html';
                        }
                        return dataObject;
                    });
                    new Promise(function(resolve, reject) {
                        var messageChannel = new MessageChannel();
                        messageChannel.port1.onmessage = function(event) {
                            if (event.data.error) {
                                reject(event.data.error);
                            } else {
                                resolve(event.data);
                            }
                        };
                        dataObjects.forEach(dataObject => {
                            dataObject.async('uint8array').then(data => {
                                const dict = {}
                                dict[dataObject.name] = data
                                navigator.serviceWorker.controller.postMessage(dict);
                            });
                        });
                    });
                })
                .then(() => {
                    setTimeout(() => window.location.href = `${window.location.origin}/visualization.html`, 2000);
                });
            }}/>
        </form>
        </div>
    </div>
);

export default App;
