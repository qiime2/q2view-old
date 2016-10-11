// ----------------------------------------------------------------------------
// Copyright (c) 2016--, QIIME development team.
//
// Distributed under the terms of the Modified BSD License.
//
// The full license is in the file LICENSE, distributed with this software.
// ----------------------------------------------------------------------------

import runtime from 'serviceworker-webpack-plugin/lib/runtime';
import JSZip from 'jszip';

import '!style-loader!css-loader!bootstrap-css-only'; // eslint-disable-line
import image from '../img/qiime_logo_large.png';

if ('serviceWorker' in navigator) {
    runtime.register();
} else {
    alert('This browser does not support this website.');
}

const logo = document.getElementById('logo');
logo.src = image;

function processOld(data) {
    let dataObjects = Object.keys(data.files)
        .filter(key => key.split('/')[1] === 'data')
        .map(key => data.files[key]);
    dataObjects = dataObjects.map((dataObject) => {
        const obj = dataObject;
        obj.name = `./${obj.name.split('/').slice(2).join('/')}`;
        if (obj.name.endsWith('index.html')) {
            obj.name = './visualization.html';
        }
        return obj;
    });
    new Promise((resolve, reject) => {
        const messageChannel = new MessageChannel();
        messageChannel.port1.onmessage = (event) => {
            if (event.data.error) {
                reject(event.data.error);
            } else {
                resolve(event.data);
            }
        };
        dataObjects.forEach((dataObject) => {
            dataObject.async('uint8array').then((arr) => {
                const dict = {};
                dict[dataObject.name] = arr;
                navigator.serviceWorker.controller.postMessage(dict);
            });
        });
    });
}

const fileinput = document.getElementById('fileinput');
fileinput.addEventListener('change', (e) => {
    const zip = new JSZip();
    zip.loadAsync(e.target.files[0])

    .then(processOld).then(() => {
        setTimeout(() => { window.location.href = `${window.location.origin}/visualization.html`; }, 2000);
    });
});
