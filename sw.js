<script>
    self.addEventListener("fetch", (event) => navigator.storage.getDirectory().then(root => root.getFileHandle(event.request, { create: true }).then(h => h.getFile().then(f => event.respondWith(f)))));
</script>
