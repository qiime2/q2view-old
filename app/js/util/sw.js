let dataStore = {};

self.addEventListener('install', function(event) {
    console.log('Installed!');
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});

self.addEventListener('message', (event) => {
    event.waitUntil(
        caches.open('v1').then((cache) => {
            const url = Object.keys(event.data)[0];
            cache.put(url, new Response(event.data[url]));
        })
    );
});
