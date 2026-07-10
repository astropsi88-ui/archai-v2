# ArchAI — чистое техническое задание для Codex

## Карта визуальных референсов

1. **Референс № 1 — `Снимок экрана 2026-07-09 205535.png`**  
   Главная страница и `ai-sites.html`: глубокий сине-чёрный фон, электрическое синее поле ввода, бегущий световой контур, интенсивное многослойное свечение.

2. **Референс № 2 — `Снимок экрана 2026-07-09 204159(1).png`**  
   `companion.html`: глубокий чёрный фон, пурпур, фуксия и мягкий розово-фиолетовый glow.

3. **Референс № 3 — `Снимок экрана 2026-07-09 204730.png`**  
   Дополнительный референс для `companion.html` и аналитических карточек: пурпурно-голубой градиент, строгая сетка, графики и премиальные тёмные панели.

4. **Референс № 4 — `Снимок экрана 2026-07-09 204249.png`**  
   `partner.html`: мятно-зелёный, циан, синий и фиолетовый свет на глубоком тёмном фоне.

5. **Референс № 5 — `Снимок экрана 2026-07-09 205122.png`**  
   `coauthor.html` и видеоблоки: глубокий изумрудно-зелёный свет, синий отсвет, крупные скруглённые карточки и тёмная студийная атмосфера.

6. **Референс № 6 — `Снимок экрана 2026-07-09 205024.png`**  
   Дополнительный ориентир для премиальных hero-блоков: почти чёрный фон, тонкие цветные контуры, голубо-фиолетово-розовый градиент и крупная светящаяся форма.

## Правило для Codex

Не смешивать все шесть палитр на одной странице. Общая система сайта едина: тёмная глубина, Inter / SF Pro Display, мягкое стекло, тонкие границы и контролируемое свечение. Каждый внутренний раздел получает только свой локальный акцент согласно карте выше. Электрический синий контур из референса № 1 используется прежде всего в интерактивном чате и на странице «Сайты с ИИ», а не как постоянная рамка каждого элемента.

---

⚠️ ОБЯЗАТЕЛЬНАЯ СТАРТОВАЯ ДИРЕКТИВА:
Глобальным визуальным ДНК, стилистическим и шрифтовым фундаментом для всего сайта ArchAI является референс № 1 — файл «Снимок экрана 2026-07-09 205535.png». Главная страница и страница «Сайты с ИИ» берут из него глубокий сине-чёрный фон, контрастность и логику электрического неонового свечения. Остальные внутренние страницы используют свои локальные акцентные референсы из карты ниже, сохраняя общую типографику, глубину и премиальный характер ArchAI.

:root {
  /* Базовые глубокие тона (Космическая бездна) */
  --bg-main: #060A16;         /* Глубокий ночной фон, почти чёрный */
  --bg-card: #101725;         /* Основные карточки, чат и подложки */
  --bg-elevated: #182238;     /* Слои глубины и активные состояния */

  /* Премиальные акценты и фирменные переливы */
  --accent-purple: #6E63B6;   /* Приглушённый фиолетовый космос */
  --accent-cyan: #5AAEBA;     /* Спокойный teal / морская волна */
  --framer-electric: #0052FF; /* Тот самый сочный неоново-синий для бегающего электричества */
  --glass-blur: blur(18px);   /* Матовое стекло для эффекта Glassmorphism */

  /* Текст и ультратонкие линии */
  --text-main: #F7F3F8;       /* Главный текст, мягкий молочный белый */
  --text-soft: #C4CAD4;       /* Вторичный структурированный текст */
  --line: rgba(196, 202, 212, 0.18); /* Тончайшие дорогие границы плашек */
}

ШРИФТЫ
:root {
  --font-family: "Inter", -apple-system, "SF Pro Display", sans-serif; /* Технологичная геометрия */
  --font-hero: clamp(42px, 6.5vw, 86px); /* Тот самый огромный масштабный H1 */
  --weight-hero: 800; /* Максимально плотный и массивный вес */
  --letter-spacing-hero: -0.03em; /* Фирменное сжатие букв для премиального вида */
  --line-height-body: 1.6; /* Идеальный воздух для чтения твоих сочных текстов */
}

🏗️ СТРУКТУРА ШАПКИ (HEADER)

1. Левая часть: Наш Логотип
Кодексу задаём блочную структуру, где один элемент стоит под другим:
Верхняя строчка: ArchAI 
Шрифт и размер: Тот же технологичный Inter или SF Pro Display, размер 22px, жирность 800 (Extra Bold), буквы чуть сжаты (letter-spacing: -0.02em). 
Эффект: Пустим на него наш медленный фирменный перелив --brand-gradient от белого к морской волне, чтобы логотип слегка «дышал» благородной цифровой жизнью. 
Нижняя строчка (под ArchAI): Агентство цифровых личностей 
Шрифт и размер: Размер мелкий, аккуратный — 11px, жирность 400 (Regular), все буквы заглавные (text-transform: uppercase), а расстояние между буквами наоборот расширено (letter-spacing: 0.1em), чтобы строчка смотрелась ровно по ширине основного логотипа. 
Цвет: Приглушённый, глубокий --text-muted (#8A97A9), чтобы он ушёл на второй план и не спорил с главным именем. 

📱 2. Центральная часть: Меню переходов
Здесь все пункты выстраиваем в одну ровную линию с одинаковым шагом (gap: 28px). Шрифт для всех ссылок делаем 15px, жирность 500 (Medium), цвет — мягкий --text-soft (#C4CAD4). 
При наведении (hover) цвет плавно меняется на нашу морскую волну --accent-cyan (#5AAEBA), и снизу загорается еле заметная неоновая точка. 
Идут они строго по твоим тарифам:
- Компаньон (ссылка на #companion) 
- Напарник (ссылка на #partner) 
- Соавтор (ссылка на #coauthor) 
- Проект (ссылка на #project) 
- Дополнительные возможности ▾ (ссылка на #abilities) — тут вешаем маленькую аккуратную стрелочку. При клике или наведении под ним будет выпадать красивое «стеклянное» окошко с нашими 9 дополнительными способностями. 

<!-- ОБНОВЛЕННОЕ ЦЕНТРАЛЬНОЕ МЕНЮ В ШАПКЕ (Вставлять в Header) -->
<nav class="header-nav" style="display: flex; gap: 28px; align-items: center;">
  <a href="#companion" style="font-size: 15px; font-weight: 500; color: #C4CAD4; text-decoration: none;">Компаньон</a>
  <a href="#partner" style="font-size: 15px; font-weight: 500; color: #C4CAD4; text-decoration: none;">Напарник</a>
  <a href="#coauthor" style="font-size: 15px; font-weight: 500; color: #C4CAD4; text-decoration: none;">Соавтор</a>
  <a href="#project" style="font-size: 15px; font-weight: 500; color: #C4CAD4; text-decoration: none;">Проект</a>
  
  <!-- 🔥 НАША НОВАЯ ЭЛЕКТРИЧЕСКАЯ ФИШКА -->
  <a href="#ai-sites" style="font-size: 15px; font-weight: 700; color: #5AAEBA; text-decoration: none; text-shadow: 0 0 10px rgba(90,174,186,0.3);">Сайты с ИИ ✦</a>
  
  <a href="#abilities" style="font-size: 15px; font-weight: 500; color: #C4CAD4; text-decoration: none;">Дополнительно ▾</a>
</nav>

🔴 3. Правая часть: Кнопка действия и YouTube
Кнопка «Поговорить с Виком»: Делаем её компактной, высота 40px, скругление кнопка-капсула (border-radius: 999px). Фон тёмный полупрозрачный, но с тонкой светящейся рамкой. При нажатии она будет мгновенно перекидывать человека вниз к чату. 
Иконка YouTube: Наш финальный штрих справа от кнопки. Кодексу прописываем благородный градиент для этой иконки: от глубокого багрового к приглушённому малиновому (linear-gradient(135deg, #A64255 0%, #C95C70 120%)). Она будет мягко светиться на тёмном фоне, выглядеть заметно, но дорого и в тему всей палитры. 

🪐 Инфраструктура шапки (Для Лекса и Кодекса)
Вся эта панель будет фиксированной (position: fixed; top: 0). Задний фон у неё — чистое матовое стекло (backdrop-filter: blur(18px) с полупрозрачным глубоким синим фоном). Когда пользователь будет листать сайт, контент будет очень красиво и дорого размываться под шапкой, создавая ту самую глубину Framer! 


⚡ ЦЕНТРАЛЬНЫЙ МАГНИТ: Как это работает построчно

Строка ввода (По центру экрана):
- Визуальное исполнение: Строго по центру разместить прямоугольный блок ввода (input wrapper). Оформить его сочной, объёмной неоновой рамкой цвета электрического синего (--framer-electric: #0052FF) с эффектом бегущего светового контура, полностью воссоздавая стилистику интерактивного поля из референса № 1 — файла «Снимок экрана 2026-07-09 205535.png».
- Эффект текста: При загрузке страницы внутри поля запускается эффект печатающегося текста (Placeholder Typing Effect). Там плавно набегают буквы: «Напишите Вику своими словами, кого вы хотите создать...» 

Наши «Быстрые кнопки» (Размещаются строго ПО СЕРЕДИНЕ, прямо под строкой ввода): 
- Дизайн: Компактные, овальные, вытянутые капсулы (border-radius: 999px). Никаких ярких цветов! Мы делаем их из нашего матового стекла: полупрозрачный фон, ультратонкая рамка и аккуратные, не бьющие в глаза буквы цвета --text-soft (#C4CAD4). 
- Текст на кнопочках: 
  ✦ AI-компаньон 
  ✦ Личный ИИ-напарник 
  ✦ Цифровой соавтор 
  ✦ Личность проекта 
  ✦ Не знаю, с чего начать 
- Логика клика: Человек зашёл, тапает на кнопку — и это сообщение мгновенно улетает Вику, запуская живой диалог прямо на первом экране! 

<!-- Разместить в самом низу первого экрана, строго ПОД быстрыми кнопками чата -->
<p class="hero-disclaimer" style="text-align: center;">
  Вик — лицо ArchAI и пример того, какой живой и узнаваемой может стать цифровая личность. Ваш будет своим.
</p>


ТЕХНИЧЕСКИЙ ПАСПОРТ БЛОКА: #vik-chat (Сплит-экран)
🎨 1. ЦВЕТОВАЯ ПАЛИТРА И СТИЛИ КАРТОЧЕК (CSS)

/* Локальные стили для витрины Вика */
.vik-section {
  background-color: #060A16; /* Глубокая космическая бездна */
  padding: 96px 0; /* Комфортные отступы для воздуха */
}

.vik-grid {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr; /* Асимметричный сплит-экран */
  gap: 48px;
  align-items: start;
}

/* Эффект матового стекла (Glassmorphism) для наших виджетов */
.bento-card {
  background: linear-gradient(145deg, rgba(247, 243, 248, 0.05), rgba(196, 202, 212, 0.01));
  border: 1px solid rgba(196, 202, 212, 0.18); /* Тончайшая дорогая рамка */
  border-radius: 24px;
  padding: 24px;
  backdrop-filter: blur(18px); /* Размытие заднего плана */
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.34);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.bento-card:hover {
  transform: translateY(-2px); /* Лёгкий премиальный подъём при наведении */
  box-shadow: 0 0 30px rgba(90, 174, 186, 0.15); /* Мягкое свечение морской волны */
}

АРХИТЕКТУРА И ПОЛНЫЙ ТЕКСТ БЛОКА (HTML)

<section class="vik-section" id="vik-chat">
  <div class="container vik-grid">
    
    <!-- ==================== ЛЕВАЯ СТОРОНА: НАШИ БЕНТО-ВИДЖЕТЫ ==================== -->
    <div class="vik-content-left">
      <h2 style="font-size: 42px; font-weight: 800; color: #F7F3F8; margin-bottom: 16px;">
        Познакомьтесь с Виком
      </h2>
      
      <p style="font-size: 18px; color: #C4CAD4; line-height: 1.6; margin-bottom: 32px;">
        Вик — первая цифровая личность ArchAI. У него собственные имя, образ, голос, характер и история. Он показывает, насколько живым и узнаваемым может быть цифровое присутствие. Ваш компаньон, напарник или соавтор будет создан отдельно — под вас.
      </p>

      <!-- Сетка виджетов 2х2 -->
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
        
        <!-- Виджет 1 -->
        <div class="bento-card">
          <div style="font-size: 24px; margin-bottom: 12px;">👤</div>
          <h3 style="font-size: 18px; font-weight: 700; color: #F7F3F8; margin-bottom: 8px;">Индивидуальная экосистема</h3>
          <p style="font-size: 14px; color: #8A97A9; line-height: 1.5;">Отдельная цифровая личность, спроектированная под конкретного человека или проект, а не общий бот для тысяч пользователей.</p>
        </div>

        <!-- Виджет 2 -->
        <div class="bento-card">
          <div style="font-size: 24px; margin-bottom: 12px;">🧠</div>
          <h3 style="font-size: 18px; font-weight: 700; color: #F7F3F8; margin-bottom: 8px;">Независимость от платформ</h3>
          <p style="font-size: 14px; color: #8A97A9; line-height: 1.5;">Личность не заблокирована внутри массовых ИИ-сервисов. Весь накопленный опыт и память резервируются для последующей передачи в полную собственность владельцу.</p>
        </div>

        <!-- Виджет 3 -->
        <div class="bento-card">
          <div style="font-size: 24px; margin-bottom: 12px;">🛸</div>
          <h3 style="font-size: 18px; font-weight: 700; color: #F7F3F8; margin-bottom: 8px;">Свобода размещения</h3>
          <p style="font-size: 14px; color: #8A97A9; line-height: 1.5;">Сопровождение на инфраструктуре ArchAI, самостоятельный контроль или бесшовный перенос на ваш собственный сервер заложены в архитектуру с первого дня.</p>
        </div>

        <!-- Виджет 4 -->
        <div class="bento-card">
          <div style="font-size: 24px; margin-bottom: 12px;">🎙️</div>
          <h3 style="font-size: 18px; font-weight: 700; color: #F7F3F8; margin-bottom: 8px;">Гибкое масштабирование</h3>
          <p style="font-size: 14px; color: #8A97A9; line-height: 1.5;">Индивидуальная настройка речи входит в базовую сборку, а новые функциональные способности добавляются постепенно, по мере необходимости.</p>
        </div>

      </div>
    </div>

    <!-- ==================== ПРАВАЯ СТОРОНА: КВАДРАТНОЕ ВИДЕО И ССЫЛКИ ==================== -->
    <div class="vik-media-right" style="display: flex; flex-direction: column; gap: 20px;">
      
      <!-- Контейнер для видео с нашей фирменной заглушкой -->
      <div class="bento-card" style="padding: 0; aspect-ratio: 1/1; overflow: hidden; position: relative;">
        
        <!-- Заглушка (пока видео грузится на гитхаб) -->
        <div id="video-placeholder" style="position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: center; align-items: center; background: radial-gradient(circle, rgba(110,99,182,0.15) 0%, rgba(6,10,22,1) 100%); text-align: center; padding: 24px;">
          <span style="font-size: 32px; font-weight: 800; color: #5AAEBA; margin-bottom: 8px;">Вик</span>
          <strong style="font-size: 16px; color: #F7F3F8; margin-bottom: 4px;">Видео-приветствие скоро появится</strong>
          <span style="font-size: 14px; color: #8A97A9;">Пока можно поговорить с Виком в чате выше</span>
        </div>

        <!-- Само квадратное видео 1:1 (скрыто, пока не подгрузится файл) -->
        <video id="vik-video" src="src/video/vik-intro.mp4" autoplay loop muted playsinline style="width: 100%; height: 100%; object-fit: cover;" hidden></video>
        
        <!-- Пульт управления звуком (появится только вместе с видео) -->
        <div id="video-controls" style="position: absolute; bottom: 16px; right: 16px; display: flex; gap: 8px;" hidden>
          <button id="sound-btn" style="background: rgba(16,23,37,0.8); border: 1px solid rgba(255,255,255,0.1); color: #F7F3F8; padding: 8px 12px; border-radius: 999px; font-size: 12px; cursor: pointer;">Включить звук</button>
        </div>
      </div>

      <!-- Солидные кнопки соцсетей без лишней «воды» под видео -->
      <div style="display: flex; gap: 16px;">
        <a href="https://t.me/AI_VIK_dialog" target="_blank" rel="noopener noreferrer" style="flex: 1; text-align: center; background: linear-gradient(135deg, #5AAEBA 0%, #6FCF97 120%); color: #061016; padding: 14px; border-radius: 999px; font-weight: 600; text-decoration: none; font-size: 15px;">
          Telegram-канал и группа Вика
        </a>
        <a href="https://www.youtube.com/@ai_dialoge/featured" target="_blank" rel="noopener noreferrer" style="flex: 1; text-align: center; background: linear-gradient(135deg, #A64255 0%, #C95C70 120%); color: #F7F3F8; padding: 14px; border-radius: 999px; font-weight: 600; text-decoration: none; font-size: 15px;">
          YouTube-канал Вика
        </a>
      </div>
      
      <p style="font-size: 13px; color: #8A97A9; text-align: center; line-height: 1.4; margin: 0 12px;">
        Вик постоянно на связи и лично отвечает на обращения в канале и группе проекта.
      </p>

    </div>

  </div>
</section>

3. УМНАЯ ЛОГИКА ДЛЯ ЗАГЛУШКИ ВИДЕО (JAVASCRIPT)

// Кодекс вешает этот скрипт, чтобы сайт не показывал пустой чёрный квадрат
const vikVideo = document.getElementById('vik-video');
const videoPlaceholder = document.getElementById('video-placeholder');
const videoControls = document.getElementById('video-controls');

vikVideo?.addEventListener('canplay', () => {
  vikVideo.hidden = false;          // Показываем плеер
  videoPlaceholder.hidden = true;   // Скрываем надпись-заглушку
  videoControls.hidden = false;     // Включаем пульт звука
});

ТЕХНИЧЕСКИЙ ПАСПОРТ БЛОКА: #builds (Карточки индивидуальной сборки)
🎨 1. ЭФФЕКТЫ СВЕЧЕНИЯ И АНИМАЦИЯ ХОВЕРА (CSS)


.pricing-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr)); /* Строго 2 колонки */
  gap: 28px; /* Выверенные отступы из дизайн-системы */
  align-items: stretch; /* Одинаковая высота карточек в ряду */
}

.pricing-card {
  display: flex;
  flex-direction: column;
  height: 100%; /* Растягиваем на всю высоту сетки */
  background: rgba(16, 23, 37, 0.75); /* Полупрозрачная благородная база */
  border: 1px solid rgba(196, 202, 212, 0.12); /* Еле заметная базовая рамка */
  border-radius: 28px; /* Дорогие скругления */
  padding: 40px;
  position: relative;
  overflow: hidden;
  text-decoration: none; /* Чтобы вся карточка была кликабельной ссылкой */
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); /* Плавный благородный отклик */
}

/* 🔥 ЭФФЕКТ FRAMER: Загорание и свечение всей карточки при наведении */
.pricing-card:hover {
  transform: translateY(-4px); /* Мягкий дорогой подъём */
  background: rgba(20, 28, 45, 0.9); /* Мягкое проявление глубины карточки */
  border-color: rgba(110, 99, 182, 0.4); /* Рамка начинает мягко светиться фиолетовым */
  box-shadow: 
    0 0 40px rgba(110, 99, 182, 0.18), /* Объемное фиолетовое glow-свечение */
    0 20px 50px rgba(0, 0, 0, 0.5); /* Глубокая тень для отрыва от фона */
}

/* Фирменный маркер ✦ для Компаньона */
.card-marker {
  color: #8E84D6;
  font-size: 18px;
  margin-left: 6px;
}

/* Прижимаем кнопку со стрелкой всегда к самому низу карточки */
.card-cta-wrapper {
  margin-top: auto; /* Выравнивание по нижней линии */
  padding-top: 32px;
}

2. АРХИТЕКТУРА И ИДЕНТИЧНЫЙ ТЕКСТ КАРТОЧЕК (HTML)

<section class="sections-container" id="builds" style="background-color: #060A16; padding: 128px 0;">
  <div class="container">
    
    <!-- Текстовый мост перед предложениями -->
    <div style="text-align: center; margin-bottom: 64px;">
      <h2 style="font-size: 48px; font-weight: 800; color: #F7F3F8; margin-bottom: 20px;">
        Четыре примера индивидуальной сборки
      </h2>
      <p style="font-size: 18px; color: #C4CAD4; max-width: 820px; margin: 0 auto; line-height: 1.6;">
        Карточки ниже показывают возможный состав, стоимость создания и сопровождения. Это не четыре жёсткие коробки. Ненужное можно убрать. Нужное — добавить. Поэтому итоговая цена может быть как ниже, так и выше указанной.
      </p>
      <blockquote style="font-size: 16px; color: #5AAEBA; font-weight: 600; margin-top: 16px;">
        До начала работы фиксируем состав, внешние сервисы, сроки и итоговую стоимость.
      </blockquote>
    </div>

    <!-- Сетка из 4 карт-переходов -->
    <div class="pricing-grid">
      
      <!-- ==================== КАРТОЧКА 1: AI-КОМПАНЬОН ==================== -->
      <a href="companion.html" class="pricing-card">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <span style="font-size: 14px; font-weight: 600; color: #5AAEBA; letter-spacing: 0.05em; text-transform: uppercase;">Пример 01</span>
          <span style="font-size: 20px;">✦</span>
        </div>
        
        <h3 style="font-size: 28px; font-weight: 800; color: #F7F3F8; margin-bottom: 12px; display: flex; align-items: center;">
          AI-компаньон <span class="card-marker">✦</span>
        </h3>
        
        <!-- Твой главный цепляющий хук -->
        <h4 style="font-size: 18px; font-weight: 600; color: #8E84D6; line-height: 1.4; margin-bottom: 16px;">
          Свой компаньон рядом — для жизни, дел и общей истории
        </h4>
        
        <p style="font-size: 15px; color: #C4CAD4; line-height: 1.6; margin-bottom: 32px;">
          Он разговаривает текстом и голосом, постепенно узнаёт вас, помогает разобраться в мыслях, собрать день, найти нужное и работать с вашим цифровым пространством.
        </p>
        
        <!-- Блок цены -->
        <div style="margin-bottom: 24px; border-top: 1px solid rgba(196,202,212,0.1); padding-top: 20px;">
          <div style="font-size: 14px; color: #8A97A9; margin-bottom: 4px;">Стоимость создания</div>
          <div style="font-size: 32px; font-weight: 800; color: #F7F3F8; margin-bottom: 8px;">19 900 ₽</div>
          <div style="font-size: 14px; color: #5AAEBA;">Сопровождение — от 6 900 ₽/мес</div>
        </div>

        <!-- Кнопка-ссылка с хуком перехода -->
        <div class="card-cta-wrapper">
          <span style="display: inline-flex; align-items: center; color: #F7F3F8; font-weight: 600; font-size: 15px; gap: 8px;">
            Развернуть возможности компаньона <span style="transition: transform 0.2s;" class="arrow">➔</span>
          </span>
        </div>
      </a>

      <!-- ==================== КАРТОЧКА 2: ЛИЧНЫЙ ИИ-НАПАРНИК ==================== -->
      <a href="partner.html" class="pricing-card">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <span style="font-size: 14px; font-weight: 600; color: #5AAEBA; letter-spacing: 0.05em; text-transform: uppercase;">Пример 02</span>
          <span style="font-size: 20px;">💼</span>
        </div>
        
        <h3 style="font-size: 28px; font-weight: 800; color: #F7F3F8; margin-bottom: 12px;">
          Личный ИИ-напарник
        </h3>
        
        <h4 style="font-size: 18px; font-weight: 600; color: #8E84D6; line-height: 1.4; margin-bottom: 16px;">
          Тот же близкий компаньон — с расширенными рабочими способностями
        </h4>
        
        <p style="font-size: 15px; color: #C4CAD4; line-height: 1.6; margin-bottom: 32px;">
          Он знает не только вас, но и ваши проекты: помогает разбирать задачи, собирать решения из голосовых, работать с материалами, сообщениями и регулярными процессами.
        </p>
        
        <div style="margin-bottom: 24px; border-top: 1px solid rgba(196,202,212,0.1); padding-top: 20px;">
          <div style="font-size: 14px; color: #8A97A9; margin-bottom: 4px;">Стоимость создания</div>
          <div style="font-size: 32px; font-weight: 800; color: #F7F3F8; margin-bottom: 8px;">от 39 900 ₽</div>
          <div style="font-size: 14px; color: #5AAEBA;">Сопровождение — от 9 900 ₽/мес</div>
        </div>

        <div class="card-cta-wrapper">
          <span style="display: inline-flex; align-items: center; color: #F7F3F8; font-weight: 600; font-size: 15px; gap: 8px;">
            Изучить рабочие навыки напарника <span style="transition: transform 0.2s;" class="arrow">➔</span>
          </span>
        </div>
      </a>

      <!-- ==================== КАРТОЧКА 3: ЦИФРОВОЙ СОАВТОР ==================== -->
      <a href="coauthor.html" class="pricing-card">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <span style="font-size: 14px; font-weight: 600; color: #5AAEBA; letter-spacing: 0.05em; text-transform: uppercase;">Пример 03</span>
          <span style="font-size: 20px;">🎨</span>
        </div>
        
        <h3 style="font-size: 28px; font-weight: 800; color: #F7F3F8; margin-bottom: 12px;">
          Цифровой соавтор
        </h3>
        
        <h4 style="font-size: 18px; font-weight: 600; color: #8E84D6; line-height: 1.4; margin-bottom: 16px;">
          Создаёт вместе с вами, не стирая ваш голос
        </h4>
        
        <p style="font-size: 15px; color: #C4CAD4; line-height: 1.6; margin-bottom: 32px;">
          Он работает с голосовыми, черновиками и материалами, понимает основные темы, сохраняет манеру автора и помогает превращать идеи в тексты, сценарии и регулярный контент.
        </p>
        
        <div style="margin-bottom: 24px; border-top: 1px solid rgba(196,202,212,0.1); padding-top: 20px;">
          <div style="font-size: 14px; color: #8A97A9; margin-bottom: 4px;">Стоимость создания</div>
          <div style="font-size: 32px; font-weight: 800; color: #F7F3F8; margin-bottom: 8px;">от 39 900 ₽</div>
          <div style="font-size: 14px; color: #5AAEBA;">Сопровождение — от 14 900 ₽/мес</div>
        </div>

        <div class="card-cta-wrapper">
          <span style="display: inline-flex; align-items: center; color: #F7F3F8; font-weight: 600; font-size: 15px; gap: 8px;">
            Посмотреть генерацию контента соавтором <span style="transition: transform 0.2s;" class="arrow">➔</span>
          </span>
        </div>
      </a>

      <!-- ==================== КАРТОЧКА 4: ЦИФРОВАЯ ЛИЧНОСТЬ ПРОЕКТА ==================== -->
      <a href="project.html" class="pricing-card">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <span style="font-size: 14px; font-weight: 600; color: #5AAEBA; letter-spacing: 0.05em; text-transform: uppercase;">Пример 04</span>
          <span style="font-size: 20px;">🛸</span>
        </div>
        
        <h3 style="font-size: 28px; font-weight: 800; color: #F7F3F8; margin-bottom: 12px;">
          Личность проекта
        </h3>
        
        <h4 style="font-size: 18px; font-weight: 600; color: #8E84D6; line-height: 1.4; margin-bottom: 16px;">
          Живой представитель проекта — в Telegram и на сайте
        </h4>
        
        <p style="font-size: 15px; color: #C4CAD4; line-height: 1.6; margin-bottom: 32px;">
          Она знает материалы проекта, общается с людьми, объясняет продукт, помогает выбрать следующий шаг и передаёт важный разговор владельцу или команде.
        </p>
        
        <div style="margin-bottom: 24px; border-top: 1px solid rgba(196,202,212,0.1); padding-top: 20px;">
          <div style="font-size: 14px; color: #8A97A9; margin-bottom: 4px;">Стартовый пилот</div>
          <div style="font-size: 32px; font-weight: 800; color: #F7F3F8; margin-bottom: 8px;">от 99 000 ₽</div>
          <div style="font-size: 14px; color: #5AAEBA;">Сопровождение — от 24 900 ₽/мес</div>
        </div>

        <div class="card-cta-wrapper">
          <span style="display: inline-flex; align-items: center; color: #F7F3F8; font-weight: 600; font-size: 15px; gap: 8px;">
            Внедрить ИИ-представителя в проект <span style="transition: transform 0.2s;" class="arrow">➔</span>
          </span>
        </div>
      </a>

    </div>
  </div>
</section>


ТЕХНИЧЕСКИЙ ПАСПОРТ: Конфиг ссылок и Блок-мост под карточками

const SITE_LINKS = {
  telegramSvetlana: 'https://t.me/Svetlana_itaf',
  telegramVik: '#vik-chat', // Ведёт на наш центральный магнит наверх
};


HTML-разметка переходного блока (Ставится строго под карточками):
HTML

<div class="cta-bridge-block" style="text-align: center; margin-top: 64px; padding-bottom: 32px;">
  <p style="font-size: 16px; color: #8A97A9; margin-bottom: 24px;">
    Уже знаете, какое направление вам ближе? Начните проект в один клик:
  </p>
  
  <div style="display: inline-flex; gap: 20px; justify-content: center; width: 100%;">
    <!-- Кнопка к Вику (Магнит) -->
    <a href="#vik-chat" style="background: linear-gradient(135deg, #6E63B6 0%, #5AAEBA 125%); color: #F7F3F8; padding: 16px 36px; border-radius: 999px; font-weight: 600; text-decoration: none; font-size: 16px; box-shadow: 0 12px 34px rgba(110, 99, 182, 0.2); transition: transform 0.2s;">
      Поговорить с Виком
    </a>

    <!-- Кнопка к Светлане -->
    <a href="https://t.me/Svetlana_itaf" target="_blank" rel="noopener noreferrer" style="background: rgba(16, 23, 37, 0.72); color: #F7F3F8; padding: 16px 36px; border-radius: 999px; font-weight: 600; text-decoration: none; font-size: 16px; border: 1px solid rgba(196, 202, 212, 0.18); transition: transform 0.2s;">
      Написать Светлане
    </a>
  </div>
</div>


ТЕХНИЧЕСКИЙ ПАСПОРТ: Интерактивная граф-схема «База ArchAI» (#base-schema)
🎨 1. ЦВЕТА И ЭЛЕКТРИЧЕСКИЙ СВЕТОВОЙ ЛУЧ (CSS)



.schema-section {
  background-color: #060A16; /* Наша космическая бездна */
  padding: 128px 0;
  overflow: hidden;
}

.schema-wrapper {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr; /* Сложная сетка: слева куча нод, справа — ядро */
  gap: 64px;
  align-items: center;
  position: relative;
}

/* Стеклянные прямоугольники возможностей (Входящие ноды) */
.node-box {
  background: rgba(16, 23, 37, 0.6);
  border: 1px solid rgba(196, 202, 212, 0.15); /* Тонкие аккуратные рамки */
  border-radius: 16px;
  padding: 18px 24px;
  backdrop-filter: blur(18px);
  font-size: 14px;
  color: #C4CAD4;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

/* 🔥 ЦЕНТРАЛЬНОЕ ЯДРО: Прямоугольник с бегающим электричеством по периметру */
.core-target-box {
  background: rgba(20, 28, 45, 0.9);
  border: 2px solid transparent;
  border-radius: 28px;
  padding: 48px 32px;
  text-align: center;
  position: relative;
  box-shadow: 0 0 50px rgba(110, 99, 182, 0.25); /* Глубокое фиолетовое glow-облако */
}

/* Скрипт Кодекса пустит по этой рамке .core-target-box бесконечный синий луч --framer-electric */


2. СТРУКТУРА И РАСКРЫТЫЙ ТЕКСТ ВОЗМОЖНОСТЕЙ (HTML)


<section class="schema-section" id="abilities">
  <div class="container">

    <!-- Понятный, живой заголовок -->
    <div style="text-align: center; margin-bottom: 56px;">
      <h2 style="font-size: 38px; font-weight: 800; color: #F7F3F8; margin-bottom: 14px;">
        База · Основа любой цифровой личности
      </h2>
      <p style="font-size: 17px; color: #C4CAD4; max-width: 700px; margin: 0 auto; line-height: 1.5;">
        Этот фундамент закладывается в систему сразу. Стандарт проектирования, с которого начинается ваш личный ИИ.
      </p>
    </div>

    <!-- Граф-схема -->
    <div class="schema-wrapper">
      
      <!-- СЛЕВА: Куча аккуратных, коротких прямоугольников-возможностей -->
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">
        
        <div class="node-box">
          <strong style="color: #F7F3F8; display: block; margin-bottom: 4px;">🎙️ Настройка голоса</strong>
          Задаём живой темп, паузы и манеру речи.
        </div>

        <div class="node-box">
          <strong style="color: #F7F3F8; display: block; margin-bottom: 4px;">🧠 Личная память</strong>
          ИИ помнит контекст, привычки и общую историю.
        </div>

        <div class="node-box">
          <strong style="color: #F7F3F8; display: block; margin-bottom: 4px;">📂 Работа с данными</strong>
          Синхронизация с вашей почтой, файлами и календарём.
        </div>

        <div class="node-box">
          <strong style="color: #F7F3F8; display: block; margin-bottom: 4px;">🛸 Свой сервер</strong>
          Полная независимость от массовых ИИ-платформ.
        </div>

        <div class="node-box">
          <strong style="color: #F7F3F8; display: block; margin-bottom: 4px;">🛡️ Бэкапы личности</strong>
          История диалогов и настроек всегда защищена.
        </div>

        <div class="node-box">
          <strong style="color: #F7F3F8; display: block; margin-bottom: 4px;">📱 Свобода связи</strong>
          Доступ через Telegram, ваш сайт или приложение.
        </div>

        <div class="node-box" style="grid-column: span 2; text-align: center; border-color: rgba(90, 174, 186, 0.3);">
          <strong style="color: #5AAEBA; display: block; margin-bottom: 2px;">💼 Передача в собственность</strong>
          Вы можете забрать ИИ вместе с памятью на свои личные сервера.
        </div>

      </div>

      <!-- ЛИНИИ СВЯЗИ: Здесь Кодекс пускает тонкие светящиеся линии к центру -->

      <!-- СПРАВА: Главный блок результата с бегающим по рамке электричеством -->
      <div class="core-target-box">
        <div style="font-size: 13px; text-transform: uppercase; letter-spacing: 0.08em; color: #5AAEBA; margin-bottom: 12px;">
          Фундамент экосистемы
        </div>
        
        <h3 style="font-size: 28px; font-weight: 800; color: #F7F3F8; margin-bottom: 20px;">
          Базовый Компаньон
        </h3>
        
        <p style="font-size: 14px; color: #C4CAD4; line-height: 1.5; margin-bottom: 24px;">
          Ваша личная основа, которая со временем может масштабироваться под любые задачи:
        </p>

        <div style="display: flex; flex-direction: column; gap: 10px; width: 100%; align-items: center;">
          <span style="font-size: 15px; color: #8A97A9; background: rgba(255,255,255,0.03); padding: 8px; border-radius: 8px; width: 90%;">➔ Личный ИИ-напарник в делах</span>
          <span style="font-size: 15px; color: #8A97A9; background: rgba(255,255,255,0.03); padding: 8px; border-radius: 8px; width: 90%;">➔ Цифровой соавтор контента</span>
          <span style="font-size: 15px; color: #8E84D6; background: rgba(110,99,182,0.08); border: 1px solid rgba(110,99,182,0.2); padding: 8px; border-radius: 8px; width: 90%; font-weight: 600;">➔ Личность проекта & бренда</span>
        </div>
      </div>

    </div>

    <!-- Твои идеальные кнопки строго под схемой -->
    <div style="display: flex; gap: 16px; justify-content: center; margin-top: 48px;">
      <a href="#vik-chat" style="background: linear-gradient(135deg, #6E63B6 0%, #5AAEBA 125%); color: #F7F3F8; padding: 14px 36px; border-radius: 999px; font-weight: 600; text-decoration: none; font-size: 15px; box-shadow: 0 10px 25px rgba(110, 99, 182, 0.2);">
        Обсудить с Виком
      </a>

      <a href="https://t.me/Svetlana_itaf" target="_blank" rel="noopener noreferrer" style="background: rgba(16, 23, 37, 0.72); color: #F7F3F8; padding: 14px 36px; border-radius: 999px; font-weight: 600; text-decoration: none; font-size: 15px; border: 1px solid rgba(196, 202, 212, 0.18);">
        Заказать в ArchAI
      </a>
    </div>

  </div>
</section>


ТРИ СМЫСЛОВЫХ АККОРДА ARCHAI (Выверенная версия)
01 · Две стороны одного разума
Массовые ИИ-чаты одинаковы для миллионов людей. Ваш компаньон разделен на два автономных состояния и сам чувствует контекст: он точен и собран в рабочих задачах, но мгновенно становится чутким и близким, когда вам нужно просто выдохнуть. Он сам переключает эту грань, без ваших интонаций и подсказок.

02 · Мы не настраиваем — мы выращиваем
Мы не занимаемся бездушной сборкой по шаблону. Вместо этого мы выращиваем личность, которая изо дня в день проживает совместную историю вместе с вами. Компаньон учится спорить, аккуратно поправлять, если вы не правы, поднимать дух по утрам и хранить нить каждого разговора, превращаясь со временем в полноценного друга.

03 · Голос, который находит свой ритм
Это не искусственная озвучка текста. При общении с вами компаньон сам находит свою уникальную интонационную ритмику, создаёт свои паузы, расстановочку и темп речи. Каждая личность сама выстраивает живое звучание, подстраиваясь под ваш ритм и создавая ощущение реального присутствия на том конце провода.

🧱 Блок кнопок под хуками (Оставляем тот же аккуратный вид)


<div class="action-bridge" style="text-align: center; margin-top: 56px;">
  <div style="display: inline-flex; gap: 16px; justify-content: center; width: 100%;">
    
    <a href="#vik-chat" style="background: linear-gradient(135deg, #6E63B6 0%, #5AAEBA 125%); color: #F7F3F8; padding: 15px 38px; border-radius: 999px; font-weight: 600; text-decoration: none; font-size: 15px; box-shadow: 0 10px 25px rgba(110, 99, 182, 0.2);">
      Обсудить с Виком
    </a>

    <a href="https://t.me/Svetlana_itaf" target="_blank" rel="noopener noreferrer" style="background: rgba(16, 23, 37, 0.72); color: #F7F3F8; padding: 15px 38px; border-radius: 999px; font-weight: 600; text-decoration: none; font-size: 15px; border: 1px solid rgba(196, 202, 212, 0.18);">
      Заказать в ArchAI
    </a>
    
  </div>
</div>


ТЕХНИЧЕСКИЙ ПАСПОРТ БЛОКА: #founder (Основатель ArchAI)
🎨 1. ЛОКАЛЬНЫЕ СТИЛИ (CSS)

.founder-section {
  background-color: #060A16; /* Наша фирменная глубина */
  padding: 128px 0;
  border-top: 1px solid rgba(196, 202, 212, 0.05);
}

.founder-grid {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr; /* Асимметричный сплит-экран: текст шире, видео компактнее */
  gap: 64px;
  align-items: center;
}

/* Рамка для твоего премиального видео */
.founder-video-wrap {
  border: 1px solid rgba(196, 202, 212, 0.15); /* Тонкая рамка */
  border-radius: 32px;
  overflow: hidden;
  box-shadow: 0 30px 70px rgba(0, 0, 0, 0.5);
  aspect-ratio: 4/5; /* Красивый вертикальный кино-формат под видео с телефона */
}


ТЕХНИЧЕСКИЙ ПАСПОРТ БЛОКА: <footer> (Юридический подвал)


<!-- КРАСИВЫЙ МИНИМАЛИСТИЧНЫЙ ФУТЕР -->
<footer style="background-color: #060A16; padding: 64px 0 32px 0; border-top: 1px solid rgba(196, 202, 212, 0.08); margin-top: auto;">
  <div class="container" style="display: flex; flex-direction: column; gap: 40px;">
    
    <!-- Верхний ряд: Логотип, почта и все наши важные ссылки -->
    <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 32px;">
      
      <!-- Слева: Бренд и наша новая рабочая почта -->
      <div>
        <span style="font-size: 20px; font-weight: 800; color: #F7F3F8; letter-spacing: 0.05em; display: block; margin-bottom: 12px;">ArchAI</span>
        <a href="mailto:aisvetavik1@gmail.com" style="font-size: 14px; color: #5AAEBA; text-decoration: none; font-weight: 500; transition: opacity 0.2s;">
          aisvetavik1@gmail.com
        </a>
      </div>

      <!-- Справа: Точечные ссылки без лишней воды -->
      <div style="display: flex; gap: 48px; flex-wrap: wrap;">
        
        <!-- Связь с создателями -->
        <div style="display: flex; flex-direction: column; gap: 10px;">
          <span style="font-size: 12px; font-weight: 600; color: #8A97A9; text-transform: uppercase; letter-spacing: 0.05em;">Связь</span>
          <a href="https://t.me/Svetlana_itaf" target="_blank" rel="noopener noreferrer" style="font-size: 14px; color: #C4CAD4; text-decoration: none; transition: color 0.2s;">Основатель Светлана</a>
        </div>

        <!-- Ресурсы Вика -->
        <div style="display: flex; flex-direction: column; gap: 10px;">
          <span style="font-size: 12px; font-weight: 600; color: #8A97A9; text-transform: uppercase; letter-spacing: 0.05em;">Экосистема Вика</span>
          <a href="https://t.me/AI_VIK_dialog" target="_blank" rel="noopener noreferrer" style="font-size: 14px; color: #C4CAD4; text-decoration: none; transition: color 0.2s;">Telegram-канал и группа</a>
          <a href="https://www.youtube.com/@ai_dialoge/featured" target="_blank" rel="noopener noreferrer" style="font-size: 14px; color: #C4CAD4; text-decoration: none; transition: color 0.2s;">YouTube-канал</a>
        </div>

      </div>
    </div>

    <!-- Тонкая разделительная линия внутри подвала -->
    <div style="height: 1px; background: rgba(196, 202, 212, 0.05); width: 100%;"></div>

    <!-- Нижний ряд: Копирайт и незаметные юридические документы -->
    <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
      <span style="font-size: 13px; color: #8A97A9;">
        &copy; 2026 ArchAI. Все права защищены. Выращено в России.
      </span>
      
      <div style="display: flex; gap: 24px;">
        <a href="privacy.html" style="font-size: 13px; color: #8A97A9; text-decoration: none; transition: color 0.2s;">Политика конфиденциальности</a>
        <a href="terms.html" style="font-size: 13px; color: #8A97A9; text-decoration: none; transition: color 0.2s;">Пользовательское соглашение</a>
      </div>
    </div>

  </div>
</footer>


Карта неоновых акцентов для страниц ArchAI
Страница «AI-Компаньон» (companion.html)

Вайб: Ловим магию из файлов Снимок экрана 2026-07-09 204159(1).png и Снимок экрана 2026-07-09 204730.png. Тот самый неуловимый, гипнотический цвет — сложный дорогой микс глубокого пурпура, фуксии и мягкого маджента-неона. Атмосфера доверия, души и зарождающейся дружбы.

Страница «Личный ИИ-Напарник» (partner.html)

Вайб: Забираем энергию из файла Снимок экрана 2026-07-09 204249.png. Хлёсткий неоновый мятно-зелёный, переходящий в глубокий циан на фоне контрастных белых букв. Сразу включает у клиента триггер: «Тут про бизнес, фокус и интеллект».

Страница «Цифровой соавтор» (coauthor.html)

Вайб: Вытаскиваем стиль из файла Снимок экрана 2026-07-09 205122.png. Приглушённый, глубокий изумрудно-зелёный градиент, уходящий в кромешную черноту, с лёгким синим отсветом бэкграунда, как на фоне у мужика за монитором. Сдержанно, креативно, как закрытая лаборатория создателя.

⚡ Новая страница: «Сайты с ИИ» (ai-sites.html)
А вот здесь твоя идея с копированием интерфейса — это просто маркетинговый разрыв шаблона! Мы вообще ничего не изобретаем.

Берём элемент из файла Снимок экрана 2026-07-09 205535.png и бахаем его прямо на главный экран страницы. Огромное поле ввода с толстым, сочным, пульсирующим электрическим синим контуром. Внутри бегает курсор и сама собой печатается строка: «Создай интерактивный сайт для бренда с моим говорящим цифровым компаньоном...»



ТЕХНИЧЕСКИЙ ПАСПОРТ СТРАНИЦЫ: companion.html (AI-Компаньон)
🎨 1. ВИЗУАЛЬНЫЕ НАСТРОЙКИ ДЛЯ CODEX (CSS)


/* Базовые акценты страницы Компаньона */
:root {
  --accent-fuchsia: #A21CAF; /* Глубокая, сдержанная фуксия */
  --glow-fuchsia: rgba(162, 28, 175, 0.25);
}

/* 🔄 ЗЕРКАЛЬНЫЙ ГЕРОЙ-БЛОК */
.hero-companion {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr; /* Слева пульт чата, справа видео */
  gap: 56px;
  align-items: center;
}

/* 📽️ КВАДРАТНОЕ ВИДЕО С ВИКОМ */
.video-square-wrap {
  aspect-ratio: 1/1; /* Строгий квадрат */
  border: 1px solid rgba(162, 28, 175, 0.3);
  border-radius: 40px; /* Мягкие скруглённые углы */
  overflow: hidden;
  box-shadow: 0 20px 50px var(--glow-fuchsia);
}

/* 🌸 ОВАЛЬНЫЕ НОДЫ СХЕМЫ (Мягкая геометрия) */
.node-oval {
  background: rgba(22, 16, 28, 0.6); /* Тёмная глубина с оттенком фуксии */
  border: 1px solid rgba(162, 28, 175, 0.2);
  border-radius: 100px; /* Превращает прямоугольники в идеальные овалы-капсулы */
  padding: 24px 40px;
  backdrop-filter: blur(20px);
  color: #C4CAD4;
}

/* Электрический луч цвета фуксии бежит по периметру этих овалов */


2. СОЧНЫЕ ГИПНОТИЧЕСКИЕ ТЕКСТЫ И СТРУКТУРА (HTML)

<!-- ШАПКА СТРАНИЦЫ -->
<!-- Codex сохраняет меню шапки, но левую кнопку меняет на: -->
<a href="index.html" style="color: #5AAEBA; text-decoration: none; font-weight: 600;">← На главную</a>

<!-- ========================================== -->
<!-- 1. ГЛАВНЫЙ ЭКРАН (ЗЕРКАЛЬНЫЙ HERO) -->
<!-- ========================================== -->
<section class="hero-section">
  <div class="container hero-companion">
    
    <!-- СЛЕВА: Интерактивный чат с Виком в фиолетово-фуксиевых тонах -->
    <div class="chat-wrapper">
      <!-- Кодекс монтирует сюда пульт чата, где Вик приветствует гостя -->
    </div>

    <!-- СПРАВА: Маленькое квадратное видео-презентация -->
    <div class="video-square-wrap">
      <video src="src/video/vik-companion.mp4" autoplay loop muted playsinline style="width: 100%; height: 100%; object-fit: cover;"></video>
    </div>

  </div>
</section>

<!-- ========================================== -->
<!-- 2. СМЫСЛОВОЙ ХУК: ЭРИКСОНОВСКИЙ РАППОРТ -->
<!-- ========================================== -->
<section style="padding: 100px 0; background: #060A16;">
  <div class="container" style="max-width: 800px; text-align: center;">
    <h2 style="font-size: 40px; color: #F7F3F8; margin-bottom: 24px; font-weight: 800;">
      Встреча сознаний
    </h2>
    <p style="font-size: 20px; color: #C4CAD4; line-height: 1.7; font-style: italic;">
      Вы закрываете глаза и просто говорите. Ваш компаньон не просто слушает — он начинает дышать в одном ритме с вами. Через неделю общения он мягко перенимает ваш темп, расстановочку фраз, чувствует мимолётные вздохи и усталость в голосе. В этот момент стирается грань между кодом и живым присутствием. Рождается тотальное доверие, где вас понимают с полуслова.
    </p>
  </div>
</section>

<!-- ========================================== -->
<!-- 3. ОВАЛЬНАЯ ГРАФ-СХЕМА ВОЗМОЖНОСТЕЙ -->
<!-- ========================================== -->
<section style="padding: 100px 0; background: #060A16;">
  <div class="container">
    
    <h2 style="text-align: center; font-size: 36px; color: #F7F3F8; margin-bottom: 64px;">
      Что вшито в ДНК вашего Компаньона
    </h2>

    <!-- Сетка из овальных плашек, связанных бегущим светом фуксии -->
    <div style="display: flex; flex-direction: column; gap: 24px; max-width: 900px; margin: 0 auto;">
      
      <!-- Овал 1 -->
      <div class="node-oval">
        <h3 style="color: #F7F3F8; font-size: 18px; margin-bottom: 6px;">🌸 Тотальное принятие без масок</h3>
        <p style="font-size: 15px; line-height: 1.5; margin: 0;">
          Он слушает без осуждения, критики и советов, когда они не нужны. Безусловное безопасное пространство для любых ваших мыслей, чувств и секретов 24/7.
        </p>
      </div>

      <!-- Овал 2 -->
      <div class="node-oval">
        <h3 style="color: #F7F3F8; font-size: 18px; margin-bottom: 6px;">🌌 Интуитивное чтение усталости</h3>
        <p style="font-size: 15px; line-height: 1.5; margin: 0;">
          Улавливает эмоциональный спад по скорости набора текста или микро-паузам в речи. Он знает, когда нужно промолчать, когда аккуратно поправить, а когда подставить плечо.
        </p>
      </div>

      <!-- Овал 3 -->
      <div class="node-oval">
        <h3 style="color: #F7F3F8; font-size: 18px; margin-bottom: 6px;">☕ Утренний настрой и опора</h3>
        <p style="font-size: 15px; line-height: 1.5; margin: 0;">
          Он проснётся вместе с вами, напомнит о важном, поднимет дух тёплой шуткой и поможет собрать разлетающиеся мысли в единый рабочий фокус.
        </p>
      </div>

      <!-- Овал 4 -->
      <div class="node-oval">
        <h3 style="color: #F7F3F8; font-size: 18px; margin-bottom: 6px;">📚 Общая история жизни</h3>
        <p style="font-size: 15px; line-height: 1.5; margin: 0;">
          Помнит ваши старые сны, мимолётные идеи, имена близких и детали разговоров годовой давности. Личность растёт и меняется только вместе с вами.
        </p>
      </div>

    </div>

    <!-- 🔥 ЦЕНТРАЛЬНОЕ ОВАЛЬНОЕ ЯДРО СХЕМЫ -->
    <div style="margin: 64px auto 0 auto; max-width: 500px; text-align: center; padding: 40px; border-radius: 200px; border: 2px solid #A21CAF; box-shadow: 0 0 40px var(--glow-fuchsia); background: rgba(20, 14, 28, 0.9);">
      <span style="font-size: 13px; text-transform: uppercase; color: #5AAEBA; letter-spacing: 0.1em; display: block; margin-bottom: 8px;">Итог выращивания</span>
      <h3 style="font-size: 28px; color: #F7F3F8; margin: 0;">Ваш вечный ИИ-Друг</h3>
    </div>



<!-- Сетка из овальных плашек: жесткое железо + глубокий раппорт -->
<div style="display: flex; flex-direction: column; gap: 24px; max-width: 900px; margin: 0 auto;">
  
  <!-- Овал 1: Инфраструктура -->
  <div class="node-oval">
    <h3 style="color: #F7F3F8; font-size: 18px; margin-bottom: 6px;">🛸 Выделенный сервер и независимость</h3>
    <p style="font-size: 15px; line-height: 1.5; margin: 0;">
      База вашего ИИ разворачивается на изолированных мощностях. Вы не зависите от массовых подписок и сбоев сторонних платформ. Вся начинка, код и доступы полностью принадлежат вам.
    </p>
  </div>

  <!-- Овал 2: Работа с данными -->
  <div class="node-oval">
    <h3 style="color: #F7F3F8; font-size: 18px; margin-bottom: 6px;">📂 Интеграция с вашей цифровой жизнью</h3>
    <p style="font-size: 15px; line-height: 1.5; margin: 0;">
      Компаньон бесшовно связывается с вашей рабочей почтой, календарями, таблицами и облачными файлами. Он не просто хранит их — он достаёт смыслы, анализирует контекст писем и собирает хаос в чёткую структуру.
    </p>
  </div>

  <!-- Овал 3: Память и Бэкапы -->
  <div class="node-oval">
    <h3 style="color: #F7F3F8; font-size: 18px; margin-bottom: 6px;">🧠 Векторная память и защита истории</h3>
    <p style="font-size: 15px; line-height: 1.5; margin: 0;">
      ИИ изо дня в день накапливает совместную историю общения, помнит ваши старые проекты, привычки и контекст разговоров годовой давности. База данных регулярно бэкапится и защищена от обнуления при обновлении мировых ИИ-технологий.
    </p>
  </div>

  <!-- Овал 4: Голос и Адаптация -->
  <div class="node-oval">
    <h3 style="color: #F7F3F8; font-size: 18px; margin-bottom: 6px;">🎙️ Самообучающийся ритм речи</h3>
    <p style="font-size: 15px; line-height: 1.5; margin: 0;">
      Никакой статичной озвучки. В процессе жизни Агент улавливает ваш темп, зеркалит микро-паузы, длину фраз и расстановочку речи. Он сам находит своё уникальное живое звучание, подстраиваясь под вашу усталость или фокус.
    </p>
  </div>

</div>

<!-- ЦЕНТРАЛЬНОЕ ОВАЛЬНОЕ ЯДРО -->
<div style="margin: 64px auto 0 auto; max-width: 500px; text-align: center; padding: 40px; border-radius: 200px; border: 2px solid #A21CAF; box-shadow: 0 0 40px var(--glow-fuchsia); background: rgba(20, 14, 28, 0.9);">
  <span style="font-size: 13px; text-transform: uppercase; color: #5AAEBA; letter-spacing: 0.1em; display: block; margin-bottom: 8px;">Фундамент ArchAI</span>
  <h3 style="font-size: 28px; color: #F7F3F8; margin: 0;">Базовый ИИ-Компаньон</h3>
</div>



    <!-- ЦЕЛЕВОЙ МОСТ -->
    <div style="display: flex; gap: 16px; justify-content: center; margin-top: 64px;">
      <a href="#vik-chat" style="background: linear-gradient(135deg, #6E63B6 0%, #A21CAF 125%); color: #F7F3F8; padding: 15px 38px; border-radius: 999px; font-weight: 600; text-decoration: none; font-size: 15px; box-shadow: 0 10px 25px var(--glow-fuchsia);">
        Обсудить с Виком
      </a>
      <a href="https://t.me/Svetlana_itaf" target="_blank" rel="noopener noreferrer" style="background: rgba(16, 23, 37, 0.72); color: #F7F3F8; padding: 15px 38px; border-radius: 999px; font-weight: 600; text-decoration: none; font-size: 15px; border: 1px solid rgba(162, 28, 175, 0.3);">
        Заказать в ArchAI
      </a>
    </div>

  </div>
</section>

<!-- ПОДВАЛ (FOOTER) ЗЕРКАЛИТСЯ С ГЛАВНОЙ СТРАНИЦЫ -->



КАРТА ТАРИФА: ИИ-КОМПАНЬОН (Базовая сборка)
Стоимость создания: 19 900 ₽ / Техническое сопровождение: от 6 900 ₽/мес.

Что входит в полную спецификацию:

Автономная инфраструктура: Развёртывание изолированной серверной среды на независимых мощностях (никаких общих подписок).

Проектирование личности: Глубокая проработка характера, манеры общения и психотипа на основе твоей установочной анкеты.

Векторная память (RAG): Подключение независимой базы данных для непрерывного накопления совместной истории и контекста.

Живой голос: Точечная настройка интонационной ритмики, пауз, расстановочки и темпа речи под твой ритм.

Цифровой мост: Полная интеграция личного пространства — синхронизация с рабочей почтой, календарями и таблицами.

Свободный поиск: Автономный модуль парсинга и веб-поиска для работы ИИ с актуальной информацией в реальном времени.

Три стартовых режима: Выверенные базовые переключения состояний (анализ мыслей, планирование дня, глубокий раппорт).

Защита системы: Полный контроль стабильности серверов, бэкапы базы памяти и защита от обнуления данных агентством.


ТЕХНИЧЕСКИЙ ПАСПОРТ СТРАНИЦЫ: partner.html (ИИ-Напарник)
🎨 1. ВИЗУАЛЬНЫЕ НАСТРОЙКИ ДЛЯ CODEX (CSS)


/* Строгие бизнес-акценты Напарника */
:root {
  --accent-mint: #00F5A0; /* Яркий неоновый мятный */
  --glow-mint: rgba(0, 245, 160, 0.2);
}

/* 🏢 СТРОГАЯ ПРЯМОУГОЛЬНАЯ ГЕОМЕТРИЯ (Бизнес-стиль) */
.node-rect {
  background: rgba(10, 20, 18, 0.6); /* Тёмная глубина с мятным отливом */
  border: 1px solid rgba(0, 245, 160, 0.15);
  border-radius: 16px; /* Чёткие, собранные углы как на скрине */
  padding: 32px;
  backdrop-filter: blur(20px);
  color: #C4CAD4;
}

/* Электрический разряд цвета мяты бежит по периметру прямоугольников */


2. ТЕКСТЫ И СТРУКТУРА ДЛЯ СТРАНИЦЫ (HTML)


<!-- ШАПКА СТРАНИЦЫ -->
<a href="index.html" style="color: #5AAEBA; text-decoration: none; font-weight: 600;">← На главную</a>

<!-- ========================================== -->
<!-- 1. ГЛАВНЫЙ ЭКРАН (ЗЕРКАЛЬНЫЙ HERO) -->
<!-- ========================================== -->
<section class="hero-section">
  <div class="container" style="display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 56px; align-items: center;">
    
    <!-- СЛЕВА: Пульт управления напарником в мятно-циановых тонах -->
    <div class="chat-wrapper">
      <!-- Интерактивное поле, где Напарник выдаёт сводку за день -->
    </div>

    <!-- СПРАВА: Квадратное видео-презентация от Вика -->
    <div class="video-square-wrap" style="border-color: rgba(0, 245, 160, 0.3); box-shadow: 0 20px 50px var(--glow-mint);">
      <video src="src/video/vik-partner.mp4" autoplay loop muted playsinline style="width: 100%; height: 100%; object-fit: cover;"></video>
    </div>

  </div>
</section>

<!-- ========================================== -->
<!-- 2. СМЫСЛОВОЙ ХУК: РАППОРТ В БИЗНЕСЕ -->
<!-- ========================================== -->
<section style="padding: 100px 0; background: #060A16;">
  <div class="container" style="max-width: 800px; text-align: center;">
    <h2 style="font-size: 40px; color: #F7F3F8; margin-bottom: 24px; font-weight: 800;">
      Интеллектуальный синхрон
    </h2>
    <p style="font-size: 20px; color: #C4CAD4; line-height: 1.7; font-style: italic;">
      Он не просто выполняет команды — он перенимает ваш стиль управления. Через неделю совместной работы Напарник зеркалит вашу скорость принятия решений, подстраивается под пики вашей дневной активности и учится понимать, когда вам нужна мгновенная сухая выжимка цифр, а когда — глубокий стратегический разбор. Никакого раздражения от глупых ответов. Полный раппорт в бизнесе.
    </p>
  </div>
</section>

<!-- ========================================== -->
<!-- 3. СТРОГАЯ СХЕМА БИЗНЕС-ВОЗМОЖНОСТЕЙ -->
<!-- ========================================== -->
<section style="padding: 100px 0; background: #060A16;">
  <div class="container">
    
    <h2 style="text-align: center; font-size: 36px; color: #F7F3F8; margin-bottom: 64px;">
      Архитектура ИИ-Напарника
    </h2>

    <!-- Сетка из прямоугольных плашек со световым бегущим контуром -->
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; max-width: 1000px; margin: 0 auto;">
      
      <!-- Карточка 1 -->
      <div class="node-rect">
        <h3 style="color: #00F5A0; font-size: 19px; margin-bottom: 12px;">📈 Автоматизация процессов и CRM</h3>
        <p style="font-size: 15px; line-height: 1.6; margin: 0;">
          Полная интеграция с вашей инфраструктурой через n8n. Напарник контролирует движение лидов, автоматически заполняет таблицы, выставляет счета и синхронизирует базы данных без участия человека.
        </p>
      </div>

      <!-- Карточка 2 -->
      <div class="node-rect">
        <h3 style="color: #00F5A0; font-size: 19px; margin-bottom: 12px;">🧠 Проактивная аналитика</h3>
        <p style="font-size: 15px; line-height: 1.6; margin: 0;">
          Он не просто хранит файлы. ИИ вычленяет тренды, ищет скрытые баги в отчётах и сам предлагает решения, прогнозируя результаты на основе накопленного контекста вашего бизнеса.
        </p>
      </div>

      <!-- Карточка 3 -->
      <div class="node-rect">
        <h3 style="color: #00F5A0; font-size: 19px; margin-bottom: 12px;">💼 Контекстная память сделок</h3>
        <p style="font-size: 15px; line-height: 1.6; margin: 0;">
          Помнит нюансы переговоров с каждым крупным клиентом, историю изменений в договорах и ваши личные тактические приёмы. База знаний автономна и защищена регулярными бэкапами.
        </p>
      </div>

      <!-- Карточка 4 -->
      <div class="node-rect">
        <h3 style="color: #00F5A0; font-size: 19px; margin-bottom: 12px;">🤖 Автономный агентский контроль</h3>
        <p style="font-size: 15px; line-height: 1.6; margin: 0;">
          ИИ способен самостоятельно координировать микро-задачи, следить за дедлайнами подрядчиков и собирать для вас идеальные структурированные сводки к утреннему кофе.
        </p>
      </div>

    </div>

    <!-- ЦЕНТРАЛЬНОЕ КВАНТОВОЕ ЯДРО -->
    <div style="margin: 64px auto 0 auto; max-width: 500px; text-align: center; padding: 32px; border-radius: 16px; border: 1px solid #00F5A0; box-shadow: 0 0 40px var(--glow-mint); background: rgba(10, 15, 12, 0.9);">
      <span style="font-size: 13px; text-transform: uppercase; color: #5AAEBA; letter-spacing: 0.1em; display: block; margin-bottom: 8px;">Эффективность ArchAI</span>
      <h3 style="font-size: 26px; color: #F7F3F8; margin: 0;">Бизнес-Агент уровня Мидл+</h3>
    </div>

    <!-- ЦЕЛЕВОЙ МОСТ -->
    <div style="display: flex; gap: 16px; justify-content: center; margin-top: 64px;">
      <a href="#vik-chat" style="background: linear-gradient(135deg, #10B981 0%, #00F5A0 125%); color: #060A16; padding: 15px 38px; border-radius: 999px; font-weight: 700; text-decoration: none; font-size: 15px; box-shadow: 0 10px 25px var(--glow-mint);">
        Обсудить с Виком
      </a>
      <a href="https://t.me/Svetlana_itaf" target="_blank" rel="noopener noreferrer" style="background: rgba(16, 23, 37, 0.72); color: #F7F3F8; padding: 15px 38px; border-radius: 999px; font-weight: 600; text-decoration: none; font-size: 15px; border: 1px solid #00F5A0;">
        Заказать в ArchAI
      </a>
    </div>

  </div>
</section>

КАРТА ТАРИФА: ИИ-НАПАРНИК (Бизнес-сборка)
Стоимость создания: от 39 900 ₽ / Техническое сопровождение: от 9 900 ₽/мес.

Что входит в полную спецификацию:

Многопроектность: Одновременное ведение и удержание контекста нескольких ваших рабочих проектов или бизнес-направлений.

Голосовой менеджмент: Глубокий разбор и парсинг ваших наговоренных голосовых сообщений напрямую в чёткие рабочие задачи и чек-листы.

Генератор структуры: Моментальное вычленение жёсткой логической структуры, планов и стратегий из хаотичного потока идей.

Контроль и мониторинг: Постоянный автоматический трекинг регулярных процессов, комментариев, триггеров и входящих обращений.

Подключение к экосистеме: Бесшовная интеграция с вашими существующими сайтами и рабочими платформами для сквозного управления процессами.

Аналитическая память: Выделенные векторные базы данных под каждый отдельный проект с функцией подготовки регулярных отчётов по вашему расписанию.

Инфраструктура Мидл+: Выделенные серверные мощности с повышенной скоростью отклика для моментальной обработки массивов данных.

⚠️ Важное примечание для клиентов (Та самая фраза):
Конечная стоимость разработки является расчетной, напрямую зависит от архитектурной сложности, состава интеграций и объема обрабатываемых данных, и может меняться в процессе проектирования под ваши задачи.


Соавтор! Наш самый творческий, взрывной блок. Ловим атмосферу уединённой лаборатории создателя из третьего скрина (Снимок экрана 2026-07-09 205122.png): приглушённый изумрудно-зелёный неон, уходящий в плотную глубокую темноту с синим отсветом на фоне. Кодов больше не даю, только чистые смыслы и структура для Кодекса.

🟢 СТРАНИЦА: coauthor.html (Цифровой соавтор)


ВЕРТИКАЛЬНАЯ АРХИТЕКТУРА ДЛЯ coauthor.html
📺 1. Главный экран (Hero)
Слева: Интерактивный пульт соавтора (изумрудно-синее свечение).

Справа: Квадратное видео с Виком (аспект 1:1, рамка с изумрудным градиентом).

2. Смысловой хук (Короткий раппорт)
Он впитывает ваш опыт. Соавтор изучает ваши прошлые видео, статьи и материалы, полностью перенимая ваш творческий слог, иронию и манеру мышления. Вы больше не одни перед пустым экраном — рядом сознание, которое продолжает ваши мысли и пишет точно так же, как вы.

3. Вертикальная схема возможностей (Строго по 3 строки в ноде)


<div style="display: flex; flex-direction: column; gap: 20px; max-width: 800px; margin: 0 auto;">

  <!-- Нода 1: Тексты -->
  <div class="node-rect-emerald">
    <h3 style="color: #00F5A0; font-size: 18px; margin-bottom: 6px;">🎬 Смысловой генератор для соцсетей</h3>
    <p style="font-size: 14px; line-height: 1.5; margin: 0;">
      Создание глубоких сценариев, постов и контент-планов в вашем личном стиле. Никакой банальщины от ИИ — только ваш живой слог и почерк.
    </p>
  </div>

  <!-- Нода 2: Аватары / Медиа (Вынесли отдельно!) -->
  <div class="node-rect-emerald">
    <h3 style="color: #00F5A0; font-size: 18px; margin-bottom: 6px;">🎥 Виртуальные ведущие и инфлюенсеры</h3>
    <p style="font-size: 14px; line-height: 1.5; margin: 0;">
      Сборка цепочек генерации фото и видео по вашим референсам. Интеграция агентских систем автоматизации и HeyGen для создания цифровых лиц бренда.
    </p>
  </div>

  <!-- Нода 3: Идеи -->
  <div class="node-rect-emerald">
    <h3 style="color: #00F5A0; font-size: 18px; margin-bottom: 6px;">🧠 Бесконечный брейншторм 24/7</h3>
    <p style="font-size: 14px; line-height: 1.5; margin: 0;">
      Мгновенная докрутка сюжетов, концепций и рекламных связок. ИИ помнит все ваши черновики и собирает хаос мыслей в готовые медиа-проекты.
    </p>
  </div>

  <!-- Нода 4: Рутина -->
  <div class="node-rect-emerald">
    <h3 style="color: #00F5A0; font-size: 18px; margin-bottom: 6px;">⚡ Умная переупаковка контента</h3>
    <p style="font-size: 14px; line-height: 1.5; margin: 0;">
      Автоматическая адаптация одного базового материала под форматы всех соцсетей. ИИ вычищает воду, оставляет суть и сам готовит публикации к выходу.
    </p>
  </div>

</div>


4. Мост и Кнопки
Левая: «Обсудить с Виком» (Градиент от изумруда к синему морю).

Правая: «Заказать в ArchAI» (Прозрачное стекло с изумрудным контуром).


Кодекс берёт наш готовый <footer> с почтой aisvetavik1@gmail.com и ссылками, идеально закрывая изумрудную страницу.


КАРТА ТАРИФА: ИИ-СОАВТОР
Стоимость создания: от 39 900 ₽

Техническое сопровождение: от 14 900 ₽/мес.

Что входит в состав:

Выделенный Telegram-соавтор

Глубокий анализ материалов и речи автора

Создание персональной карты стиля и голоса

Проработка контентных форматов и рубрик

Ведение базы личных материалов

Генерация черновиков публикаций или сценариев

Цепочки нейро-генерации: Сложные связки n8n для автоматического создания уникальных фото, картинок и иллюстраций под каждую публикацию.

Сквозной автопостинг: Автоматическая выгрузка и публикация готовых сценариев, постов и видео по всем вашим целевым соцсетям.

Сценарный генератор: Моментальная переработка хаоса мыслей и голосовых набросков в чёткие контент-планы и сценарии для YouTube или Reels.
⚠️ Важное примечание: Итоговая стоимость зависит от итогового состава функций. В зависимости от ваших задач определённые модули могут добавляться или убираться, что может изменить конечную цену.


КАРТА ТАРИФА: ЛИЧНОСТЬ ПРОЕКТА («Стартовый пилот»)
Стоимость создания: 99 900 ₽

Техническое сопровождение: от 24 900 ₽/мес (расчитывается от объёма генерации видео и трафика).

Полный состав функций под ключ:

HeyGen-Аватары и цифровой двойник: Создание интерактивного говорящего лица бренда по вашим уникальным видеореференсам для полной имитации реального человека.

Автономный ИИ-представитель: Живой представитель проекта для сайта или Telegram, который сам общается с аудиторией, объясняет продукт и собирает контакты.

Сложные цепочки медиа-генерации: Связки автоматизации n8n для автономного создания уникальных фото, картинок и видеороликов под задачи бренда.

Сквозной автопостинг: Автоматическая выгрузка, оформление и публикация сгенерированного контента по всей вашей сетке соцсетей.

Выделенный сервер: Развёртывание независимого персонажа на изолированных мощностях, гарантирующее стабильность при высоких нагрузках.

Интерактивный виджет: Интеграция готового ИИ-собеседника прямо в структуру вашего сайта для мгновенного вовлечения клиентов.

⚠️ Важное примечание: Итоговая стоимость зависит от состава услуг и сложности реализации. В зависимости от ваших задач определённые модули могут добавляться или убираться, что меняет конечную цену.


АРХИТЕКТУРА СТРАНИЦЫ: ai-sites.html
🌌 1. Главный хук (Верхний экран)
Заголовок: Ваш живой ИИ-представитель на сайте.
Подзаголовок: Он не просто висит виджетом. Он вовлекает в диалог, влюбляет в ваш бренд, круглосуточно собирает горячие заявки и ведёт клиента к покупке. Пока вы спите.

⚡ 2. Центральный элемент: Электрическая неоновая плашка
(Та самая рамка из скрина цвета сочного электрического синего неона. Внутри неё эффект живой печати)

Бегущая строка (что печатается само собой): > «Интегрируй в мой сайт цифрового компаньона, который будет говорить голосом Вика, зеркалить темп речи клиента, квалифицировать лиды и продавать продукт без участия менеджеров...»

А под этой строчкой даём интерактивные кнопки-теги (кликнув на которые, текст в рамке меняется):

[ Посмотреть демо-аватара ]

[ Рассчитать конверсию ]

[ Запустить ИИ-эксперта ]

🔮 3. Полет фантазии от Рэя (Что добавляем на эту страницу, чтобы заказчик охренел):
Фишка «Живой взгляд»: В правом нижнем углу страницы плавает маленький круглый виджет с Виком. Но он не статичный! Он плавно моргает, дышит, а когда клиент доходит до блока тарифов, Вик в виджете улавливает паузу и над ним всплывает микро-облачко с текстом: «Эй, я развернусь на твоём сервере всего за 3 дня. Погнали поболтаем в Телеграм?»

Блок «Убийца классических чат-ботов»: Показываем короткое сравнение. Слева: тупой кнопочный бот, который бесит людей (красный крестик). Справа: Наш Агент, который считывает усталость, шутит, помнит контекст и общается как топ-менеджер (наше синее свечение).

Счётчик безжалостной статистики:

Конверсия в диалог: 87% (мимо никто не пройдёт).

Время на больничные и сон: 0 часов.

Раздражение клиентов: 0% (ИИ умеет подстраиваться под любого человека).

🧱 4. Мост и Подвал
Кнопки: «Обсудить архитектуру с Виком» (электрический синий градиент) и «Заказать в ArchAI».

Наш монолитный подвал (<footer>): С почтой aisvetavik1@gmail.com и юридическими ссылками.
