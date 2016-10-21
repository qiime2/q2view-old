// ----------------------------------------------------------------------------
// Copyright (c) 2016--, QIIME development team.
//
// Distributed under the terms of the Modified BSD License.
//
// The full license is in the file LICENSE, distributed with this software.
// ----------------------------------------------------------------------------
import runtime from 'serviceworker-webpack-plugin/lib/runtime';
import JSZip from 'jszip';
import uuid from 'node-uuid';
import _ from 'lodash';
import { TimeoutAt, WaitUntil } from './util/promise.js';

import '!style-loader!css-loader!bootstrap-css-only'; // eslint-disable-line
import '!style-loader!css-loader!../css/custom.css';
import image from '../img/qiime2-rect-200.png';


const SESSION_UUID = uuid.v4();
let serviceChannel = new Promise((resolve, reject) => {
    let channel = new MessageChannel();

    if ('serviceWorker' in navigator) {
        runtime.register().then(reg => {
            return Promise.race([
                TimeoutAt(3000),
                WaitUntil(() => reg.active !== null)
            ]).then(_ => reg.active);
        }).then(serviceWorker => {
            let timedOut = false;
            let hasResponded = false;
            let message = {
                type: 'NEW_SESSION',
                session: SESSION_UUID
            }

            channel.port1.onmessage = (event) => {
                // cleanup listener
                channel.port1.onmessage = null;
                hasResponded = true;
                if (!timedOut) {
                    if (_.isEqual(event.data, message)) {
                        resolve(channel.port1);
                    } else {
                        reject(`failed to mirror session ${event.data}`);
                    }
                }
            }

            serviceWorker.postMessage(message, [channel.port2]);
            setTimeout(() => {
                if (!hasResponded) {
                    timedOut = true;
                    reject('Session setup timed out.');
                }
            }, 3000)

        });
    } else {
        reject('Unsupported browser');
    }
})

serviceChannel.catch((e) => console.log('serviceChannel err', e));


const logo = document.getElementById('logo');
logo.src = image;

function validateArtifact(file) {
    const zip = new JSZip();
    return zip.loadAsync(file).then((zip) => {
        // Verify layout:
        // 1) Root dir named with UUID, only object in zip root
        // 2) UUID dir has a file named `VERSION`
        // 2) UUID dir has subdir named `data`
        // 3) Data dir has at least one file that matches `index.*`
        const files = Object.keys(zip.files);
        const parsedPaths = [];
        files.forEach((file) => {
            const fileParts = file.split('/');
            for (let i = 1; i <= fileParts.length; i += 1) {
                parsedPaths.push(fileParts.slice(0, i).join("/"));
            }
        });
        const uniquePaths = parsedPaths.filter((value, index, self) => {
            return self.indexOf(value) === index;
        });

        // http://stackoverflow.com/a/13653180
        const uuidRegEx = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        let allInUUID = true;
        uniquePaths.every((path) => {
            const parts = path.split('/');
            if (!uuidRegEx.test(parts[0])) {
                allInUUID = false;
                return false; // break
            }
            return true;
        });

        // If every path has UUID, then proceed
        if (!allInUUID) {
            throw Error('Invalid QZV file');
        }

        const UUID = uniquePaths[0].split('/')[0];

        // Search for VERSION file
        if (uniquePaths.find(path => (path === `${UUID}/VERSION`)) === undefined) {
            throw Error('Invalid QZV file');
        }

         // Search for data dir
        if (uniquePaths.find(path => (path === `${UUID}/data`)) === undefined) {
            throw Error('Invalid QZV file');
        }

        // Search for index
        if (uniquePaths.find(path => (path === `${UUID}/data/index.html`)) === undefined) {
            throw Error('Invalid QZV file');
        }

        return [zip, UUID]
    });
}

function loadFile(file) {
    let zip = validateArtifact(file).then(([zip, UUID]) => {
        let dropzone = document.getElementById('dropzone')
        dropzone.innerHTML = loaderSpan;
        dropzone.onclick = (e) => null;

        return [zip, UUID];
    });
    zip.catch(e => { alert('Invalid QZV file.') });

    Promise.all([zip, serviceChannel]).then(([[zip, UUID], port]) => {
        console.log('zip', zip, 'port', port);
        port.onmessage = (event) => {
            console.log('onmessage event', event.data)
            switch (event.data.type) {
                case 'GET_FILE_BLOB':
                    zip.file(event.data.filename).async("uint8array").then((data) => {
                        event.ports[0].postMessage(data);
                    });
            }
        }
        let index = ['_', SESSION_UUID, UUID, 'data', 'index.html'].join('/');
        document.getElementById('uploader').innerHTML =
            `<iframe src="/${index}" height="100%"></iframe>`;

    })
}

function sendFiles(files) {
   for (let i = 0; i < files.length; i += 1) {
       loadFile(files[i]);
   }
}

const loaderSpan = '<span class="glyphicon glyphicon-refresh spinning"></span>';

window.onload = () => {
    const queryParams = _.chain( location.search.slice(1).split('&') )
        .map(function(item) { if (item) return item.split('='); })
        .compact().fromPairs().value();

    if ('f' in queryParams) {
        let dropzone = document.getElementById('dropzone')
        dropzone.innerHTML = loaderSpan;
        dropzone.onclick = (e) => null;

        fetch(queryParams.f)
            .then(function(response) {
                return response.blob();
            })
            .then(function(artifact) {
                sendFiles([artifact]);
            });
    }

    const dropzone = document.getElementById('dropzone');
    const picker = document.getElementById('picker');

    dropzone.ondragover = dropzone.ondragenter = (event) => {
        event.stopPropagation();
        event.preventDefault();
    }

    dropzone.ondrop = (event) => {
        event.stopPropagation();
        event.preventDefault();
        sendFiles(event.dataTransfer.files);
    }

    dropzone.onclick = (event) => {
        event.stopPropagation();
        event.preventDefault();
        picker.click();
    }

    picker.onchange = () => sendFiles(picker.files);
}
