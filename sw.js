self.addEventListener("fetch", event => event.respondWith(async (event) => {
    try {
        const root = await navigator.storage.getDirectory();
        const fileHandle = await root.getFileHandle(event.request.url.slice(event.request.url.lastIndexOf("/") + 1));
        const file = await fileHandle.getFile();
        const text = await file.text();

        return new Response(text, { headers: { "Content-Type": "text/html; charset=utf-8" } });
    } catch {
        return fetch(event.request);
    }
}));
