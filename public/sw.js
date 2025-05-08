// This is the service worker for the Taraweeh App PWA

const CACHE_NAME = 'taraweeh-app-v1';
const BASE_PATH = '/taraweeh-app'; // GitHub Pages repository name
const urlsToCache = [
    `${BASE_PATH}/`,
    `${BASE_PATH}/manifest.json`,
    `${BASE_PATH}/icon-192x192.png`,
    `${BASE_PATH}/icon-512x512.png`,
    `${BASE_PATH}/favicon.ico`
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', event => {
    // Check if the request URL starts with the BASE_PATH
    const url = new URL(event.request.url);

    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Cache hit - return response
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
            .catch(() => {
                // If both cache and network fail, serve offline page
                if (event.request.mode === 'navigate') {
                    return caches.match(`${BASE_PATH}/`);
                }
            })
    );
});

self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
}); 