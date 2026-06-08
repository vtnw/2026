self.addEventListener("fetch", event => event.respondWith(process(event)));

process = async event => {
    try {
        const name = event.request.url.slice((new URL(event.request.url)).pathname.split('/').pop());
        const root = await navigator.storage.getDirectory();
        const fileHandle = await root.getFileHandle(name);
        const file = await fileHandle.getFile();
        const text = await file.text();

        return new Response(text, { headers: { "Content-Type": "text/html; charset=utf-8" } });
    } catch {
        return fetch(event.request);
    }
}
