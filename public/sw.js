// SW Version
const version = 'a_1.1';
// Static Cache 
const appAssets = [
    'index.html',
    'favicon.png',
    'global.css',
    './build/bundle.css',
    './build/bundle.js',
    "./img/bg-day.jpg"
]
// SW Install
self.addEventListener('install', e => {
    console.log('SW:: installed')
    e.waitUntil(
        caches.open(`static-${version}`).then(cache => cache.addAll(appAssets))
    )
})
// SW Activate
self.addEventListener('activate', e => {
    console.log('SW::activeted')
    // Clean static cache
    let cleaned = caches.keys().then(keys => {
        keys.forEach(key => {
            console.log('SW::activeted', key)
            if (key !== `static-${version}`) {
                // Clean static cache
                return caches.delete(key);
            }
        });
    })
    e.waitUntil(cleaned);
})

//static caches strategies-caches with network fallback
const staticCache = (req, cacheName = `static-${version}`) => {
    return caches.match(req).then(cachedRes => {
        //return cached response if found
        if (cachedRes) return cachedRes;
        //fall back to newtwork
        return fetch(req).then(networkRes => {
            //update caches with new response
            caches.open(cacheName).then(cache => cache.put(req, networkRes));
            // Return Clone of Network Response
            return networkRes.clone();
        })
    })
}
// Network with Cache Fallback
const fallbackCache = (req) => {
    // Try Network
    return fetch(req).then(networkRes => {
        // Check res is OK, else go to cache
        // if (!networkRes.ok) throw 'Fetch Error';
        // Update cache
        caches.open(`static-${version}`)
            .then(cache => cache.put(req, networkRes));
        // Return Clone of Network Response
        return networkRes.clone();
    })
        // Try cache
        .catch(err => caches.match(req));
};

// SW Fetch
self.addEventListener('fetch', e => {
    if (!(e.request.url.indexOf('http') === 0)) {
        return;
    }
    if (e.request.url.match(location.origin)) {
        e.respondWith(staticCache(e.request));
    }
    else if (e.request.url.match('staging.followmedia.tk/client/app/get-data/')) {
        e.respondWith(fallbackCache(e.request));
    }
});
