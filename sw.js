self.addEventListener("fetch", event => {
    const response = serve(event.request.url.slice(event.request.url.lastIndexOf("/") + 1));
    
    event.respondWith(response ?? fetch(event.request));
});

serve = async (name) => {
    const root = await navigator.storage.getDirectory();
    const fileHandle = await root.getFileHandle(name, { create: true });
    const file = await fileHandle.getFile();
    const text = await file.text();

    return !!text ? new Response(text, { headers: { "Content-Type": "text/html; charset=utf-8" } }) : null;
}
