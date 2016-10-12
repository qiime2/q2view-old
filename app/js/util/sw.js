import extmap from './extmap.js';

import { TimeoutAt } from './promise.js';

let sessions = {};

self.addEventListener('install', (event) => {
    event.waitUntil(self.skipWaiting()); // Activate worker immediately
});

self.addEventListener('activate', (event) => {
    sessions = {};
    event.waitUntil(self.clients.claim()); // Become available to all pages
});

self.addEventListener('message', (event) => {
    switch (event.data.type) {
        case 'NEW_SESSION':
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
    let filename = components.slice(1).join('/');  // everything but session
    let ext = filename.split('.').pop()


    fetchEvent.respondWith(new Promise((resolve, reject) => {
        let channel = new MessageChannel();
        channel.port1.onmessage = (event) => {
            resolve(new Response(event.data, {
                headers: new Headers({ 'Content-Type': extmap[ext]})
            }));
        }

        sessions[session].postMessage({ type: 'GET_FILE_BLOB', filename}, [channel.port2]);
    }))


})

//
// self.addEventListener('fetch', (fetchEvent) => {
//     let url = new URL(fetchEvent.request.url);
//     let filename = url.pathname;
//
//     if (!filename.startsWith('/_/')) {
//         fetchEvent.respondWith(fetch(fetchEvent.request));
//         return
//     }
//
//     let uuid = url.pathname.split('/_/')[1].split('/')[0];
//     let ext = filename.split('.').pop();
//
//     fetchEvent.respondWith(
//         sendMessage(uuidMap[uuid], {
//             type: 'LOAD_FILE',
//             name: filename
//         })
//         .then((data) => {
//             console.log(data);
//             let mimetype = extmap[ext];
//             // if (!mimetype) {
//             //     throw Error('No mapping to MIME-type for extension ' + ext);
//             // }
//             return new Response(data, {
//                 headers: new Headers({ 'Content-Type':  'text/html'})
//             });
//         })
//         // .catch(_ => fetch(fetchEvent.request)) // doomed to fail
//     );
// });
//
// self.addEventListener('message', (messageEvent) => {
//     let message = messageEvent.data;
//     switch (message.type) {
//         case 'REGISTER_ZIP':
//             // TODO handle multiple windows to same artifact better
//             uuidMap[message.uuid] = messageEvent.ports[0];
//             sendMessage(uuidMap[message.uuid], {
//                 type: 'REGISTER_ZIP',
//                 success: true
//             });
//             break;
//         default:
//             console.log("Unkown message type: " + message.type)
//             break;
//     }
// })
