self.addEventListener('install', function (event){
    console.log('SW installed');
    event.waitUntil(
        caches.open('static')
            .then(function (cache) {
                cache.addAll([
                    '/',
                    '/index.html',
                    '/icons/logo-93x93.png',
                    '/icons/logo-144x144.png',
                    '/icons/logo-256x256.png',
                    '/icons/logo-512x512.png'
                ]);
            })
    );

});

self.addEventListener('activate', function (){
    console.log('SW activated');
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function (res) {
            if (res) {
                return res;
            } else {
                return fetch(event.request);
            }
        })
    );
});

