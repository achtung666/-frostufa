(() => {
  const fridge = document.getElementById('fridge');
  const temperature = document.getElementById('fridgeTemperature');
  const status = document.getElementById('fridgeStatus');
  const readout = document.getElementById('fridgeReadout');
  const toggle = document.getElementById('doorToggle');
  if (!fridge || !temperature || !status || !readout || !toggle) return;
  const business = document.body.dataset.mode === 'business';
  const steps = business ? [4, 4, 7, 10, 14, 17, 20] : [-18, -18, -12, -6, 1, 8, 14, 20];
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let index = 0;
  let timer;
  let open = false;
  function paint(repaired = false) {
    const value = steps[index];
    const phase = repaired ? 'repaired' : index === steps.length - 1 ? 'broken' : value > steps[0] ? 'warming' : 'normal';
    temperature.textContent = value < 0 ? '−' + Math.abs(value) : '+' + value;
    status.textContent = {normal: 'Холод в норме', warming: 'Температура растёт', broken: '⚠ Нужен ремонт', repaired: 'Холод восстановлен'}[phase];
    fridge.setAttribute('data-condition', phase);
    status.setAttribute('data-condition', phase);
    readout.setAttribute('aria-label', `Температура ${value} °C. ${status.textContent}`);
    if (phase === 'broken') document.getElementById('sceneHelp').textContent = 'Откройте дверцу — вернём холод';
  }
  function schedule() {
    clearTimeout(timer);
    if (open || document.hidden || motion.matches || index === steps.length - 1) return;
    timer = setTimeout(() => { index++; paint(); schedule(); }, 1700);
  }
  toggle.addEventListener('click', () => {
    open = toggle.getAttribute('aria-expanded') === 'true';
    index = 0;
    paint(open);
    schedule();
  });
  document.addEventListener('visibilitychange', schedule);
  motion.addEventListener?.('change', () => {
    if (motion.matches && !open) index = steps.length - 1;
    paint(open);
    schedule();
  });
  if (motion.matches) index = steps.length - 1;
  paint();
  schedule();
})();
