import _ from 'lodash';
import yaml from 'js-yaml';
import JSZip from 'jszip';

import { TimeoutAt, readBlobAsText } from './util';
import extmap from './extmap';
import schema from './yamlSchema'


export default class Reader {
    static createReaderFromFile(file) {
        const jsZip = new JSZip();
        return jsZip.loadAsync(file).then((zip) => {
            const error = new Error('Invalid  file');
            // Verify layout:
            // 1) Root dir named with UUID, only object in zip root
            // 2) UUID dir has a file named `VERSION`
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
                throw error;
            }

            const UUID = uniquePaths[0].split('/')[0];

            // Search for VERSION file
            if (uniquePaths.find(path => (path === `${UUID}/VERSION`)) === undefined) {
                throw error;
            }

            return new Reader(UUID, null, null, zip)
        });
    }

    static createReaderFromURL(url) {
        // TODO, be smurter and make this someday
        return new Promise((resolve, reject) => {

        });
    }

    constructor(uuid, version, frameworkVersion, zipReader) {
        this.uuid = uuid;
        this.version = version;
        this.frameworkVersion = frameworkVersion;
        this.zipReader = zipReader;
        this.session  = Math.random().toString(36).substr(2);
        this.port = null;
    }

    attachToServiceWorker(sw) {
        const makeConnection = () => new Promise((resolve, reject) => {
            if (this.port !== null) {
                reject('Duplicate attachment error');
            }

            let channel = new MessageChannel();
            let message = {
                type: 'NEW_DOCUMENT',
                session: this.session
            }

            channel.port1.onmessage = (event) => {
                // super simple "echo" handshake
                if (_.isEqual(event.data, message)) {
                    channel.port1.onmessage = this._handleDataRequest.bind(this);
                    this.port = channel.port1;
                    resolve(this.port);
                } else {
                    reject(`Protocol Error: failure to mirror document session ${event.data}`);
                }
            }

            sw.postMessage(message, [channel.port2]);
            // HACK!! keep-alive heartbeat, number is arbitrary and only "works"
            // if browsers keep the service worker alive for 250 ms between
            // requests, which works *today*.
            window.setInterval(() => {
                sw.postMessage({'type': 'GARBAGE'}); // ignored in SW
            }, 250);
        });

        return Promise.race([
            TimeoutAt(3000, "Couldn't connect to service worker."),
            makeConnection()
        ])
    }

    _handleDataRequest(event) {
        switch (event.data.type) {
            case 'GET_BLOB':
                this._getFile(event.data.filename).then((blob) => {
                    // the request should provide a port for later response
                    event.ports[0].postMessage(blob);
                }).catch(error => console.error(error));
                break;
            default:
                console.log(`Unknown SW event type: ${event.data.type}`);
                break;
        }
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
            new Blob([byteArray], { type: extmap[ext] || ''})
        ));
    }

    _getYAML(relpath) {
        return this._getFile(relpath).then(readBlobAsText)
                   .then(text => yaml.safeLoad(text, { schema }));
    }

    getURLOfPath(relpath) {
        return `/_/${this.session}/${this.uuid}/${relpath}`
    }

    getMetadata() {
        return this._getYAML('metadata.yaml');
    }

    _artifactMap(uuid) {
        return new Promise((resolve, reject) => {
            this.getProvenanceAction(uuid).then(action => {
                const artifactsToAction = {};
                artifactsToAction[uuid] = action.execution.uuid;
                if (action.action.type === 'method' || action.action.type === 'visualizer') {
                    let promises = [];
                    for (let inputMap of action.action.inputs) {
                        const inputUUID = Object.values(inputMap)[0];
                        artifactsToAction[inputUUID] = action.execution.uuid;
                        promises.push(this._artifactMap(inputUUID));
                    }
                    Promise.all(promises).then(aList => (
                        Object.assign(artifactsToAction, ...aList)
                    )).then(resolve);
                } else {
                    resolve(artifactsToAction);
                }
            }).catch(() => resolve({ [uuid]: null }));
        })
    }

    _inputMap(uuid) {
        return new Promise((resolve, reject) => {
            this.getProvenanceAction(uuid).then(action => {
                const inputs = {};
                if (action.action.type === 'method' || action.action.type === 'visualizer') {
                    inputs[action.execution.uuid] = new Set();
                    let promises = [];
                    for (let inputMap of action.action.inputs) {
                        const inputUUID = Object.values(inputMap)[0];
                        inputs[action.execution.uuid].add(inputMap);
                        promises.push(this._inputMap(inputUUID));
                    }
                    Promise.all(promises).then(iList => (
                        Object.assign(inputs, ...iList)
                    )).then(resolve);
                } else {
                    resolve(inputs);
                }
            }).catch(() => resolve({}));
        })
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
        } else {
            return this._getYAML(`provenance/artifacts/${uuid}/action/action.yaml`);
        }
    }

    getProvenanceArtifact(uuid) {
        if (this.uuid === uuid) {
            return this._getYAML('provenance/metadata.yaml');
        } else {
            return this._getYAML(`provenance/artifacts/${uuid}/metadata.yaml`);
        }
    }
}
