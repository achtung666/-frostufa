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
const telegramIcon = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21.6 3.4 18.2 20c-.2 1-1 1.2-1.7.7l-5.2-3.8-2.5 2.4c-.3.3-.5.5-1 .5l.4-5.3L18 5.6c.4-.4-.1-.6-.6-.3L5.2 13l-5-1.6c-1-.3-1-1 .2-1.5L20 2.4c.9-.3 1.7.2 1.6 1Z"/></svg>';
const phoneIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m7 3 3 5-2 2a15 15 0 0 0 6 6l2-2 5 3-1 4C11 22 2 13 3 4Z"/></svg>';
const logoPath = business ? 'assets/logo-dark.png' : 'assets/logo-light.png';
const logoDimensions = business ? 'width="1245" height="895"' : 'width="1254" height="1254"';
const logoCaption = business ? 'Ремонт холодильного<br>оборудования для бизнеса' : 'Срочный ремонт<br>холодильников на дому';
const brandArtwork = `<span class="logo-lockup"><span class="logo-emblem" aria-hidden="true"><img class="brand-image" src="${logoPath}" ${logoDimensions} alt=""></span><span class="logo-name"><img class="brand-image" src="${logoPath}" ${logoDimensions} alt="FROST UFA"></span><span class="logo-caption"><span>${logoCaption}</span></span></span>`;
const temperatureMarkup = `<span class="temperature-display" id="fridgeReadout" role="img" aria-label="Демонстрация температуры холодильника"><span id="fridgeTemperature" aria-hidden="true">${business ? '+4' : '−18'}</span><small aria-hidden="true">°C</small></span>`;
const contactDialogMarkup = `<dialog class="call-contact-dialog" id="contactDialog" aria-labelledby="contactDialogTitle" aria-describedby="contactDialogDescription"><div class="call-dialog-header"><h2 id="contactDialogTitle">Вызвать мастера</h2><button class="contact-close" id="closeContactDialog" type="button" aria-label="Закрыть окно связи">×</button></div><div class="call-dialog-body"><p id="contactDialogDescription">Выберите удобный способ связи.</p><button type="button" class="contact-option contact-option-primary" id="chooseCallback"><span class="contact-option-icon">${phoneIcon}</span><span><strong>Заказать обратный звонок</strong><small>Подготовить запрос с вашим номером</small></span>${arrow}</button><button type="button" class="contact-option contact-option-unavailable" disabled><span class="contact-option-icon">${phoneIcon}</span><span><strong>Позвонить нам</strong><small>Номер подключается</small></span></button><a class="contact-option" href="https://t.me/frostufa" target="_blank" rel="noopener noreferrer"><span class="contact-option-icon">${telegramIcon}</span><span><strong>Написать в Telegram</strong><small>@frostufa · напрямую команде</small></span>${arrow}</a><p class="callback-disclaimer">Запрос на звонок нужно отправить в Telegram после подготовки текста.</p></div></dialog>`;
document.getElementById('app').innerHTML = `
<header class="header wrap">
 <a href="${business ? 'business.html' : 'index.html'}" class="brand brand-artwork" aria-label="FROST UFA — главная">${brandArtwork}</a>
 <nav class="audiences" aria-label="Навигация"><a href="index.html" ${!business ? 'aria-current="page"' : ''}>Для дома</a><a href="business.html" ${business ? 'aria-current="page"' : ''}>Для бизнеса ${arrow}</a><a href="#contacts" class="contacts-nav">Контакты</a></nav>
 <button type="button" id="openContactDialog" class="header-cta call-master-trigger" aria-haspopup="dialog" aria-controls="contactDialog">Вызвать мастера ${arrow}</button>
</header>
<main>
 <section class="hero wrap" aria-labelledby="hero-title">
  <div class="hero-copy"><div class="location"><span></span> Уфа и область <i>/</i> Выездной сервис</div>
   <h1 id="hero-title">${business ? 'ХОЛОД ДЛЯ<br>ВАШЕГО<br><em>БИЗНЕСА.</em>' : 'НЕ<br>МОРОЗИТ?<br><em>ПОЧИНИМ.</em>'}</h1>
   <p class="intro">${business ? 'Ремонт холодильного оборудования для магазинов, кафе и предприятий. Приедем на ваш объект.' : 'Ремонт холодильников на дому.<br>Приедем, найдём причину и согласуем<br class="desktop-break"> стоимость до начала работ.'}</p>
   <a href="#request" class="button">${business ? 'Обсудить обслуживание' : 'Вызвать мастера'} ${arrow}</a>
   <p class="urgent"><span>↗</span> Срочный выезд — уточним доступное время</p>
   <a class="team-link" href="#team">О мастерах FROST UFA <span aria-hidden="true">↓</span></a>
  </div>
  <div class="showroom"><div class="scene-caption"><span>${business ? 'Коммерческий холод' : 'Ваш холодильник — в хороших руках'}</span><span class="serial thermal-status" id="fridgeStatus">Холод в норме</span></div>
   <div class="fridge-space"><div class="fridge ${business ? 'commercial-fridge' : 'home-fridge'}" id="fridge">
    ${business ? '<div class="cabinet-canopy"><span>FROST UFA<small>Commercial refrigeration</small></span>' + temperatureMarkup + '</div><div class="cabinet-plinth"><span class="vent-grille"></span><span class="cabinet-label">Холодильный шкаф</span></div><span class="cabinet-foot foot-left"></span><span class="cabinet-foot foot-right"></span>' : ''}
    <div class="inside"><div class="inner-light"></div><div class="inside-title">${business ? 'Что нужно отремонтировать?' : 'Что случилось?'}</div><div class="shelf-menu">${choices.map(([name], i) => `<button type="button" data-choice="${i}"><span>${name}</span>${arrow}</button>`).join('')}</div><div class="crisper"><span>FROST UFA</span><small>Холод вернётся.</small></div></div>
    <div class="fridge-door">${business ? '<div class="glass-reflection"></div><span class="commercial-handle"></span><span class="glass-caption">Откройте и выберите оборудование</span>' : '<div class="door-grain"></div><span class="appliance-brand">FROST <b>UFA</b></span><span class="home-temperature">' + temperatureMarkup + '</span><span class="freezer-line"></span><span class="handle handle-top"></span><span class="handle handle-bottom"></span><div class="door-symbol">' + brandArtwork + '</div><span class="door-sticker">НЕ МОРОЗИТ?<br>ПОЧИНИМ.</span><span class="door-bottom">Сервис холодильного оборудования</span>'}</div>
   </div></div>
   <div class="scene-controls"><span class="scene-help" id="sceneHelp">${business ? 'Выберите оборудование за дверцей' : 'За дверцей — подсказка по вашей поломке'}</span><button type="button" class="door-toggle" id="doorToggle" aria-expanded="false" aria-controls="fridge">Открыть дверцу <span aria-hidden="true">+</span></button></div>
  </div>
 </section>
 <section class="conditions wrap" aria-label="Условия выезда"><div><span class="condition-icon">↗</span><p><strong>от 500 ₽</strong><span>Выезд и диагностика по Уфе</span></p></div><div><span class="condition-icon">✓</span><p><strong>Бесплатно</strong><span>Выезд и диагностика при ремонте</span></p></div><div><span class="condition-icon">◷</span><p><strong>до 12 месяцев</strong><span>Гарантия на выполненные работы</span></p></div></section>
 <section class="service-section wrap" id="services"><div class="section-heading"><div><span class="section-kicker">${business ? 'Оборудование вашего объекта' : 'Разберёмся с поломкой'}</span><h2>${business ? 'Техника разная.<br>Задача — вернуть холод.' : 'У каждого симптома<br>есть своя причина.'}</h2></div><p>${business ? 'Выберите оборудование — подготовим запрос с учётом вашей задачи.' : 'Выберите, что происходит с холодильником. Точную причину мастер определит после диагностики.'}</p></div>
  <div class="service-list">${choices.map(([name, text], i) => `<button type="button" class="service" data-choice="${i}"><span class="service-sign">${business ? '❄' : ['−°','⌁','≋','ϟ'][i]}</span><span><strong>${name}</strong><small>${text}</small></span>${arrow}</button>`).join('')}</div>
 </section>
 <section class="process-section"><div class="wrap"><div class="section-heading"><div><span class="section-kicker">Понятный порядок работы</span><h2>От заявки<br>до рабочего холодильника.</h2></div><p>Стоимость и объём ремонта согласуем до начала работ.</p></div><ol class="steps"><li><span>01</span><h3>Расскажите о поломке</h3><p>Что за техника, что произошло и куда приехать.</p></li><li><span>02</span><h3>Встретьте мастера</h3><p>Согласуем время выезда. Проведём диагностику на месте.</p></li><li><span>03</span><h3>Согласуйте ремонт</h3><p>Мастер объяснит причину и назовёт стоимость работ.</p></li><li><span>04</span><h3>Принимайте работу</h3><p>Проверим результат. Условия гарантии зависят от выполненных работ.</p></li></ol></div></section>
 <section class="team-section wrap" id="team" aria-labelledby="team-title">
  <div class="team-intro"><span class="section-kicker">Команда FROST UFA</span><h2 id="team-title">За работой техники —<br>опыт людей.</h2><p class="team-lead">Мы — команда профессионалов по ремонту холодильного оборудования. В нашей команде есть опытные мастера, работающие в профессии с 2005 года.</p><p>${business ? 'Понимаем, что для магазина или кухни потеря холода нарушает весь рабочий день. Поэтому начинаем с сути: какое оборудование остановилось, что происходит и когда можно приехать на объект.' : 'Знаем, сколько забот приносит сломанный холодильник. Поэтому помогаем разобраться в поломке простыми словами и согласуем каждый следующий шаг: от диагностики до ремонта.'}</p><a href="#request" class="team-contact">${business ? 'Рассказать о вашем оборудовании' : 'Рассказать мастеру о поломке'} ${arrow}</a></div>
  <div class="team-practice"><div class="experience-mark"><span>с</span><strong>2005</strong><p>Опыт отдельных мастеров<br>нашей команды</p></div><div class="team-principles"><article><h3>Сначала разбираемся в причине</h3><p>Проверяем технику и объясняем, что вышло из строя и какие работы потребуются.</p></article><article><h3>Договариваемся до ремонта</h3><p>Обсуждаем стоимость, объём работ и условия гарантии, чтобы решение оставалось за вами.</p></article><article><h3>Проверяем результат вместе</h3><p>После ремонта проверяем работу оборудования и рассказываем, на что обратить внимание при эксплуатации.</p></article></div></div>
  <div class="team-members"><h3>Знакомьтесь с нашей командой</h3><a class="team-member" href="master-1.html"><span class="rinat-photo team-member-photo"><img src="assets/rinat-nurkaev.jpg" width="960" height="1280" alt="Ринат Нуркаев" loading="lazy"></span><span class="team-member-copy"><span class="section-kicker">Руководитель FROST UFA</span><strong>Ринат Нуркаев</strong><span>Ремонт бытовых холодильников · Опыт 8 лет</span><span class="team-member-link">Познакомиться с мастером ↗</span></span></a></div>
 </section>
 <section class="request-section wrap" id="request"><div class="request-copy"><span class="section-kicker">Уфа и область</span><h2>${business ? 'Обсудим<br>ваш объект.' : 'Вернём холод.<br>Вам — спокойствие.'}</h2><p>По Уфе выезд и диагностика — от 500 ₽. При выполнении ремонта — бесплатно.</p><p>В удалённые районы области — от 1 500 ₽. Стоимость и условия выезда согласуем заранее.</p><div class="contact-details" id="contacts"><a class="telegram-contact" href="https://t.me/frostufa" target="_blank" rel="noopener noreferrer"><span class="contact-icon telegram-icon">${telegramIcon}</span><span class="contact-copy"><strong>Написать в Telegram</strong><small>@frostufa · расскажите о поломке</small></span>${arrow}</a><div class="contact-row"><span class="contact-icon">${phoneIcon}</span><span class="contact-copy"><small>Телефон</small><strong>+7 (347) 000-00-00</strong></span><span class="contact-status">Временный номер</span></div><div class="contact-row contact-pending"><span class="contact-icon vk-icon" aria-hidden="true">VK</span><span class="contact-copy"><small>ВКонтакте</small><strong>frostufa</strong></span><span class="contact-status">Скоро</span></div></div><div class="contact-note">Для обращения напишите в Telegram.<br>Укажите модель, поломку и место выезда.</div></div>
 <form id="requestForm"><h3>${business ? 'Запрос на обслуживание' : 'Расскажите о поломке'}</h3><label for="customer">${business ? 'Компания / контактное лицо' : 'Ваше имя'}</label><input id="customer" name="customer" autocomplete="name" placeholder="Как к вам обращаться" required maxlength="100"><label for="requestPhone" id="requestPhoneLabel">Телефон для связи (необязательно)</label><input id="requestPhone" name="phone" type="tel" autocomplete="tel" placeholder="+7 (___) ___-__-__" minlength="6" maxlength="30"><label for="district">Район или населённый пункт</label><input id="district" name="district" autocomplete="address-level2" placeholder="Например, Уфа, Сипайлово" required maxlength="150"><label for="issue">${business ? 'Оборудование и неисправность' : 'Что случилось с холодильником'}</label><textarea id="issue" name="issue" placeholder="Модель и признаки неисправности, если знаете" required maxlength="1500"></textarea><button class="button" type="submit">Подготовить обращение ${arrow}</button><p class="form-note" id="formDeliveryNote">Форма подготовит текст. Скопируйте его и отправьте в Telegram.</p><div id="requestResult" hidden><label for="preparedText">Текст вашего обращения</label><textarea id="preparedText" readonly rows="7"></textarea><button type="button" id="copyRequest" class="copy-button">Скопировать текст</button><p role="status" id="copyStatus"></p><a class="form-telegram" href="https://t.me/frostufa" target="_blank" rel="noopener noreferrer">${telegramIcon}<span>Перейти в Telegram</span>${arrow}</a></div></form>
 </section>
</main>
<footer class="wrap"><a class="footer-logo" href="${business ? 'business.html' : 'index.html'}">${brandArtwork}</a><p>Ремонт холодильного оборудования<br>г. Уфа · Выезд по Уфе и области<br><a class="footer-team-link" href="#team">О нашей команде</a></p><div class="footer-contacts"><a class="social-button social-telegram" href="https://t.me/frostufa" target="_blank" rel="noopener noreferrer">${telegramIcon}<span>Написать в Telegram</span>${arrow}</a><span class="social-button social-pending"><span class="vk-mark" aria-hidden="true">VK</span><span>frostufa</span><small>Скоро</small></span><span class="footer-phone">+7 (347) 000-00-00<small>Временный номер</small></span></div><a class="other-side" href="${business ? 'index.html' : 'business.html'}">${business ? 'Светлая сторона — для дома' : 'Тёмная сторона — для бизнеса'} ${arrow}</a><small>© ${new Date().getFullYear()} FROST UFA</small></footer>
${contactDialogMarkup}
<dialog id="issueDialog"><button class="dialog-close" type="button" aria-label="Закрыть">×</button><span class="section-kicker">${business ? 'Ваше оборудование' : 'Знакомая проблема?'}</span><h2 id="issueTitle"></h2><p id="issueText"></p><p class="dialog-price">Выезд и диагностика по Уфе от 500 ₽.<br>При ремонте — бесплатно.</p><button class="button" id="chooseIssue" type="button">Добавить в обращение ${arrow}</button></dialog>`;
const contactDialog = document.getElementById('contactDialog');
let callbackRequested = false;
document.getElementById('openContactDialog').addEventListener('click', () => contactDialog.showModal());
document.getElementById('closeContactDialog').addEventListener('click', () => contactDialog.close());
contactDialog.addEventListener('click', event => {
 if (event.target !== contactDialog) return;
 const rect = contactDialog.getBoundingClientRect();
 if(event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) contactDialog.close();
});
document.getElementById('chooseCallback').addEventListener('click', () => {
 callbackRequested = true;
 contactDialog.close();
 const phone = document.getElementById('requestPhone');
 phone.required = true;
 document.getElementById('requestPhoneLabel').textContent = 'Телефон для обратного звонка';
 document.getElementById('formDeliveryNote').textContent = 'Подготовьте запрос на звонок, скопируйте текст и отправьте его в Telegram @frostufa.';
 document.getElementById('request').scrollIntoView({behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
 phone.focus({preventScroll:true});
});
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
 const phone = String(form.get('phone') || '').trim();
 document.getElementById('preparedText').value = `FROST UFA — ${business ? 'запрос от организации' : 'ремонт на дому'}${callbackRequested ? '\nПрошу связаться со мной по телефону.' : ''}\nКонтакт: ${form.get('customer')}${phone ? '\nТелефон: ' + phone : ''}\nМесто выезда: ${form.get('district')}\nЗадача: ${form.get('issue')}`;
 document.getElementById('requestResult').hidden = false;
 document.getElementById('copyStatus').textContent = '';
 document.getElementById('preparedText').focus();
});
document.getElementById('copyRequest').addEventListener('click', async () => {
 const field = document.getElementById('preparedText');
 try { await navigator.clipboard.writeText(field.value); document.getElementById('copyStatus').textContent = 'Текст скопирован. Откройте чат @frostufa и отправьте сообщение.'; }
 catch { field.focus(); field.select(); document.getElementById('copyStatus').textContent = 'Скопируйте выделенный текст вручную.'; }
});
