// ----------------------------------------------------------------------------
// Copyright (c) 2016-2017, QIIME 2 development team.
//
// Distributed under the terms of the Modified BSD License.
//
// The full license is in the file LICENSE, distributed with this software.
// ----------------------------------------------------------------------------

let sessions = {};

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
            break
    }
})

self.addEventListener('fetch', (fetchEvent) => {
    let url = new URL(fetchEvent.request.url);
    if (!url.pathname.startsWith('/_/')) {
        fetchEvent.respondWith(fetch(fetchEvent.request));
        return // end of fetch
    }

    let components = url.pathname.split('/').slice(2);  // discard '' and '_'
    let session = components[0];
    let filename = components.slice(2).join('/');  // everything but session/uuid

    fetchEvent.respondWith(new Promise((resolve, reject) => {
        let channel = new MessageChannel();
        channel.port1.onmessage = (event) => {
            resolve(new Response(event.data));
        }

        sessions[session].postMessage({ type: 'GET_BLOB', filename }, [channel.port2]);
    }))


});
