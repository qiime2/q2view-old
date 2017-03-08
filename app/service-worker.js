// ----------------------------------------------------------------------------
// Copyright (c) 2016-2017, QIIME 2 development team.
//
// Distributed under the terms of the Modified BSD License.
//
// The full license is in the file LICENSE, distributed with this software.
// ----------------------------------------------------------------------------

self.addEventListener('install', (event) => {
    event.waitUntil(self.skipWaiting()); // Activate worker immediately
});

self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim()); // Become available to all pages
});

self.addEventListener('fetch', (fetchEvent) => {
    const url = new URL(fetchEvent.request.url);
    if (!url.pathname.startsWith('/_/')) {
        fetchEvent.respondWith(fetch(fetchEvent.request));
        return; // end of fetch
    }

    const components = url.pathname.split('/').slice(2);  // discard '' and '_'
    const session = components[0];
    const uuid = components[1];
    const filename = components.slice(2).join('/');  // everything but session/uuid

    fetchEvent.respondWith(new Promise((resolve, reject) => { // eslint-disable-line no-unused-vars
        self.clients.matchAll().then(clients => clients.forEach((client) => {
            const channel = new MessageChannel();
            channel.port1.onmessage = event => resolve(new Response(event.data));

            client.postMessage({ type: 'GET_BLOB', session, uuid, filename },
                               [channel.port2]);
        }));
    }));
});
