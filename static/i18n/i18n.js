// Real Holat — i18n kutubxonasi
// Tillar: uz_lat (Uzbek lotin), uz_cyr (Uzbek kiril), ru (Rus)

const I18N = {
  uz_lat: {
    // Navigatsiya
    'nav.lenta':       'Lenta',
    'nav.signal':      'Signal',
    'nav.tahlil':      'Tahlil',
    'nav.xarita':      'Xarita',
    'nav.maktablar':   'Maktablar',
    'nav.profil':      'Profil',

    // Sahifa sarlavhalari
    'page.profil':     'Profil',
    'page.feed':       'Real Holat Lentasi',
    'page.tahlil':     'Tahlil',
    'page.maktablar':  'Maktablar',
    'page.murojaat':   'Signal yuborish',

    // Umumiy
    'common.bajarildi':    "Bajarildi",
    'common.muammo':       "Muammo",
    'common.yuborish':     "Yuborish",
    'common.yopish':       "Yopish",
    'common.orqaga':       "Orqaga",
    'common.keyingisi':    "Keyingisi",
    'common.tekshirish':   "Tekshirish",
    'common.yuklanmoqda':  "Yuklanmoqda...",
    'common.xato':         "Xatolik yuz berdi",
    'common.saqlanmoqda':  "Saqlanmoqda...",
    'common.qidirish':     "Qidirish...",

    // Xarita
    'index.yuklanmoqda':   "Xarita yuklanmoqda...",

    // Maktablar
    'maktablar.qidiruv':   "Maktab, tuman yoki viloyat...",
    'maktablar.barchasi':  "Barchasi",

    // Maktab tafsilot
    'maktab.vaadalar':          "Va'dalar",
    'maktab.tekshiruvlar':      "Tekshiruvlar",
    'maktab.izohlar':           "Izohlar",
    'maktab.tekshirish_btn':    "Tekshirish boshlash",
    'maktab.tekshiruv_yuq':     "Hali tekshiruv yo'q",
    'maktab.izoh_yuq':          "Hali izoh yo'q",
    'maktab.izoh_placeholder':  "Izoh qoldiring...",

    // Sorovnoma modal
    'sorov.sarlavha':    "Tekshiruv so'rovnomasi",
    'sorov.orqaga':      "Orqaga",
    'sorov.keyingisi':   "Keyingisi",
    'sorov.yuborish':    "Yuborish",
    'sorov.foto':        "Foto biriktirish (ixtiyoriy)",
    'sorov.ha':          "Ha",
    'sorov.yoq':         "Yo'q",

    // Murojaat
    'murojaat.sarlavha':    "Signal yuborish",
    'murojaat.yuborish':    "Signal yuborish",
    'murojaat.yuklanmoqda': "Yuborilmoqda...",
    'murojaat.media':       "Rasm yoki video qo'shing",

    // Profil
    'profil.til':            "Til",
    'profil.yutuqlar':       "Yutuqlar",
    'profil.faoliyat':       "Oxirgi faoliyatlar",
    'profil.hali_yoq':       "Hali faoliyat yo'q",
    'profil.ball_toplang':   "Ko'proq ball to'plang!",
    'profil.tekshirish':     "Tekshirish",
    'profil.til_sarlavha':   "Til / Язык / Тил",

    // Geo xatolar
    'geo.xato':   "GPS aniqlanmadi. Joylashuv ruxsatini bering.",
    'geo.uzoq':   "Siz obyektdan 200m dan uzoqdasiz! Yaqinroq boring.",
    'geo.check':  "GPS tekshirilmoqda...",

    // Signal tekshiruv
    'signal.sarlavha':       "Tekshiruv",
    'signal.lokatsiya':      "Joylashuvni aniqlash",
    'signal.lokatsiya_sub':  "GPS orqali yaqin ob'yektlarni topish",
    'signal.aniqlanmoqda':   "Aniqlanmoqda...",
    'signal.aniqlandi':      "Joylashuv aniqlandi",
    'signal.yaqin':          "Yaqindagi ob'yektlar",
    'signal.topilmadi':      "10 km atrofda ob'yekt topilmadi",
    'signal.vada':           "Va'da bajarilganmi?",
    'signal.ha_bajarildi':   "Ha, bajarildi",
    'signal.yoq_btn':        "Yo'q",
    'signal.izoh_ph':        "Izoh (ixtiyoriy)...",
    'signal.rasm':           "Rasm qo'shish",
    'signal.video':          "Video qo'shish",
    'signal.yuborish':       "Yuborish",
    'signal.muvaffaqiyat':   "Qabul qilindi!",
    'signal.step1_sarlavha': "Ob'yektni tanlang",
    'signal.step2_sarlavha': "Savollar",
    'signal.step3_sarlavha': "Izoh va media",
    'signal.keyingisi':      "Keyingisi →",
    'signal.q1':   "Hojatxona bloki qayerda?",
    'signal.q1_a': "Bino ichida",
    'signal.q1_b': "Tashqarida",
    'signal.q2':   "Kanalizatsiya turi qanday?",
    'signal.q2_a': "Septik/LOS",
    'signal.q2_b': "Septik qopqoq",
    'signal.q2_c': "Qazilgan o'ra",
    'signal.q3':   "Qo'l yuvish moslamasiga suv hozir beriladimi?",
    'signal.q3_a': "Ha",
    'signal.q3_b': "Yo'q",
    'signal.q4':   "Hojatxonalar o'g'il bolalar va qizlar uchun ajratilganmi?",
    'signal.q4_a': "Ha, ayrimlari",
    'signal.q4_b': "Yo'q",
    'signal.q5':   "Kabinalarning quflari soz, eshiklari bormi?",
    'signal.q5_a': "Ha, hammasida",
    'signal.q5_b': "Qisman yo'q",
    'signal.q5_c': "Yo'q",

    // Auth
    'auth.xato':  "Telegram orqali kirish talab etiladi.",
  },

  uz_cyr: {
    // Навигация
    'nav.lenta':       'Лента',
    'nav.signal':      'Сигнал',
    'nav.tahlil':      'Таҳлил',
    'nav.xarita':      'Харита',
    'nav.maktablar':   'Мактаблар',
    'nav.profil':      'Профил',

    // Саҳифа сарлавҳалари
    'page.profil':     'Профил',
    'page.feed':       'Реал Ҳолат Лентаси',
    'page.tahlil':     'Таҳлил',
    'page.maktablar':  'Мактаблар',
    'page.murojaat':   'Сигнал юбориш',

    // Умумий
    'common.bajarildi':    "Бажарилди",
    'common.muammo':       "Муаммо",
    'common.yuborish':     "Юбориш",
    'common.yopish':       "Ёпиш",
    'common.orqaga':       "Орқага",
    'common.keyingisi':    "Кейингиси",
    'common.tekshirish':   "Текшириш",
    'common.yuklanmoqda':  "Юкланмоқда...",
    'common.xato':         "Хатолик юз берди",
    'common.saqlanmoqda':  "Сақланмоқда...",
    'common.qidirish':     "Қидириш...",

    // Харита
    'index.yuklanmoqda':   "Харита юкланмоқда...",

    // Мактаблар
    'maktablar.qidiruv':   "Мактаб, туман ёки вилоят...",
    'maktablar.barchasi':  "Барчаси",

    // Мактаб тафсилот
    'maktab.vaadalar':          "Ваъдалар",
    'maktab.tekshiruvlar':      "Текширувлар",
    'maktab.izohlar':           "Изоҳлар",
    'maktab.tekshirish_btn':    "Текширишни бошлаш",
    'maktab.tekshiruv_yuq':     "Ҳали текшируви йўқ",
    'maktab.izoh_yuq':          "Ҳали изоҳ йўқ",
    'maktab.izoh_placeholder':  "Изоҳ қолдиринг...",

    // Сўровнома
    'sorov.sarlavha':    "Текшириш сўровномаси",
    'sorov.orqaga':      "Орқага",
    'sorov.keyingisi':   "Кейингиси",
    'sorov.yuborish':    "Юбориш",
    'sorov.foto':        "Фото бириктириш (ихтиёрий)",
    'sorov.ha':          "Ҳа",
    'sorov.yoq':         "Йўқ",

    // Муrojaat
    'murojaat.sarlavha':    "Сигнал юбориш",
    'murojaat.yuborish':    "Сигнал юбориш",
    'murojaat.yuklanmoqda': "Юборилмоқда...",
    'murojaat.media':       "Расм ёки видео қўшинг",

    // Профил
    'profil.til':            "Тил",
    'profil.yutuqlar':       "Ютуқлар",
    'profil.faoliyat':       "Охирги фаолиятлар",
    'profil.hali_yoq':       "Ҳали фаолият йўқ",
    'profil.ball_toplang':   "Кўпроқ балл тўпланг!",
    'profil.tekshirish':     "Текшириш",
    'profil.til_sarlavha':   "Тил / Язык / Til",

    // Гео хатолар
    'geo.xato':   "GPS аниқланмади. Жойлашув рухсатини беринг.",
    'geo.uzoq':   "Сиз объектдан 200м дан узоқдасиз! Яқинроқ боринг.",
    'geo.check':  "GPS текширилмоқда...",

    // Сигнал текшириш
    'signal.sarlavha':       "Текшириш",
    'signal.lokatsiya':      "Жойлашувни аниқлаш",
    'signal.lokatsiya_sub':  "GPS орқали яқин объектларни топиш",
    'signal.aniqlanmoqda':   "Аниқланмоқда...",
    'signal.aniqlandi':      "Жойлашув аниқланди",
    'signal.yaqin':          "Яқиндаги объектлар",
    'signal.topilmadi':      "10 км атрофда объект топилмади",
    'signal.vada':           "Ваъда бажарилганми?",
    'signal.ha_bajarildi':   "Ҳа, бажарилди",
    'signal.yoq_btn':        "Йўқ",
    'signal.izoh_ph':        "Изоҳ (ихтиёрий)...",
    'signal.rasm':           "Расм қўшиш",
    'signal.video':          "Видео қўшиш",
    'signal.yuborish':       "Юбориш",
    'signal.muvaffaqiyat':   "Қабул қилинди!",
    'signal.step1_sarlavha': "Объектни танланг",
    'signal.step2_sarlavha': "Саволлар",
    'signal.step3_sarlavha': "Изоҳ ва медиа",
    'signal.keyingisi':      "Кейингиси →",
    'signal.q1':   "Ҳожатхона блоки қаерда?",
    'signal.q1_a': "Бино ичида",
    'signal.q1_b': "Бино ташқарисида",
    'signal.q2':   "Канализация тури қандай?",
    'signal.q2_a': "Септик/ЛОС",
    'signal.q2_b': "Септик қопқоқ",
    'signal.q2_c': "Қазилган яма",
    'signal.q3':   "Қўл ювиш мосламасига сув ҳозир бериладими?",
    'signal.q3_a': "Ҳа",
    'signal.q3_b': "Йўқ",
    'signal.q4':   "Ҳожатхоналар ўғил болалар ва қизлар учун ажратилганми?",
    'signal.q4_a': "Ҳа, айримлари",
    'signal.q4_b': "Йўқ",
    'signal.q5':   "Кабиналарнинг қулфлари соз эшиклари борми?",
    'signal.q5_a': "Ҳа, ҳаммаси",
    'signal.q5_b': "Қисман йўқ",
    'signal.q5_c': "Йўқ",

    // Auth
    'auth.xato':  "Telegram орқали кириш талаб этилади.",
  },

  ru: {
    // Навигация
    'nav.lenta':       'Лента',
    'nav.signal':      'Сигнал',
    'nav.tahlil':      'Анализ',
    'nav.xarita':      'Карта',
    'nav.maktablar':   'Объекты',
    'nav.profil':      'Профиль',

    // Заголовки страниц
    'page.profil':     'Профиль',
    'page.feed':       'Лента Real Holat',
    'page.tahlil':     'Анализ',
    'page.maktablar':  'Объекты',
    'page.murojaat':   'Отправить сигнал',

    // Общее
    'common.bajarildi':    "Выполнено",
    'common.muammo':       "Проблема",
    'common.yuborish':     "Отправить",
    'common.yopish':       "Закрыть",
    'common.orqaga':       "Назад",
    'common.keyingisi':    "Далее",
    'common.tekshirish':   "Проверить",
    'common.yuklanmoqda':  "Загрузка...",
    'common.xato':         "Произошла ошибка",
    'common.saqlanmoqda':  "Сохранение...",
    'common.qidirish':     "Поиск...",

    // Карта
    'index.yuklanmoqda':   "Карта загружается...",

    // Объекты
    'maktablar.qidiruv':   "Школа, район или область...",
    'maktablar.barchasi':  "Все",

    // Детали объекта
    'maktab.vaadalar':          "Обещания",
    'maktab.tekshiruvlar':      "Проверки",
    'maktab.izohlar':           "Комментарии",
    'maktab.tekshirish_btn':    "Начать проверку",
    'maktab.tekshiruv_yuq':     "Проверок пока нет",
    'maktab.izoh_yuq':          "Комментариев пока нет",
    'maktab.izoh_placeholder':  "Оставьте комментарий...",

    // Опросник
    'sorov.sarlavha':    "Опросник проверки",
    'sorov.orqaga':      "Назад",
    'sorov.keyingisi':   "Далее",
    'sorov.yuborish':    "Отправить",
    'sorov.foto':        "Прикрепить фото (необязательно)",
    'sorov.ha':          "Да",
    'sorov.yoq':         "Нет",

    // Сигнал
    'murojaat.sarlavha':    "Отправить сигнал",
    'murojaat.yuborish':    "Отправить сигнал",
    'murojaat.yuklanmoqda': "Отправка...",
    'murojaat.media':       "Добавьте фото или видео",

    // Профиль
    'profil.til':            "Язык",
    'profil.yutuqlar':       "Достижения",
    'profil.faoliyat':       "Последние действия",
    'profil.hali_yoq':       "Пока нет активности",
    'profil.ball_toplang':   "Набирайте больше баллов!",
    'profil.tekshirish':     "Проверить",
    'profil.til_sarlavha':   "Язык / Тил / Til",

    // Ошибки геолокации
    'geo.xato':   "GPS не определён. Разрешите доступ к геолокации.",
    'geo.uzoq':   "Вы находитесь более 200м от объекта! Подойдите ближе.",
    'geo.check':  "Проверка GPS...",

    // Сигнал проверка
    'signal.sarlavha':       "Проверка",
    'signal.lokatsiya':      "Определить местоположение",
    'signal.lokatsiya_sub':  "Найти ближайшие объекты через GPS",
    'signal.aniqlanmoqda':   "Определение...",
    'signal.aniqlandi':      "Местоположение определено",
    'signal.yaqin':          "Ближайшие объекты",
    'signal.topilmadi':      "В радиусе 10 км объектов не найдено",
    'signal.vada':           "Выполнено ли обещание?",
    'signal.ha_bajarildi':   "Да, выполнено",
    'signal.yoq_btn':        "Нет",
    'signal.izoh_ph':        "Комментарий (необязательно)...",
    'signal.rasm':           "Добавить фото",
    'signal.video':          "Добавить видео",
    'signal.yuborish':       "Отправить",
    'signal.muvaffaqiyat':   "Принято!",
    'signal.step1_sarlavha': "Выберите объект",
    'signal.step2_sarlavha': "Вопросы",
    'signal.step3_sarlavha': "Комментарий и медиа",
    'signal.keyingisi':      "Далее →",
    'signal.q1':   "Где находится туалетный блок?",
    'signal.q1_a': "Внутри здания",
    'signal.q1_b': "Снаружи здания",
    'signal.q2':   "Какой тип канализации?",
    'signal.q2_a': "Септик/ЛОС",
    'signal.q2_b': "Закрытый септик",
    'signal.q2_c': "Выгребная яма",
    'signal.q3':   "Есть ли сейчас вода в умывальниках?",
    'signal.q3_a': "Да",
    'signal.q3_b': "Нет",
    'signal.q4':   "Разделены ли туалеты для мальчиков и девочек?",
    'signal.q4_a': "Да, частично",
    'signal.q4_b': "Нет",
    'signal.q5':   "Есть ли рабочие замки на дверях кабин?",
    'signal.q5_a': "Да, на всех",
    'signal.q5_b': "Частично нет",
    'signal.q5_c': "Нет",

    // Auth
    'auth.xato':  "Требуется вход через Telegram.",
  },
};

const DEFAULT_LANG = 'uz_lat';

function getLang() {
  const saved = localStorage.getItem('rh_lang');
  if (saved && I18N[saved]) return saved;
  try {
    const tgLang = window.Telegram?.WebApp?.initDataUnsafe?.user?.language_code;
    if (tgLang === 'ru') return 'ru';
  } catch {}
  return DEFAULT_LANG;
}

function setLang(lang) {
  if (!I18N[lang]) return;
  localStorage.setItem('rh_lang', lang);
  applyI18n();
  // lang attr
  document.documentElement.lang = lang === 'ru' ? 'ru' : 'uz';
}

function t(key) {
  const lang = getLang();
  return I18N[lang]?.[key] ?? I18N[DEFAULT_LANG]?.[key] ?? key;
}

function applyI18n() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const val = t(key);
    if (val !== key) el.textContent = val;
  });
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const key = el.getAttribute('data-i18n-ph');
    const val = t(key);
    if (val !== key) el.placeholder = val;
  });
  // Active lang buttons
  const lang = getLang();
  document.querySelectorAll('[data-lang-btn]').forEach(btn => {
    const isActive = btn.getAttribute('data-lang-btn') === lang;
    btn.style.background = isActive ? 'linear-gradient(135deg,#3b82f6,#6366f1)' : 'rgba(0,0,0,0.05)';
    btn.style.color = isActive ? '#fff' : '#374151';
    btn.style.fontWeight = isActive ? '700' : '500';
  });
}

// Auto-apply
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', applyI18n);
} else {
  applyI18n();
}
