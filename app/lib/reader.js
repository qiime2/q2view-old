import yaml from 'js-yaml';
import JSZip from 'jszip';

import { readBlobAsText } from './util';
import extmap from './extmap';
import schema from './yamlSchema';


export default class Reader {
    static createReaderFromFile(file) {
        const jsZip = new JSZip();
        return jsZip.loadAsync(file).then((zip) => {
            const error = new Error('Not a valid QIIME 2 archive.');
            // Verify layout:
            // 1) Root dir named with UUID, only object in zip root
            // 2) UUID dir has a file named `VERSION`
            const files = Object.keys(zip.files);
            const parsedPaths = [];
            files.forEach((f) => {
                const fileParts = f.split('/');
                for (let i = 1; i <= fileParts.length; i += 1) {
                    parsedPaths.push(fileParts.slice(0, i).join('/'));
                }
            });
            const uniquePaths = parsedPaths.filter((value, index, self) =>
              self.indexOf(value) === index
            );

            // http://stackoverflow.com/a/13653180
            const uuidRegEx = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;  // eslint-disable-line max-len
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
                throw error;
            }

            const UUID = uniquePaths[0].split('/')[0];

            // Search for VERSION file
            if (uniquePaths.find(path => (path === `${UUID}/VERSION`)) === undefined) {
                throw error;
            }

            return new Reader(UUID, null, null, zip);
        });
    }

    static createReaderFromURL(url) {  // eslint-disable-line no-unused-vars
        // TODO, be smurter and make this someday
        return new Promise((resolve, reject) => {  // eslint-disable-line no-unused-vars

        });
    }

    constructor(uuid, version, frameworkVersion, zipReader) {
        this.uuid = uuid;
        this.version = version;
        this.frameworkVersion = frameworkVersion;
        this.zipReader = zipReader;
        this.session = Math.random().toString(36).substr(2);
        this.port = null;
    }

    attachToServiceWorker() {
        window.navigator.serviceWorker.onmessage = (event) => {
            if (event.data.session !== this.session) {
                return; // This message is meant for another tab.
            }
            switch (event.data.type) {
            case 'GET_BLOB':
                this._getFile(event.data.filename).then((blob) => {
                    // the request should provide a port for later response
                    event.ports[0].postMessage(blob);
                }).catch(error => console.error(error));  // eslint-disable-line no-console
                break;
            default:
                console.log(`Unknown SW event type: ${event.data.type}`);  // eslint-disable-line no-console
                break;
            }
        };
    }

    _getFile(relpath) {
        const ext = relpath.split('.').pop();
        const filehandle = this.zipReader.file(`${this.uuid}/${relpath}`);
        let filepromise = null;
        if (filehandle === null) {
            filepromise = () => Promise.reject('No such file.');
        } else {
            filepromise = () => filehandle.async('uint8array');
        }
        return filepromise().then(byteArray => (
            new Blob([byteArray], { type: extmap[ext] || '' })
        ));
    }

    _getYAML(relpath) {
        return this._getFile(relpath).then(readBlobAsText)
                   .then(text => yaml.safeLoad(text, { schema }));
    }

    getURLOfPath(relpath) {
        return `/_/${this.session}/${this.uuid}/${relpath}`;
    }

    getMetadata() {
        return this._getYAML('metadata.yaml');
    }

    _artifactMap(uuid) {
        return new Promise((resolve, reject) => {  // eslint-disable-line no-unused-vars
            this.getProvenanceAction(uuid).then((action) => {
                const artifactsToAction = {};
                artifactsToAction[uuid] = action.execution.uuid;
                if (action.action.type === 'method' || action.action.type === 'visualizer') {
                    const promises = [];
                    for (const inputMap of action.action.inputs) {
                        const inputUUID = Object.values(inputMap)[0];
                        if (inputUUID !== null) {
                            promises.push(this._artifactMap(inputUUID));
                        } // else  optional artifact
                    }
                    for (const paramMap of action.action.parameters) {
                        const param = Object.values(paramMap)[0];
                        if (param !== null && typeof param === 'object'
                                && Object.prototype.hasOwnProperty.call(param, 'artifacts')) {
                            for (const artifactUUID of param.artifacts) {
                                promises.push(this._artifactMap(artifactUUID));
                            }
                        }
                    }
                    Promise.all(promises).then(aList => (
                        Object.assign(artifactsToAction, ...aList)
                    )).then(resolve);
                } else {
                    resolve(artifactsToAction);
                }
            }).catch(() => resolve({ [uuid]: null }));
        });
    }

    _inputMap(uuid) {
        return new Promise((resolve, reject) => {  // eslint-disable-line no-unused-vars
            this.getProvenanceAction(uuid).then((action) => {
                const inputs = {};
                if (action.action.type === 'method' || action.action.type === 'visualizer') {
                    inputs[action.execution.uuid] = new Set();
                    const promises = [];
                    for (const inputMap of action.action.inputs) {
                        const inputUUID = Object.values(inputMap)[0];
                        if (inputUUID !== null) {
                            inputs[action.execution.uuid].add(inputMap);
                            promises.push(this._inputMap(inputUUID));
                        } // else optional artifact
                    }
                    for (const paramMap of action.action.parameters) {
                        const paramName = Object.keys(paramMap)[0];
                        const param = Object.values(paramMap)[0];
                        if (param !== null && typeof param === 'object'
                                && Object.prototype.hasOwnProperty.call(param, 'artifacts')) {
                            for (const artifactUUID of param.artifacts) {
                                inputs[action.execution.uuid].add({ [paramName]: artifactUUID });
                                promises.push(this._inputMap(artifactUUID));
                            }
                        }
                    }
                    Promise.all(promises).then(iList => (
                        Object.assign(inputs, ...iList)
                    )).then(resolve);
                } else {
                    resolve(inputs);
                }
            }).catch(() => resolve({}));
        });
    }

    getProvenanceTree() {
        return Promise.all([
            this._artifactMap(this.uuid),
            this._inputMap(this.uuid)
        ]);
    }

    getProvenanceAction(uuid) {
        if (this.uuid === uuid) {
            return this._getYAML('provenance/action/action.yaml');
        }
        return this._getYAML(`provenance/artifacts/${uuid}/action/action.yaml`);
    }

    getProvenanceArtifact(uuid) {
        if (this.uuid === uuid) {
            return this._getYAML('provenance/metadata.yaml');
        }
        return this._getYAML(`provenance/artifacts/${uuid}/metadata.yaml`);
    }
}
