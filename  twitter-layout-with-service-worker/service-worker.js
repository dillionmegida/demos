const CACHE_NAME = "offline-cache-v2"
const urlsToCache = ["./offline.html", "./style.css"]

// Install the service worker and cache the offline page
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("[Service Worker] Caching offline pages")
      return cache.addAll(urlsToCache)
    })
  )
})

caches.open(CACHE_NAME).then(cache => {
  cache.keys().then(keys => {
    console.log(
      "Cached keys:",
      keys.map(key => key.url)
    )
  })
})

// Intercept fetch requests
self.addEventListener("fetch", event => {
  console.log("[Service Worker] Fetching:", event.request.url);
  event.respondWith(caches.match("./offline.html"));
  // event.respondWith(
  //   fetch(event.request).then((response) => {
  //     console.log("[Service Worker] Fetch successful");
  //     // If fetch is successful, add or update the cache
  //     return response
  //   }).catch(() => {
  //     console.log("[Service Worker] Fetch failed; returning offline page");
  //     // If fetch faoils (e.g., no internet), serve the offline page
  //     return caches.match("./offline.html")
  //   })
  // )
})

// Activate the service worker and clean up old caches
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log(`[Service Worker] Deleting old cache: ${cacheName}`)
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
})
