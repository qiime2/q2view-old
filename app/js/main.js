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
import '!style-loader!css-loader!../css/custom.css';
import image from '../img/qiime_logo_large.png';

if ('serviceWorker' in navigator) {
    runtime.register();
} else {
    alert('This browser does not support this website.');
}

const logo = document.getElementById('logo');
logo.src = image;

function validateArtifact(file) {
    const zip = new JSZip();
    return zip.loadAsync(file).then((zip) => {
        console.log(zip);
        // Verify layout:
        // 1) Root dir named with UUID, only object in zip root
        // 2) Root dir has subdir named `data`
        // 3) Data dir has at least one file that matches `index.*`

        // http://stackoverflow.com/a/13653180
        const uuidRegEx = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        zip.forEach((relPath, file) => {
            console.log(relPath, file);
            const pathParts = file.name.split('/'); // ZIP uses '/' on all platforms
            if (!uuidRegEx.test(pathParts[0])) { return; };
        });
    });
}

function sendFile(file) {
    const uri = 'CHANGEME'; // TODO: fix this
    const xhr = new XMLHttpRequest();
    const fd = new FormData();

    xhr.open('POST', uri, true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            // TODO: handle response here
            alert(xhr.responseText);
        }
    };
    validateArtifact(file);
    fd.append('vizFile', file);
    xhr.send(fd);
}

window.onload = () => {
    const dropzone = document.getElementById('dropzone');

    dropzone.ondragover = dropzone.ondragenter = (event) => {
        event.stopPropagation();
        event.preventDefault();
    }

    dropzone.ondrop = (event) => {
        event.stopPropagation();
        event.preventDefault();

        var filesArray = event.dataTransfer.files;
        for (var i=0; i<filesArray.length; i++) {
            sendFile(filesArray[i]);
        }
    }
}
