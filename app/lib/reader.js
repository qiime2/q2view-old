import uuid from 'node-uuid';
import _ from 'lodash';
import yaml from 'js-yaml';

import { TimeoutAt, readBlobAsText } from './util';


export default Reader class {
    static createReaderFromFile(file) {
        return new Promise((resolve, reject) => {

        });
    }

    static createReaderFromURL(url) {
        return new Promise((resolve, reject) => {

        });
    }

    constructor(uuid, version, frameworkVersion, zipReader) {
        this.uuid = uuid;
        this.version = version;
        this.frameworkVersion = frameworkVersion;
        this.zipReader = zipReader;

        this.session  = uuid.v4();
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

            channel.port1.onmessage(event) => {
                // super simple "echo" handshake
                if (_.isEqual(event.data, message)) {
                    channel.port1.onmessage = this._handleDataRequest
                    this.port = channel.port1;
                    resolve(this.port);
                } else {
                    reject(`Protocol Error: failure to mirror document session ${event.data}`);
                }
            }

            sw.postMessage(message, [channel.port2]);
        });

        return Promise.race([
            TimeoutAt(3000, "Couldn't connect to service worker."),
            makeConnection()
        ])
    }

    _handleDataRequest(event) {
        switch (event.data.type) {
            case 'GET_BLOB':
                this._getFile(event.data.path).then((blob) => {
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

    }

    _getYAML(relpath) {
        return this._getFile(relpath).then(readBlobAsText).then(yaml.safeLoad);
    }

    getURLOfPath(relpath) {
        return `/_/${this.session}/${this.uuid}/${relpath}`
    }

    getMetadata() {
        return this._getYAML('metadata.yaml');
    }

    getProvenanceTree() {

    }

    getProvenanceAction(uuid) {
        if (this.uuid === uuid) {
            return this._getYAML('provenance/action/action.yaml');
        } else {
            return this._getYAML(`provenance/artifacts/${uuid}/action/action.yaml`);
        }
    }

    getProvenanceNode(uuid) {
        if (this.uuid === uuid) {
            return this._getYAML('provenance/metadata.yaml');
        } else {
            return this._getYAML(`provenance/artifacts/${uuid}/metadata.yaml`);
        }
    }
}
