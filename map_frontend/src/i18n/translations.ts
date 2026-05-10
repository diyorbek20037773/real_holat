export type Language = 'uz-Latn' | 'uz-Cyrl' | 'ru' | 'en';

export interface Translations {
  // General
  appName: string;
  dashboard: string;
  statistics: string;
  map: string;
  loading: string;
  back: string;
  total: string;
  region: string;
  district: string;
  school: string;
  schools: string;
  inspected: string;
  satisfied: string;
  satisfactionRate: string;
  notInspected: string;
  good: string;
  needsAttention: string;
  poor: string;
  promises: string;
  inspections: string;
  viewDetails: string;
  // Header
  themeLight: string;
  themeDark: string;
  language: string;
  // Stats cards
  totalSchools: string;
  totalSchoolsDesc: string;
  inspectedSchools: string;
  inspectedSchoolsDesc: string;
  satisfiedSchools: string;
  satisfiedSchoolsDesc: string;
  satisfactionPct: string;
  satisfactionPctDesc: string;
  // Map section
  mapTitle: string;
  mapSubtitle: string;
  mapLayer: string;
  satellite: string;
  hybrid: string;
  myLocation: string;
  myDistrict: string;
  schoolStatus: string;
  // Regional breakdown
  regionalBreakdown: string;
  regionalBreakdownDesc: string;
  regionName: string;
  schoolCount: string;
  inspectedCount: string;
  satisfactionScore: string;
  // Charts
  chartsTitle: string;
  chartsSubtitle: string;
  barChartTitle: string;
  pieChartTitle: string;
  trendChartTitle: string;
  byRegion: string;
  distribution: string;
  monthlyTrend: string;
  // Status
  statusGood: string;
  statusWarning: string;
  statusBad: string;
  statusUnknown: string;
  // Breadcrumb
  uzbekistan: string;
  // Footer
  footerText: string;
  lastUpdated: string;
  // Errors
  errorLoading: string;
  retry: string;
  // Tabs
  tabOverview: string;
  tabMap: string;
  tabRegions: string;
  tabCharts: string;
}

const translations: Record<Language, Translations> = {
  'uz-Latn': {
    appName: "Real Holat",
    dashboard: "Boshqaruv paneli",
    statistics: "Statistika",
    map: "Xarita",
    loading: "Yuklanmoqda...",
    back: "Orqaga",
    total: "Jami",
    region: "Viloyat",
    district: "Tuman",
    school: "Maktab",
    schools: "maktablar",
    inspected: "Tekshirilgan",
    satisfied: "Mamnun",
    satisfactionRate: "Mamnuniyat darajasi",
    notInspected: "Tekshirilmagan",
    good: "Yaxshi",
    needsAttention: "E'tiborga muhtoj",
    poor: "Nosoz",
    promises: "Va'dalar",
    inspections: "Tekshiruvlar",
    viewDetails: "Batafsil ko'rish",
    themeLight: "Yorug' rejim",
    themeDark: "Qorong'u rejim",
    language: "Til",
    totalSchools: "Jami maktablar",
    totalSchoolsDesc: "O'zbekistondagi barcha maktablar",
    inspectedSchools: "Tekshirilgan",
    inspectedSchoolsDesc: "Tekshiruv o'tkazilgan maktablar",
    satisfiedSchools: "Mamnun maktablar",
    satisfiedSchoolsDesc: "70%+ mamnuniyat ko'rsatkichi",
    satisfactionPct: "Mamnuniyat foizi",
    satisfactionPctDesc: "O'rtacha mamnuniyat darajasi",
    mapTitle: "Interaktiv xarita",
    mapSubtitle: "Viloyat yoki tumanni tanlang",
    mapLayer: "Xarita turi",
    satellite: "Sputnik",
    hybrid: "Gibrid",
    myLocation: "Mening joylashuvim",
    myDistrict: "Mening tumanim",
    schoolStatus: "Maktab holati",
    regionalBreakdown: "Viloyatlar bo'yicha",
    regionalBreakdownDesc: "Har bir viloyat statistikasi",
    regionName: "Viloyat nomi",
    schoolCount: "Maktablar",
    inspectedCount: "Tekshirilgan",
    satisfactionScore: "Mamnuniyat",
    chartsTitle: "Tahlil va grafiklar",
    chartsSubtitle: "Vizual statistika ko'rinishi",
    barChartTitle: "Viloyatlar bo'yicha maktablar",
    pieChartTitle: "Holat taqsimoti",
    trendChartTitle: "Oylik tendensiya",
    byRegion: "Viloyat bo'yicha",
    distribution: "Taqsimot",
    monthlyTrend: "Oylik tendensiya",
    statusGood: "Yaxshi",
    statusWarning: "E'tiborga muhtoj",
    statusBad: "Nosoz",
    statusUnknown: "Tekshirilmagan",
    uzbekistan: "O'zbekiston",
    footerText: "Real Holat — Fuqarolik monitoring tizimi",
    lastUpdated: "Oxirgi yangilanish",
    errorLoading: "Ma'lumot yuklanmadi. Qayta urinib ko'ring.",
    retry: "Qayta urinish",
    tabOverview: "Umumiy",
    tabMap: "Xarita",
    tabRegions: "Viloyatlar",
    tabCharts: "Grafiklar",
  },

  'uz-Cyrl': {
    appName: "Реал Ҳолат",
    dashboard: "Бошқарув панели",
    statistics: "Статистика",
    map: "Харита",
    loading: "Юкланмоқда...",
    back: "Орқага",
    total: "Жами",
    region: "Вилоят",
    district: "Туман",
    school: "Мактаб",
    schools: "мактаблар",
    inspected: "Текширилган",
    satisfied: "Мамнун",
    satisfactionRate: "Мамнунийат даражаси",
    notInspected: "Текширилмаган",
    good: "Яхши",
    needsAttention: "Эътиборга муҳтож",
    poor: "Носоз",
    promises: "Ваъдалар",
    inspections: "Текширувлар",
    viewDetails: "Батафсил кўриш",
    themeLight: "Ёруғ режим",
    themeDark: "Қоронғу режим",
    language: "Тил",
    totalSchools: "Жами мактаблар",
    totalSchoolsDesc: "Ўзбекистондаги барча мактаблар",
    inspectedSchools: "Текширилган",
    inspectedSchoolsDesc: "Текшируv ўтказилган мактаблар",
    satisfiedSchools: "Мамнун мактаблар",
    satisfiedSchoolsDesc: "70%+ мамнунийат кўрсаткичи",
    satisfactionPct: "Мамнунийат фоизи",
    satisfactionPctDesc: "Ўртача мамнунийат даражаси",
    mapTitle: "Интерактив харита",
    mapSubtitle: "Вилоят ёки туманни танланг",
    mapLayer: "Харита тури",
    satellite: "Спутник",
    hybrid: "Гибрид",
    myLocation: "Менинг жойлашувим",
    myDistrict: "Менинг туманим",
    schoolStatus: "Мактаб ҳолати",
    regionalBreakdown: "Вилоятлар бўйича",
    regionalBreakdownDesc: "Ҳар бир вилоят статистикаси",
    regionName: "Вилоят номи",
    schoolCount: "Мактаблар",
    inspectedCount: "Текширилган",
    satisfactionScore: "Мамнунийат",
    chartsTitle: "Таҳлил ва графиклар",
    chartsSubtitle: "Визуал статистика кўриниши",
    barChartTitle: "Вилоятлар бўйича мактаблар",
    pieChartTitle: "Ҳолат тақсимоти",
    trendChartTitle: "Ойлик тенденция",
    byRegion: "Вилоят бўйича",
    distribution: "Тақсимот",
    monthlyTrend: "Ойлик тенденция",
    statusGood: "Яхши",
    statusWarning: "Эътиборга муҳтож",
    statusBad: "Носоз",
    statusUnknown: "Текширилмаган",
    uzbekistan: "Ўзбекистон",
    footerText: "Реал Ҳолат — Фуқаролик мониторинг тизими",
    lastUpdated: "Охирги янгиланиш",
    errorLoading: "Маълумот юкланмади. Қайта уриниб кўринг.",
    retry: "Қайта уриниш",
    tabOverview: "Умумий",
    tabMap: "Харита",
    tabRegions: "Вилоятлар",
    tabCharts: "Графиклар",
  },

  'ru': {
    appName: "Реал Холат",
    dashboard: "Панель управления",
    statistics: "Статистика",
    map: "Карта",
    loading: "Загрузка...",
    back: "Назад",
    total: "Всего",
    region: "Область",
    district: "Район",
    school: "Школа",
    schools: "школы",
    inspected: "Проверено",
    satisfied: "Удовлетворено",
    satisfactionRate: "Уровень удовлетворённости",
    notInspected: "Не проверено",
    good: "Хорошо",
    needsAttention: "Требует внимания",
    poor: "Неисправно",
    promises: "Обещания",
    inspections: "Проверки",
    viewDetails: "Подробнее",
    themeLight: "Светлая тема",
    themeDark: "Тёмная тема",
    language: "Язык",
    totalSchools: "Всего школ",
    totalSchoolsDesc: "Все школы Узбекистана",
    inspectedSchools: "Проверено",
    inspectedSchoolsDesc: "Школы с проведёнными проверками",
    satisfiedSchools: "Удовлетворительно",
    satisfiedSchoolsDesc: "Показатель удовлетворённости 70%+",
    satisfactionPct: "Процент удовлетворённости",
    satisfactionPctDesc: "Средний уровень удовлетворённости",
    mapTitle: "Интерактивная карта",
    mapSubtitle: "Выберите область или район",
    mapLayer: "Тип карты",
    satellite: "Спутник",
    hybrid: "Гибрид",
    myLocation: "Моё местоположение",
    myDistrict: "Мой район",
    schoolStatus: "Состояние школы",
    regionalBreakdown: "По областям",
    regionalBreakdownDesc: "Статистика по каждой области",
    regionName: "Название области",
    schoolCount: "Школы",
    inspectedCount: "Проверено",
    satisfactionScore: "Удовлетворённость",
    chartsTitle: "Анализ и графики",
    chartsSubtitle: "Визуальное представление статистики",
    barChartTitle: "Школы по областям",
    pieChartTitle: "Распределение по состоянию",
    trendChartTitle: "Ежемесячная тенденция",
    byRegion: "По области",
    distribution: "Распределение",
    monthlyTrend: "Ежемесячная тенденция",
    statusGood: "Хорошо",
    statusWarning: "Требует внимания",
    statusBad: "Неисправно",
    statusUnknown: "Не проверено",
    uzbekistan: "Узбекистан",
    footerText: "Реал Холат — Система гражданского мониторинга",
    lastUpdated: "Последнее обновление",
    errorLoading: "Не удалось загрузить данные. Попробуйте снова.",
    retry: "Повторить",
    tabOverview: "Обзор",
    tabMap: "Карта",
    tabRegions: "Области",
    tabCharts: "Графики",
  },

  'en': {
    appName: "Real Holat",
    dashboard: "Dashboard",
    statistics: "Statistics",
    map: "Map",
    loading: "Loading...",
    back: "Back",
    total: "Total",
    region: "Region",
    district: "District",
    school: "School",
    schools: "schools",
    inspected: "Inspected",
    satisfied: "Satisfied",
    satisfactionRate: "Satisfaction Rate",
    notInspected: "Not Inspected",
    good: "Good",
    needsAttention: "Needs Attention",
    poor: "Poor",
    promises: "Promises",
    inspections: "Inspections",
    viewDetails: "View Details",
    themeLight: "Light Mode",
    themeDark: "Dark Mode",
    language: "Language",
    totalSchools: "Total Schools",
    totalSchoolsDesc: "All schools in Uzbekistan",
    inspectedSchools: "Inspected",
    inspectedSchoolsDesc: "Schools with completed inspections",
    satisfiedSchools: "Satisfied Schools",
    satisfiedSchoolsDesc: "Satisfaction score of 70%+",
    satisfactionPct: "Satisfaction Rate",
    satisfactionPctDesc: "Average satisfaction level",
    mapTitle: "Interactive Map",
    mapSubtitle: "Select a region or district",
    mapLayer: "Map Type",
    satellite: "Satellite",
    hybrid: "Hybrid",
    myLocation: "My Location",
    myDistrict: "My District",
    schoolStatus: "School Status",
    regionalBreakdown: "By Region",
    regionalBreakdownDesc: "Statistics for each region",
    regionName: "Region Name",
    schoolCount: "Schools",
    inspectedCount: "Inspected",
    satisfactionScore: "Satisfaction",
    chartsTitle: "Analytics & Charts",
    chartsSubtitle: "Visual statistics overview",
    barChartTitle: "Schools by Region",
    pieChartTitle: "Status Distribution",
    trendChartTitle: "Monthly Trend",
    byRegion: "By Region",
    distribution: "Distribution",
    monthlyTrend: "Monthly Trend",
    statusGood: "Good",
    statusWarning: "Needs Attention",
    statusBad: "Poor",
    statusUnknown: "Not Inspected",
    uzbekistan: "Uzbekistan",
    footerText: "Real Holat — Civic Monitoring System",
    lastUpdated: "Last Updated",
    errorLoading: "Failed to load data. Please try again.",
    retry: "Retry",
    tabOverview: "Overview",
    tabMap: "Map",
    tabRegions: "Regions",
    tabCharts: "Charts",
  },
};

export default translations;
