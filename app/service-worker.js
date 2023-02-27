// ----------------------------------------------------------------------------
// Copyright (c) 2016-2023, QIIME 2 development team.
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
        return; // end of fetch
    }

    if (url.pathname.toString() === '/_/wakeup') {
        fetchEvent.respondWith(Promise.resolve(new Response('OK')));
        return; // end of fetch
    }

    const components = url.pathname.split('/').slice(2); // discard '' and '_'
    const session = components[0];
    const uuid = components[1];
    const filename = components.slice(2).join('/'); // everything but session/uuid

    fetchEvent.respondWith(new Promise((resolve, reject) => { // eslint-disable-line no-unused-vars
        self.clients.matchAll().then(clients => clients.forEach((client) => {
            const channel = new MessageChannel();
            channel.port1.onmessage = (event) => {
                const blob = new Blob([event.data.byteArray], { type: event.data.type });
                const init = {};
                if (!event.data.type) {
                    // unknown extension, so invoke download dialog
                    init.headers = { 'Content-Disposition': 'attachment' };
                }
                resolve(new Response(blob, init));
            };

            client.postMessage({ type: 'GET_DATA', session, uuid, filename },
                [channel.port2]);
        }));
    }));
});
