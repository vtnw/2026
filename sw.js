self.addEventListener("fetch", event => event.respondWith(process(event.request.url)));

process = url => new Promise((resolve) => navigator.storage.getDirectory()
    .then(r => r.getFileHandle(new URL(url).pathname.split("/").pop())
        .then(h => h.getFile()
            .then(f => f.text()
                .then(t => resolve(new Response(text, { headers: { "Content-Type": "text/html; charset=utf-8" } }))))))
    .catch(() => resolve(fetch("local.html"))));
