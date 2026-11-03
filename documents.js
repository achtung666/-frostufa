// Discourage casual saving within the gallery; this is not access control.
(() => {
  document.querySelectorAll('.document-thumbnail').forEach(preview => {
    preview.addEventListener('contextmenu', event => event.preventDefault());
    preview.addEventListener('dragstart', event => event.preventDefault());
  });
})();
