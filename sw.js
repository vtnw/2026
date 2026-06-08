self.addEventListener('fetch', event => event.respondWith(serve(event.request.url.slice(event.request.url.lastIndexOf("/") - 1))));

serve = async (name) => {
    const root = await navigator.storage.getDirectory();
    const fileHandle = await root.getFileHandle(name);
    const file = await fileHandle.getFile();
    const text = await file.text();

    return new Response(text, { headers: { "Content-Type": "text/html; charset=utf-8" } });
}
