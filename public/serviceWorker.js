/* eslint-disable no-restricted-globals */

const CACHE_NAME = 'iching-react-cache-v2'
const BASE_PATH = '/iching-react'
const NETWORK_TIMEOUT_MS = 3000

function isStaticAsset(url) {
  return url.pathname.startsWith(BASE_PATH + '/static/')
}

function isNavigationOrManifest(url) {
  return (
    url.pathname === BASE_PATH + '/' ||
    url.pathname === BASE_PATH + '/index.html' ||
    url.pathname === BASE_PATH + '/asset-manifest.json'
  )
}

function fetchWithTimeout(request, ms) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('Network timeout')), ms)
    fetch(request)
      .then(response => {
        clearTimeout(timer)
        resolve(response)
      })
      .catch(err => {
        clearTimeout(timer)
        reject(err)
      })
  })
}

self.addEventListener('install', event => {
  event.waitUntil(
    fetch(BASE_PATH + '/asset-manifest.json')
      .then(response => response.json())
      .then(assets => {
        const urlsToCache = Object.values(assets.files).filter(url => !url.endsWith('.map'))
        urlsToCache.push(BASE_PATH + '/')
        return caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
      })
      .catch(console.error)
      .finally(() => self.skipWaiting())
  )
})

self.addEventListener('activate', event => {
  event.waitUntil(
    caches
      .keys()
      .then(cacheNames =>
        Promise.all(cacheNames.map(name => (name !== CACHE_NAME ? caches.delete(name) : null)))
      )
      .then(() => self.clients.claim())
  )
})

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return
  const url = new URL(event.request.url)

  // Cache-first for immutable content-hashed static assets
  if (isStaticAsset(url)) {
    event.respondWith(
      caches.match(event.request).then(
        cached =>
          cached ||
          fetch(event.request).then(response =>
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, response.clone())
              return response
            })
          )
      )
    )
    return
  }

  // Network-first with timeout for HTML shell and asset manifest
  if (isNavigationOrManifest(url)) {
    event.respondWith(
      fetchWithTimeout(event.request, NETWORK_TIMEOUT_MS)
        .then(response =>
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, response.clone())
            return response
          })
        )
        .catch(() => caches.match(event.request))
    )
    return
  }

  // Stale-while-revalidate for everything else (icons, manifest.json, etc.)
  event.respondWith(
    caches.match(event.request).then(cached => {
      const networkFetch = fetch(event.request).then(response => {
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, response.clone()))
        return response
      })
      return cached || networkFetch
    })
  )
})
