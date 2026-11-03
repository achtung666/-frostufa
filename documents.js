(() => {
  const viewer = document.getElementById('documentViewer');
  if (!viewer || typeof viewer.showModal !== 'function') return;
  const image = document.getElementById('documentViewerImage');
  let opener;
  document.querySelectorAll('[data-document]').forEach(link => {
    link.addEventListener('click', event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      opener = link;
      image.src = link.getAttribute('href');
      image.alt = link.querySelector('img').alt;
      document.getElementById('documentViewerTitle').textContent = link.querySelector('.document-card-topic').textContent + ' · образец';
      viewer.showModal();
      document.getElementById('closeDocumentViewer').focus();
    });
  });
  document.getElementById('closeDocumentViewer').addEventListener('click', () => viewer.close());
  viewer.addEventListener('close', () => opener?.focus());
  viewer.addEventListener('click', event => {
    if (event.target !== viewer) return;
    const rect = viewer.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) viewer.close();
  });
})();
