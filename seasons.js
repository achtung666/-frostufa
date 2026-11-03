(() => {
  const month = Number(new Intl.DateTimeFormat('en-US', {month: 'numeric', timeZone: 'Asia/Yekaterinburg'}).format(new Date()));
  const calendarSeason = month === 12 || month <= 2 ? 'winter' : month <= 5 ? 'spring' : month <= 8 ? 'summer' : 'autumn';
  const requested = new URLSearchParams(window.location.search).get('season');
  const season = ['winter', 'spring', 'summer', 'autumn'].includes(requested) ? requested : calendarSeason;
  const count = season === 'summer' ? 0 : season === 'winter' ? 42 : 24;
  const particles = Array.from({length: count}, (_, i) => {
    const left = (i * 43 + 7) % 100;
    const duration = season === 'winter' ? 12 + i % 10 : 2.2 + (i % 7) * .22;
    return `<i class="season-particle" style="--left:${left}%;--duration:${duration}s;--delay:-${(i * 1.73).toFixed(2)}s;--size:${4 + i % 5}px;--drift:${i % 2 ? 28 : -28}px"></i>`;
  }).join('');
  document.body.insertAdjacentHTML('beforeend', `<div class="seasonal-layer season-${season}" aria-hidden="true" inert>${season === 'summer' ? '<i class="season-sun"></i>' : particles}</div>`);
  if (requested === season) {
    for (const link of document.querySelectorAll('a[href]')) {
      const target = link.getAttribute('href');
      if (!/^(?:index|business|master-[123])\.html(?:[?#]|$)/.test(target)) continue;
      const [base, hash] = target.split('#');
      const [file, query] = base.split('?');
      const params = new URLSearchParams(query);
      params.set('season', season);
      link.setAttribute('href', `${file}?${params}${hash ? '#' + hash : ''}`);
    }
  }
  document.addEventListener('visibilitychange', () => {
    document.querySelector('.seasonal-layer')?.classList.toggle('season-paused', document.hidden);
  });
})();
