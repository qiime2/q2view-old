// ----------------------------------------------------------------------------
// Copyright (c) 2016-2017, QIIME 2 development team.
//
// Distributed under the terms of the Modified BSD License.
//
// The full license is in the file LICENSE, distributed with this software.
// ----------------------------------------------------------------------------

const sessions = {};

self.addEventListener('install', (event) => {
    event.waitUntil(self.skipWaiting()); // Activate worker immediately
});

self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim()); // Become available to all pages
});

self.addEventListener('message', (event) => {
    switch (event.data.type) {
    case 'NEW_DOCUMENT':
        sessions[event.data.session] = event.ports[0];
        event.ports[0].postMessage(event.data);
        break;
    default:
        return;
    }
});

self.addEventListener('fetch', (fetchEvent) => {
    const url = new URL(fetchEvent.request.url);
    if (!url.pathname.startsWith('/_/')) {
        fetchEvent.respondWith(fetch(fetchEvent.request));
        return; // end of fetch
    }

    const components = url.pathname.split('/').slice(2);  // discard '' and '_'
    const session = components[0];
    const filename = components.slice(2).join('/');  // everything but session/uuid

    fetchEvent.respondWith(new Promise((resolve, reject) => { // eslint-disable-line no-unused-vars
        const channel = new MessageChannel();
        channel.port1.onmessage = (event) => {
            resolve(new Response(event.data));
        };

        sessions[session].postMessage({ type: 'GET_BLOB', filename }, [channel.port2]);
    }));
});
