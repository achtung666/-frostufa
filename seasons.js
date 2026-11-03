(() => {
  const month = Number(new Intl.DateTimeFormat('en-US', {month: 'numeric', timeZone: 'Asia/Yekaterinburg'}).format(new Date()));
  const calendarSeason = month === 12 || month <= 2 ? 'winter' : month <= 5 ? 'spring' : month <= 8 ? 'summer' : 'autumn';
  const requested = new URLSearchParams(window.location.search).get('season');
  const season = ['winter', 'spring', 'summer', 'autumn'].includes(requested) ? requested : calendarSeason;
  const count = season === 'summer' ? 0 : season === 'winter' ? 18 : 24;
  const particles = Array.from({length: count}, (_, i) => {
    const left = (i * 43 + 7) % 100;
    const duration = season === 'winter' ? 15 + i % 11 : 2.2 + (i % 7) * .22;
    return `<i class="season-particle" style="--left:${left}%;--duration:${duration}s;--delay:-${(i * 1.73).toFixed(2)}s;--size:${3 + i % 4}px;--drift:${i % 2 ? 18 : -18}px"></i>`;
  }).join('');
  document.body.insertAdjacentHTML('beforeend', `<div class="seasonal-layer season-${season}" aria-hidden="true" inert>${season === 'summer' ? '<i class="season-sun"></i>' : particles}</div>`);
  document.addEventListener('visibilitychange', () => {
    document.querySelector('.seasonal-layer')?.classList.toggle('season-paused', document.hidden);
  });
})();
