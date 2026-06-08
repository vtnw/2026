self.addEventListener("fetch", event => event.respondWith(handle(event)));

handle = async (event) => {
    const root = await navigator.storage.getDirectory();
    const fileHandle = await root.getFileHandle(event.request.url.slice(event.request.url.lastIndexOf("/") + 1), { create: true });
    const file = await fileHandle.getFile();
    const text = await file.text();

    return !!text ? new Response(text, { headers: { "Content-Type": "text/html; charset=utf-8" } }) : fetch(event.request);
}
