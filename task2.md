У меня есть существующий HTML-код White Label (я приложу его ниже). Нужно заменить в нём **только шапку** на новую, которая полностью повторяет дизайн шапки основного сайта (https://ts-trip.com).

## Что нужно сделать

### 1. Взять существующий HTML-код White Label
Я приложу его ниже в виде текстового файла или вставлю в сообщение.

### 2. Заменить только шапку
- Удалить текущий блок с шапкой (всё, что относится к `header`)
- Вставить новую шапку, скопированную с основного сайта
- Шапка должна содержать: логотип, меню (Главная, Маршруты, Справочная, Блог, Путеводитель), кнопку «Войти»
- Логотип должен загружаться также как сейчас(это уже работает, не трогать)

### 3. Сохранить всё остальное без изменений
- Форма поиска Travelpayouts (код `tpwl-search`)
- Блок с популярными направлениями
- Футер
- Все стили и скрипты, которые не относятся к шапке

### 4. Важно
- Не менять логотип и его путь
- Все ссылки в новой шапке должны вести на основной сайт: `https://ts-trip.com/...`
- Все ссылки должны открываться в новой вкладке (`target="_blank"`)
- Шапка должна работать на мобильных устройствах (бургер-меню)

## Что не надо делать
- Не менять код White Label (форму поиска, направления, футер)
- Не трогать логотип и его путь
- Не переписывать весь код, только шапку

Я приложу текущий HTML-код White Label в следующем сообщении. Ты должен вернуть обновлённый код, где заменена только шапка.

<!DOCTYPE html>
<html lang="ru">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="ie=edge" />
  <meta name="description" content="Поиск авиабилетов" />
  <link rel="icon" href="/favicon.ico" type="image/x-icon">
  <meta property="og:title" content="Поиск авиабилетов" />
  <meta property="og:description"
    content="Сравниваем цены с сотен сайтов и позволяем вам выбрать самый дешевый вариант перелета." />
  <meta content="ru_RU" property="og:locale">
  <meta content="product.item" property="og:type">
  <meta content="[:og_image:]" property="og:image">
  <meta content="Поиск дешевых авиабилетов" name="twitter:title">
  <meta content="Сравниваем цены с сотен сайтов и позволяем вам выбрать самый дешевый вариант перелета."
    name="twitter:description">
  <meta content="summary_large_image" name="twitter:card">
  <title>Поиск авиабилетов[:route_info:]</title>

  <!-- ===== СТИЛИ TRAVELPAYOUTS ===== -->
  <style>
    body {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      color: var(--tpwl-main-text);
      background-color: var(--tpwl-search-result-background);
      font-family: var(--tpwl-font-family), sans-serif;
    }

    body a {
      color: var(--tpwl-links);
      text-decoration: none;
      cursor: pointer;
      transition: 0.1s linear;
    }

    body a:hover,
    body a:focus {
      text-decoration: underline;
    }

    .tpwl-logo-header {
      position: relative;
      color: var(--tpwl-headline-text);
      font-weight: 600;
      background-color: var(--tpwl-search-form-background);
      padding: 32px 100px 16px;
      margin-bottom: -20px;
      z-index: 101;
      background-size: cover;
      background-repeat: no-repeat;
      transform: translateZ(0);
      backface-visibility: hidden;
    }

    .tpwl-logo-header h1 {
      font-size: 48px;
      margin: 0;
    }

    .tpwl-search-header {
      padding: 24px 100px;
      background-color: var(--tpwl-search-form-background);
      position: sticky;
      top: 0;
      z-index: 100;
      transition: all 0.3s linear;
      transform: translateZ(0);
      backface-visibility: hidden;
    }

    .tpwl-logo__wrapper {
      display: none;
    }

    .tpwl-search__wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .tpwl__content {
      flex: 1 0 auto;
      max-width: 1240px;
      min-width: 976px;
    }

    .tpwl-main {
      background-color: var(--tpwl-search-result-background);
    }

    .tpwl-tickets__wrapper #tpwl-tickets:not(:empty) {
      margin-bottom: 32px;
    }

    .tpwl-tickets__wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0px 100px;
    }

    .tpwl-widgets__wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 56px 100px;
      margin-bottom: 32px;
    }

    .tpwl-widgets__wrapper h3 {
      text-align: center;
      font-size: 36px;
      margin: 0px;
      margin-bottom: 32px;
    }

    .tpwl-widget-weedles {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 20px;
    }

    .tpwl-widget-weedle {
      display: flex;
      justify-content: center;
    }

    .tpwl-footer__wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 56px 100px;
      text-align: center;
      font-size: 16px;
      font-weight: 600;
      background-color: var(--tpwl-search-result-background);
    }

    .tpwl-footer__copyright {
      margin-bottom: 12px;
    }

    .tpwl-footer__links {
      display: flex;
      justify-content: center;
      gap: 20px;
    }

    @media (max-width: 389px) {
      .tpwl-footer__wrapper {
        padding: 56px 16px;
      }

      .tpwl__content {
        max-width: unset;
        min-width: unset;
      }

      .tpwl-footer__copyright {
        margin-bottom: 20px;
      }

      .tpwl-footer__links {
        display: block;
      }

      .tpwl-footer__links a {
        display: block;
        margin-bottom: 16px;
      }

      .tpwl-footer__links a:last-child {
        margin-bottom: 0px;
      }
    }

    @media (max-width: 1175px) {
      .tpwl-logo-header {
        position: static;
        padding: 32px 16px 6px;
        margin-bottom: 0px;
      }

      .tpwl-logo-header h1 {
        font-size: 36px;
        max-width: 512px;
      }

      .tpwl__content {
        max-width: unset;
        min-width: unset;
      }

      .tpwl-search__wrapper {
        display: block;
      }

      .tpwl-search-header {
        padding: 24px 16px 24px;
        position: static;
      }

      .tpwl-tickets__wrapper {
        padding: 0px 16px;
      }

      .tpwl-widgets__wrapper {
        padding: 56px 16px;
      }

      .tpwl-widgets__wrapper h3 {
        font-size: 32px;
      }

      .tpwl-widgets__wrapper .tpwl__content {
        flex: 1 0 100%;
      }

      .tpwl-widget-weedles {
        grid-template-columns: 1fr;
      }

      .tpwl-footer__wrapper {
        padding: 56px 16px;
      }

      .tpwl-footer__wrapper .tpwl__content {
        flex: 1 1 auto;
      }
    }
  </style>

  <!-- ===== СТИЛИ ВАШЕЙ ШАПКИ ===== -->
  <style>
    .ts-header * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    .ts-header body {
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
      background: #F6F7F8;
    }

    .ts-header .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 16px;
    }

    .ts-header .header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 50;
      width: 100%;
      background: #E8ECF7;
      backdrop-filter: blur(12px);
      border-bottom: 1px solid rgba(16, 10, 111, 0.1);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
      transition: all 0.3s ease;
    }

    .ts-header .header-inner {
      display: flex;
      height: 56px;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      overflow: visible;
    }

    @media (min-width: 768px) {
      .ts-header .header-inner {
        height: 96px;
        gap: 16px;
      }
    }

    .ts-header .logo-link {
      display: flex;
      align-items: center;
      flex-shrink: 0;
      transition: opacity 0.2s;
      margin-left: 0;
      width: auto;
      max-width: none;
    }

    .ts-header .logo-link:hover {
      opacity: 0.8;
    }

    @media (min-width: 768px) {
      .ts-header .logo-link {
        margin-left: 0;
        max-width: none;
      }
    }

    .ts-header .logo-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 120px;
      height: 56px;
      overflow: hidden;
      flex-shrink: 0;
    }

    @media (min-width: 768px) {
      .ts-header .logo-wrapper {
        width: 160px;
        height: 84px;
      }
    }

    .ts-header .logo-img {
      height: 100%;
      width: auto;
      max-width: 100%;
      object-fit: scale-down;
      flex-shrink: 0;
    }

    .ts-header .nav-desktop {
      display: none;
      align-items: center;
      gap: 16px;
      flex: 1;
      justify-content: center;
    }

    @media (min-width: 1024px) {
      .ts-header .nav-desktop {
        display: flex;
      }
    }

    .ts-header .nav-link {
      font-size: 18px;
      font-weight: 500;
      padding: 8px 12px;
      border-radius: 6px;
      color: rgba(0, 0, 0, 0.7);
      text-decoration: none;
      border: 1px solid transparent;
      transition: all 0.2s;
    }

    .ts-header .nav-link:hover {
      color: #1411EC;
      background: rgba(0, 0, 0, 0.05);
    }

    .ts-header .login-btn {
      display: none;
      padding: 6px 16px;
      border-radius: 6px;
      font-size: 16px;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.7);
      background: rgba(255, 255, 255, 0.5);
      border: 1px solid #e5e7eb;
      cursor: pointer;
      transition: all 0.2s;
      text-decoration: none;
    }

    .ts-header .login-btn:hover {
      background: rgba(0, 0, 0, 0.05);
      color: #000;
    }

    @media (min-width: 768px) {
      .ts-header .login-btn {
        display: inline-block;
      }
    }

    .ts-header .menu-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: 9999px;
      background: transparent;
      border: none;
      color: rgba(0, 0, 0, 0.7);
      cursor: pointer;
      transition: background 0.2s;
    }

    .ts-header .menu-btn:hover {
      background: rgba(0, 0, 0, 0.05);
    }

    @media (min-width: 768px) {
      .ts-header .menu-btn {
        display: none;
      }
    }

    .ts-header .menu-btn svg {
      width: 20px;
      height: 20px;
    }

    .ts-header .nav-mobile {
      display: none;
      padding-bottom: 16px;
      overflow-x: auto;
      gap: 8px;
    }

    .ts-header .nav-mobile a {
      font-size: 18px;
      font-weight: 500;
      padding: 4px 8px;
      border-radius: 4px;
      white-space: nowrap;
      color: rgba(0, 0, 0, 0.7);
      text-decoration: none;
      border: 1px solid transparent;
      transition: all 0.2s;
    }

    .ts-header .nav-mobile a:hover {
      color: #1411EC;
    }

    .ts-header .content-offset {
      padding-top: 72px;
    }

    @media (min-width: 768px) {
      .ts-header .content-offset {
        padding-top: 112px;
      }
    }
  </style>

  <!-- ===== СТИЛИ ДЛЯ МОБИЛЬНОЙ АДАПТАЦИИ ===== -->
  <style>
    @media (max-width: 480px) {

      /* Скрываем текст "Авиабилеты" в табе, оставляем только иконку */
      .tab-text {
        display: none;
      }

      /* Форма на мобилках — колонка */
      .flight-form-row {
        flex-direction: column !important;
        gap: 8px !important;
      }

      /* Все поля — 100% ширины */
      .flight-form-row .flex-1,
      .flight-form-row .min-w-0 {
        width: 100% !important;
        flex: 1 1 100% !important;
        min-width: 0 !important;
      }

      /* Кнопка "Найти" — на всю ширину */
      .flight-search-btn {
        width: 100% !important;
        justify-content: center !important;
      }

      /* Даты, пассажиры, класс — каждый на отдельной строке */
      .flight-form-extra {
        flex-direction: column !important;
        gap: 8px !important;
      }

      .flight-form-extra>* {
        width: 100% !important;
        flex: 1 1 100% !important;
      }

      /* Отступы внутри формы */
      .flight-form-container {
        padding-left: 12px !important;
        padding-right: 12px !important;
      }

      /* Переключатель "Туда — сюда" на мобилках */
      .trip-type-toggle {
        flex-wrap: wrap !important;
        justify-content: center !important;
      }
    }
  </style>

  [:embed_script:]
  [:cookie_policy_script:]
</head>

<body>
  <!-- ===== ВАША ШАПКА ===== -->
  <div class="ts-header">
    <header class="header">
      <div class="container">
        <div class="header-inner">
          <!-- ЛОГОТИП -->
          <a class="logo-link" href="https://ts-trip.com">
            <div class="logo-wrapper">
              <img src="https://i.postimg.cc/NFVWfk2D/logo.png" alt="TudaSuda" class="logo-img">
            </div>
          </a>

          <!-- ДЕСКТОПНОЕ МЕНЮ -->
          <nav class="nav-desktop">
            <a class="nav-link" href="https://ts-trip.com">Главная</a>
            <a class="nav-link" href="https://ts-trip.com/routes">Маршруты</a>
            <a class="nav-link" href="https://ts-trip.com/reference">Справочная</a>
            <a class="nav-link" href="https://ts-trip.com/blog">Блог</a>
            <a class="nav-link" href="https://ts-trip.com/guide">Путеводитель</a>
          </nav>

          <!-- ПРАВАЯ ЧАСТЬ -->
          <div style="display:flex; align-items:center; gap:8px; flex-shrink:0;">
            <a class="login-btn" href="https://ts-trip.com/login">Войти</a>
            <button class="menu-btn" type="button" aria-label="Меню">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="4" x2="20" y1="12" y2="12"></line>
                <line x1="4" x2="20" y1="6" y2="6"></line>
                <line x1="4" x2="20" y1="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>

        <!-- МОБИЛЬНОЕ МЕНЮ -->
        <nav class="nav-mobile">
          <a href="https://ts-trip.com">Главная</a>
          <a href="https://ts-trip.com/routes">Маршруты</a>
          <a href="https://ts-trip.com/reference">Справочная</a>
          <a href="https://ts-trip.com/blog">Блог</a>
          <a href="https://ts-trip.com/guide">Путеводитель</a>
        </nav>
      </div>
    </header>
    <div class="content-offset"></div>
  </div>
  <!-- ===== КОНЕЦ ВАШЕЙ ШАПКИ ===== -->

  <!-- ===== КОД TRAVELPAYOUTS ===== -->
  <header class="tpwl-logo-header">
    <div class="tpwl-logo__wrapper">
      <div class="tpwl-logo__logo"></div>
      Поиск дешёвых авиабилетов
    </div>
    <div class="tpwl-search__wrapper">
      <div class="tpwl__content">
        <h1>Ваше путешествие начинается здесь</h1>
      </div>
    </div>
  </header>

  <header class="tpwl-search-header">
    <div class="tpwl-search__wrapper">
      <div class="tpwl__content">
        <div id="tpwl-search"></div>
      </div>
    </div>
  </header>

  <main class="tpwl-main">
    <div class="tpwl-tickets__wrapper">
      <div class="tpwl__content">
        <div id="tpwl-tickets"></div>
      </div>
    </div>
    <div class="tpwl-widgets__wrapper">
      <div class="tpwl__content">
        <h3>Популярные направления перелётов</h3>
        <div id="tpwl-widget-weedles" class="tpwl-widget-weedles">
          <div class="tpwl-widget-weedle" data-destination="IST" is="weedle"></div>
          <div class="tpwl-widget-weedle" data-destination="DXB" is="weedle"></div>
          <div class="tpwl-widget-weedle" data-destination="MOW" is="weedle"></div>
          <div class="tpwl-widget-weedle" data-destination="LAS" is="weedle"></div>
          <div class="tpwl-widget-weedle" data-destination="NYC" is="weedle"></div>
          <div class="tpwl-widget-weedle" data-destination="LON" is="weedle"></div>
        </div>
      </div>
    </div>
  </main>

  <footer class="tpwl-footer__wrapper">
    <div class="tpwl__content">
      <div class="tpwl-footer__copyright">Travelpayouts © 2008−[:current_year:]</div>
      <div class="tpwl-footer__links">
        <a href="#" target="_blank">Условия обслуживания</a>
        <a href="#" target="_blank">Политика конфиденциальности</a>
        <a href="#" target="_blank">Политика cookie</a>
      </div>
    </div>
  </footer>

  <div class="tpwl-cookie-banner" id="tpwl-cookie-banner">
    <div class="tpwl-cookie-banner__logo"></div>
    <div class="tpwl-cookie-banner__text">Мы используем cookie, чтобы запоминать вашу историю поиска и выбранные
      фильтры. Продолжая пользоваться сайтом, вы соглашаетесь на их использование.</div>
    <div class="tpwl-cookie-banner__actions">
      <button class="tpwl-cookie-banner__base-button tpwl-cookie-banner__accept" id="tpwl-accept-cookie-btn">Принять</button>
      <a class="tpwl-cookie-banner__base-button tpwl-cookie-banner__link" href="#" target="_blank">Политика cookie</a>
    </div>
  </div>

  <script>
    (function () {
      const container = document.getElementById('tpwl-widget-weedles');
      const weedleElements = container.querySelectorAll('div[is="weedle"]');
      weedleElements.forEach(element => {
        if (!TPWL_EXTRA) return;
        const destination = element.getAttribute('data-destination');
        const scriptElement = document.createElement('script');
        scriptElement.async = 1;
        scriptElement.src = `https://[:widget_domain:]/content?currency=${String(TPWL_EXTRA.currency).toLowerCase()}&trs=${TPWL_EXTRA.trs}&shmarker=${TPWL_EXTRA.marker}&destination=${destination}&target_host=${TPWL_EXTRA.domain}&locale=${TPWL_EXTRA.locale}&limit=6&powered_by=false&primary=%23${TPWL_EXTRA.link_color}&promo_id=4044&campaign_id=100`;
        element.appendChild(scriptElement);
      });
    })();
  </script>
</body>

</html>
