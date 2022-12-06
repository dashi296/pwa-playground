const CACHE_NAME = 'v1'

self.addEventListener("install", (event) => {
  console.log("ServiceWorker is installing: ", event);

  event.waitUntil(async function () {
    // キャッシュ
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll([
      '/',
      '/index.html',
      '/assets/css/style.css',
      '/assets/js/script.js',
    ]);
  }());

  event.waitUntil(
    new Promise((resolve, reject) => {
      try {
        console.log("ServiceWorker is installed")
        resolve();
      } catch (err) {
        reject(err);
      }
    })
  )
});

self.addEventListener("activate", (event) => {
  console.log("ServiceWorker is activating: ", event);
  event.waitUntil(
    new Promise((resolve, reject) => {
      try {
        console.log("ServiceWorker is activated: ")
        resolve();
      } catch (err) {
        reject(err);
      }
    })
  )
});

self.addEventListener("fetch", (event) => {
  console.log("ServiceWorker is fetching: ", event);

  event.waitUntil(
    new Promise((resolve, reject) => {
      try {
        console.log("ServiceWorker is fetched: ", event.request.url)
        resolve();
      } catch (err) {
        reject(err);
      }
    })
  )

  event.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(event.request).then((response) => {
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});

self.addEventListener("sync", (event) => {
  console.log("Service Worker is sync: ", event);
});


/*
// Workboxライブラリのインポート
importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js"
);
// ファイルのキャッシュ
workbox.precaching.precacheAndRoute([
  {
    url: "/index.html",
    revision: "123",
  },
  {
    url: "/assets/css/style.css",
    revision: "123",
  },
  {
    url: "/assets/js/script.js",
    revision: "123",
  },
]);*/