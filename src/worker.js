self.addEventListener('install', e => {
    self.skipWaiting();
    console.log('installed')
})

self.addEventListener('activate', e => {
    self.clients.claim();
    console.log('activated')
})

self.addEventListener('message', e => {
    console.log(e.data)
})