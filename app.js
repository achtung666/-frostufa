const business = document.body.dataset.mode === 'business';
const choices = business ? [
  ['Холодильный шкаф','Укажите модель шкафа, температуру и симптомы неисправности.'],
  ['Торговая витрина','Укажите тип витрины и какую температуру она держит сейчас.'],
  ['Морозильный ларь','Расскажите, работает ли компрессор и когда пропал холод.'],
  ['Холодильная камера','Укажите размер камеры, модель установки и характер неисправности.']
] : [
  ['Не морозит','Проверим систему охлаждения и найдём причину потери холода.'],
  ['Течёт вода','Проверим отвод конденсата и систему оттайки.'],
  ['Шумит или гудит','Определим источник шума: вентилятор, компрессор или крепления.'],
  ['Не включается','Проверим питание, пусковые узлы и управление.']
];
const arrow = '<span aria-hidden="true">↗</span>';
const snow = '<svg viewBox="0 0 80 80" fill="none" aria-hidden="true"><path d="M40 5v70M10 22l60 36M10 58l60-36M29 12l11 9 11-9M29 68l11-9 11 9M12 35l12-4-2-13M58 62l-2-13 12-4M12 45l12 4-2 13M58 18l-2 13 12 4" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><path d="M40 5v16M29 12l11 9 11-9" stroke="#ff7a00" stroke-width="5" stroke-linecap="round"/></svg>';
document.getElementById('app').innerHTML = `
<header class="header wrap">
 <a href="${business ? 'business.html' : 'index.html'}" class="brand" aria-label="FROST UFA — главная">${snow}<span>FROST <b>UFA</b><small>${business ? 'Сервис для бизнеса' : 'Ремонт холодильников'}</small></span></a>
 <nav class="audiences" aria-label="Направления работы"><a href="index.html" ${!business ? 'aria-current="page"' : ''}>Для дома</a><a href="business.html" ${business ? 'aria-current="page"' : ''}>Для бизнеса ${arrow}</a></nav>
 <a href="#request" class="header-cta">${business ? 'Обсудить задачу' : 'Вызвать мастера'} ${arrow}</a>
</header>
<main>
 <section class="hero wrap" aria-labelledby="hero-title">
  <div class="hero-copy"><div class="location"><span></span> Уфа и область <i>/</i> Выездной сервис</div>
   <h1 id="hero-title">${business ? 'ХОЛОД ДЛЯ<br>ВАШЕГО<br><em>БИЗНЕСА.</em>' : 'НЕ<br>МОРОЗИТ?<br><em>ПОЧИНИМ.</em>'}</h1>
   <p class="intro">${business ? 'Ремонт холодильного оборудования для магазинов, кафе и предприятий. Приедем на ваш объект.' : 'Ремонт холодильников на дому.<br>Приедем, найдём причину и согласуем<br class="desktop-break"> стоимость до начала работ.'}</p>
   <a href="#request" class="button">${business ? 'Обсудить обслуживание' : 'Вызвать мастера'} ${arrow}</a>
   <p class="urgent"><span>↗</span> Срочный выезд — уточним доступное время</p>
  </div>
  <div class="showroom"><div class="scene-caption"><span>${business ? 'Коммерческий холод' : 'Ваш холодильник — в хороших руках'}</span><span class="serial">F / U</span></div>
   <div class="fridge-space"><div class="fridge" id="fridge">
    <div class="inside"><div class="inner-light"></div><div class="inside-title">${business ? 'Что нужно отремонтировать?' : 'Что случилось?'}</div><div class="shelf-menu">${choices.map(([name], i) => `<button type="button" data-choice="${i}"><span>${name}</span>${arrow}</button>`).join('')}</div><div class="crisper"><span>FROST UFA</span><small>Холод вернётся.</small></div></div>
    <div class="fridge-door"><div class="door-grain"></div><span class="appliance-brand">FROST <b>UFA</b></span><span class="freezer-line"></span><span class="handle handle-top"></span><span class="handle handle-bottom"></span><div class="door-symbol"><img src="assets/logo.jpg" width="104" height="104" alt="FROST UFA — ремонт холодильного оборудования"></div><span class="door-sticker">${business ? 'BUSINESS<br>СЕРВИС' : 'НЕ МОРОЗИТ?<br>ПОЧИНИМ.'}</span><span class="door-bottom">Сервис холодильного оборудования</span></div>
   </div></div>
   <div class="scene-controls"><span class="scene-help" id="sceneHelp">${business ? 'Выберите оборудование за дверцей' : 'За дверцей — подсказка по вашей поломке'}</span><button type="button" class="door-toggle" id="doorToggle" aria-expanded="false" aria-controls="fridge">Открыть дверцу <span aria-hidden="true">+</span></button></div>
  </div>
 </section>
 <section class="conditions wrap" aria-label="Условия выезда"><div><span class="condition-icon">↗</span><p><strong>от 500 ₽</strong><span>Выезд и диагностика по Уфе</span></p></div><div><span class="condition-icon">✓</span><p><strong>Бесплатно</strong><span>Выезд и диагностика при ремонте</span></p></div><div><span class="condition-icon">◷</span><p><strong>до 12 месяцев</strong><span>Гарантия на выполненные работы</span></p></div></section>
 <section class="service-section wrap" id="services"><div class="section-heading"><div><span class="section-kicker">${business ? 'Оборудование вашего объекта' : 'Разберёмся с поломкой'}</span><h2>${business ? 'Техника разная.<br>Задача — вернуть холод.' : 'У каждого симптома<br>есть своя причина.'}</h2></div><p>${business ? 'Выберите оборудование — подготовим запрос с учётом вашей задачи.' : 'Выберите, что происходит с холодильником. Точную причину мастер определит после диагностики.'}</p></div>
  <div class="service-list">${choices.map(([name, text], i) => `<button type="button" class="service" data-choice="${i}"><span class="service-sign">${business ? '❄' : ['−°','⌁','≋','ϟ'][i]}</span><span><strong>${name}</strong><small>${text}</small></span>${arrow}</button>`).join('')}</div>
 </section>
 <section class="process-section"><div class="wrap"><div class="section-heading"><div><span class="section-kicker">Понятный порядок работы</span><h2>От заявки<br>до рабочего холодильника.</h2></div><p>Стоимость и объём ремонта согласуем до начала работ.</p></div><ol class="steps"><li><span>01</span><h3>Расскажите о поломке</h3><p>Что за техника, что произошло и куда приехать.</p></li><li><span>02</span><h3>Встретьте мастера</h3><p>Согласуем время выезда. Проведём диагностику на месте.</p></li><li><span>03</span><h3>Согласуйте ремонт</h3><p>Мастер объяснит причину и назовёт стоимость работ.</p></li><li><span>04</span><h3>Принимайте работу</h3><p>Проверим результат. Условия гарантии зависят от выполненных работ.</p></li></ol></div></section>
 <section class="request-section wrap" id="request"><div class="request-copy"><span class="section-kicker">Уфа и область</span><h2>${business ? 'Обсудим<br>ваш объект.' : 'Вернём холод.<br>Вам — спокойствие.'}</h2><p>По Уфе выезд и диагностика — от 500 ₽. При выполнении ремонта — бесплатно.</p><p>В удалённые районы области — от 1 500 ₽. Стоимость и условия выезда согласуем заранее.</p><div class="contact-note">Сейчас можно подготовить текст обращения.<br>Приём заявок скоро появится.</div></div>
 <form id="requestForm"><h3>${business ? 'Запрос на обслуживание' : 'Расскажите о поломке'}</h3><label for="customer">${business ? 'Компания / контактное лицо' : 'Ваше имя'}</label><input id="customer" name="customer" autocomplete="name" placeholder="Как к вам обращаться" required maxlength="100"><label for="district">Район или населённый пункт</label><input id="district" name="district" autocomplete="address-level2" placeholder="Например, Уфа, Сипайлово" required maxlength="150"><label for="issue">${business ? 'Оборудование и неисправность' : 'Что случилось с холодильником'}</label><textarea id="issue" name="issue" placeholder="Модель и признаки неисправности, если знаете" required maxlength="1500"></textarea><button class="button" type="submit">Подготовить обращение ${arrow}</button><p class="form-note">Предварительный просмотр. Данные никуда не отправляются.</p><div id="requestResult" hidden><label for="preparedText">Текст вашего обращения</label><textarea id="preparedText" readonly rows="7"></textarea><button type="button" id="copyRequest" class="copy-button">Скопировать текст</button><p role="status" id="copyStatus"></p></div></form>
 </section>
</main>
<footer class="wrap"><a class="footer-wordmark" href="index.html">FROST <b>UFA</b></a><p>Ремонт холодильного оборудования<br>г. Уфа · Выезд по Уфе и области</p><a class="other-side" href="${business ? 'index.html' : 'business.html'}">${business ? 'Светлая сторона — для дома' : 'Тёмная сторона — для бизнеса'} ${arrow}</a><small>© ${new Date().getFullYear()} FROST UFA</small></footer>
<dialog id="issueDialog"><button class="dialog-close" type="button" aria-label="Закрыть">×</button><span class="section-kicker">${business ? 'Ваше оборудование' : 'Знакомая проблема?'}</span><h2 id="issueTitle"></h2><p id="issueText"></p><p class="dialog-price">Выезд и диагностика по Уфе от 500 ₽.<br>При ремонте — бесплатно.</p><button class="button" id="chooseIssue" type="button">Добавить в обращение ${arrow}</button></dialog>`;
const fridge = document.getElementById('fridge');
const toggle = document.getElementById('doorToggle');
toggle.addEventListener('click', () => {
 const open = fridge.classList.toggle('is-open');
 toggle.setAttribute('aria-expanded', String(open));
 toggle.innerHTML = `${open ? 'Закрыть дверцу' : 'Открыть дверцу'} <span aria-hidden="true">${open ? '−' : '+'}</span>`;
 fridge.querySelector('.inside').inert = !open;
 document.getElementById('sceneHelp').textContent = open ? 'Нажмите на нужный пункт внутри' : 'За дверцей — выбор вашей задачи';
});
fridge.querySelector('.inside').inert = true;
const dialog = document.getElementById('issueDialog');
let selected = 0;
document.querySelectorAll('[data-choice]').forEach(button => button.addEventListener('click', () => {
 selected = Number(button.dataset.choice);
 document.getElementById('issueTitle').textContent = choices[selected][0];
 document.getElementById('issueText').textContent = choices[selected][1];
 dialog.showModal();
}));
dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) {const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();} });
document.getElementById('chooseIssue').addEventListener('click', () => {
 document.getElementById('issue').value = choices[selected][0];
 dialog.close();
 document.getElementById('request').scrollIntoView({behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
 document.getElementById('customer').focus({preventScroll:true});
});
document.getElementById('requestForm').addEventListener('submit', event => {
 event.preventDefault();
 const form = new FormData(event.currentTarget);
 document.getElementById('preparedText').value = `FROST UFA — ${business ? 'запрос от организации' : 'ремонт на дому'}\nКонтакт: ${form.get('customer')}\nМесто выезда: ${form.get('district')}\nЗадача: ${form.get('issue')}`;
 document.getElementById('requestResult').hidden = false;
 document.getElementById('copyStatus').textContent = '';
 document.getElementById('preparedText').focus();
});
document.getElementById('copyRequest').addEventListener('click', async () => {
 const field = document.getElementById('preparedText');
 try { await navigator.clipboard.writeText(field.value); document.getElementById('copyStatus').textContent = 'Текст скопирован. Обращение ещё не отправлено.'; }
 catch { field.focus(); field.select(); document.getElementById('copyStatus').textContent = 'Скопируйте выделенный текст вручную.'; }
});
