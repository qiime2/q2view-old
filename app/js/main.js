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

        console.log(uniquePaths);

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
            return undefined;
        }

        const UUID = uniquePaths[0].split('/')[0];

        // Search for VERSION file
        if (uniquePaths.find(path => (path === `${UUID}/VERSION`)) === undefined) {
            return undefined;
        }

         // Search for data dir
        if (uniquePaths.find(path => (path === `${UUID}/data`)) === undefined) {
            return undefined;
        }

        // Search for index
        if (uniquePaths.find(path => (path === `${UUID}/data/index.html`)) === undefined) {
            return undefined;
        }

        return zip
    });
}

function loadFile(file) {
    validateArtifact(file).then((zip) => {
        console.log(zip);
        if (zip === undefined) {
            alert('Invalid QZV file');
        }
    });

    // TODO: do something
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
            loadFile(filesArray[i]);
        }
    }
}
