const html = `
    <!DOCTYPE html>
    <html lang="en" xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>upload</title>
    </head>
    <body></body>
    <script>
        window.onclick = () => {
            const file = Object.assign(document.createElement("input"), { type: "file", style: "display: none" });
    
            file.oncancel = (event) => document.body.removeChild(event.target);
            file.onclick = (event) => event.stopPropagation();
            file.onchange = (event) => {
                navigator.storage.getDirectory().then(root => root.getFileHandle(event.target.files[0].name, { create: true }).then(h => h.createWritable().then(w => w.write(event.target.files[0]).then(() => w.close()))));
                location.reload();
            };
            
            document.body.appendChild(file);
            file.click();
        }
    </script>`;

self.addEventListener("fetch", event => event.respondWith(process(event)));

process = async event => {
    try {
        const name = new URL(event.request.url).pathname.split('/').pop();

        if (name === "local.html") {
            return fetch(event.request);
        }
        
        const root = await navigator.storage.getDirectory();
        const handle = await root.getFileHandle(name);
        const file = await handle.getFile();
        const text = await file.text();

        return new Response(text, { headers: { "Content-Type": "text/html; charset=utf-8" } });
    } catch {
        return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8" } });
    }
}
