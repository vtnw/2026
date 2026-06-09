self.addEventListener("fetch", event => event.respondWith(process(event)));

process = async event => {
    try {
        const name = new URL(event.request.url).pathname.split("/").pop();
        const root = await navigator.storage.getDirectory();
        const handle = await root.getFileHandle(name);
        const file = await handle.getFile();
        const text = await file.text();

        return new Response(text, { headers: { "Content-Type": "text/html; charset=utf-8" } });
    } catch {
        return fetch("local.html");
    }
}
