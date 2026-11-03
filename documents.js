// Discourage casual saving within the gallery; this is not access control.
(() => {
  document.querySelectorAll('.document-thumbnail').forEach(preview => {
    ['contextmenu', 'dragstart', 'selectstart', 'copy', 'cut'].forEach(type => {
      preview.addEventListener(type, event => event.preventDefault());
    });
  });
})();
