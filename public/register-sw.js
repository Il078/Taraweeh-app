// Register service worker for PWA functionality
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        const basePath = '/taraweeh-app'; // GitHub Pages repository name
        navigator.serviceWorker.register(`${basePath}/sw.js`)
            .then(registration => {
                console.log('Service Worker registered with scope:', registration.scope);
            })
            .catch(error => {
                console.error('Service Worker registration failed:', error);
            });
    });
} 