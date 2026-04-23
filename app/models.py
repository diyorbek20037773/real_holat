from django.db import models
from django.db.models import Count, Q
from django.conf import settings
from django.utils import timezone


INFRATUZILMA_TURLARI = [
    ('maktab', 'Maktab'),
    ('bogcha', "Bog'cha"),
    ('shifoxona', 'Shifoxona'),
    ('yol', "Yo'l infratuzilmasi"),
    ('sport', 'Sport inshootlari'),
    ('boshqa', 'Boshqa'),
]

HOLAT_TURLARI = [
    ('kutilmoqda', 'Kutilmoqda'),
    ('korib_chiqilmoqda', "Ko'rib chiqilmoqda"),
    ('hal_qilindi', 'Hal qilindi'),
]

VILOYATLAR = [
    ('toshkent_sh', 'Toshkent shahri'),
    ('toshkent_v', 'Toshkent viloyati'),
    ('samarqand', 'Samarqand viloyati'),
    ('fargona', "Farg'ona viloyati"),
    ('andijon', 'Andijon viloyati'),
    ('namangan', 'Namangan viloyati'),
    ('buxoro', 'Buxoro viloyati'),
    ('xorazm', 'Xorazm viloyati'),
    ('qashqadaryo', "Qashqadaryo viloyati"),
    ('surxondaryo', 'Surxondaryo viloyati'),
    ('jizzax', 'Jizzax viloyati'),
    ('sirdaryo', 'Sirdaryo viloyati'),
    ('navoiy', "Navoiy viloyati"),
    ('qoraqalpogiston', "Qoraqalpog'iston Respublikasi"),
]

MAKTAB_HOLAT = [
    ('yaxshi', 'Yaxshi'),
    ('etiborga_muhtoj', "E'tiborga muhtoj"),
    ('nosoz', 'Nosoz'),
]

OBYEKT_TURLARI = [
    ('maktab', 'Maktab'),
    ('bogcha', "Bog'cha"),
    ('shifoxona', 'Shifoxona'),
    ('sport', 'Sport inshoot'),
]


class Murojaat(models.Model):
    rasm = models.ImageField(upload_to='murojaatlar/', blank=True, null=True)
    viloyat = models.CharField(max_length=100, choices=VILOYATLAR, blank=True)
    tuman = models.CharField(max_length=100, blank=True)
    infratuzilma = models.CharField(max_length=50, choices=INFRATUZILMA_TURLARI, blank=True)
    sektor = models.CharField(max_length=50, blank=True)
    izoh = models.TextField(blank=True) 
    telegram_user_id = models.BigIntegerField()
    telegram_username = models.CharField(max_length=150, blank=True)
    telegram_full_name = models.CharField(max_length=200, blank=True)
    yuborilgan_vaqt = models.DateTimeField(auto_now_add=True)
    holat = models.CharField(max_length=50, choices=HOLAT_TURLARI, default='kutilmoqda')
    is_anonim = models.BooleanField(default=False)

    class Meta:
        ordering = ['-yuborilgan_vaqt']
        verbose_name = 'Murojaat'
        verbose_name_plural = 'Murojaatlar'

    def __str__(self):
        return f"{self.telegram_full_name or self.telegram_user_id} — {self.get_infratuzilma_display()} ({self.get_viloyat_display()})"



class MurojaatRasm(models.Model):
    murojaat = models.ForeignKey(Murojaat, on_delete=models.CASCADE, related_name='rasmlar')
    rasm = models.FileField(upload_to='murojaatlar/')

    class Meta:
        verbose_name = 'Murojaat rasmi'
        verbose_name_plural = 'Murojaat rasmlari'


class Statistika(models.Model):
    maktablar_soni = models.IntegerField(default=11139)
    bogchalar_soni = models.IntegerField(default=6935)
    tibbiyot_soni = models.IntegerField(default=3034)
    sport_soni = models.IntegerField(default=356)
    yangilangan_vaqt = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Statistika'
        verbose_name_plural = 'Statistika'

    def __str__(self):
        return f"Statistika (yangilangan: {self.yangilangan_vaqt})"


# ─── Maktablar modeli ─────────────────────────────────────────────────────────

class Maktab(models.Model):
    nom = models.CharField(max_length=200)
    tur = models.CharField(max_length=30, choices=OBYEKT_TURLARI, default='maktab')
    viloyat = models.CharField(max_length=100, choices=VILOYATLAR)
    tuman = models.CharField(max_length=100)
    manzil = models.TextField()
    rasm_url = models.URLField(blank=True)
    lat = models.FloatField(default=41.2995)
    lng = models.FloatField(default=69.2401)
    holat = models.CharField(max_length=30, choices=MAKTAB_HOLAT, default='yaxshi')
    qoshilgan_vaqt = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['nom']
        verbose_name = 'Maktab'
        verbose_name_plural = 'Maktablar'

    def __str__(self):
        return self.nom

    def mamnuniyat_foizi(self):
        """Bajarildi tekshiruvlar foizi"""
        jami = Tekshiruv.objects.filter(maktab=self).count()
        if jami == 0:
            return 0
        bajarildi = Tekshiruv.objects.filter(maktab=self, natija='bajarildi').count()
        return round(bajarildi / jami * 100)

    def tekshiruvlar_soni(self):
        return Tekshiruv.objects.filter(maktab=self).count()

    def mamnuniyat_foizi_vaznli(self):
        """Vaqt-decay vaznli mamnuniyat foizi (har 30 kunda 0.5x)."""
        tekshiruvlar = Tekshiruv.objects.filter(maktab=self).values('natija', 'vaqt')
        now = timezone.now()
        total_w = 0.0
        pos_w = 0.0
        for t in tekshiruvlar:
            days = (now - t['vaqt']).days
            w = 0.5 ** (days / 30.0)
            total_w += w
            if t['natija'] == 'bajarildi':
                pos_w += w
        if total_w == 0:
            return 0
        return round(pos_w / total_w * 100)

    def ishonch_darajasi(self):
        """TZ jadvali: 1→35, 5→68, 10→79, 20→90 (piecewise linear)."""
        n = Tekshiruv.objects.filter(maktab=self).count()
        if n == 0:
            return 0
        table = [(0, 0), (1, 35), (5, 68), (10, 79), (20, 90), (50, 98)]
        for i in range(len(table) - 1):
            x0, y0 = table[i]
            x1, y1 = table[i + 1]
            if x0 <= n <= x1:
                return round(y0 + (y1 - y0) * (n - x0) / (x1 - x0))
        return 98

    def nomuvofiqlik_bayrogi(self):
        """Agar 30%+ bajarildi va 30%+ muammo bo'lsa — zid natijalar."""
        jami = Tekshiruv.objects.filter(maktab=self).count()
        if jami < 3:
            return False
        bajarildi = Tekshiruv.objects.filter(maktab=self, natija='bajarildi').count()
        muammo = jami - bajarildi
        return (bajarildi / jami >= 0.3) and (muammo / jami >= 0.3)

    def eskirgan(self):
        """Oxirgi tekshiruv MONITORING_ESKIRISH_KUNI kundan ko'p bo'lsa."""
        eskirish_kuni = getattr(settings, 'MONITORING_ESKIRISH_KUNI', 90)
        oxirgi = Tekshiruv.objects.filter(maktab=self).order_by('-vaqt').first()
        if not oxirgi:
            return False
        return (timezone.now() - oxirgi.vaqt).days > eskirish_kuni

    def xarita_rangi(self):
        """TZ: kulrang/yashil/sariq/qizil."""
        jami = Tekshiruv.objects.filter(maktab=self).count()
        if jami == 0 or self.eskirgan():
            return 'kulrang'
        foiz = self.mamnuniyat_foizi_vaznli()
        if foiz < 40:
            return 'qizil'
        if self.nomuvofiqlik_bayrogi():
            return 'sariq'
        if foiz >= 70 and self.ishonch_darajasi() >= 50:
            return 'yashil'
        return 'sariq'

    def holat_rangi(self):
        rang = self.xarita_rangi()
        return {'yashil': 'yaxshi', 'sariq': 'etiborga_muhtoj', 'qizil': 'nosoz', 'kulrang': 'tekshirilmagan'}.get(rang, 'tekshirilmagan')


class Vaada(models.Model):
    """Davlat har bir maktabga bergan va'dasi"""
    maktab = models.ForeignKey(Maktab, on_delete=models.CASCADE, related_name='vaadalar')
    nom = models.CharField(max_length=300)
    tavsif = models.TextField(blank=True)
    icon = models.CharField(max_length=50, default='build')
    tartib = models.IntegerField(default=0)

    class Meta:
        ordering = ['tartib', 'id']
        verbose_name = "Va'da"
        verbose_name_plural = "Va'dalar"

    def __str__(self):
        return f"{self.maktab.nom} — {self.nom}"

    def bajarildi_soni(self):
        return Tekshiruv.objects.filter(vaada=self, natija='bajarildi').count()

    def muammo_soni(self):
        return Tekshiruv.objects.filter(vaada=self, natija='muammo').count()

    def jami_tekshiruv(self):
        return Tekshiruv.objects.filter(vaada=self).count()

    def foiz(self):
        jami = self.jami_tekshiruv()
        if jami == 0:
            return None
        return round(self.bajarildi_soni() / jami * 100)


class Tekshiruv(models.Model):
    """Fuqaro tekshiruvi: bajarildi yoki muammo"""
    NATIJA = [
        ('bajarildi', 'Bajarildi ✓'),
        ('muammo', 'Muammo ✗'),
    ]
    maktab = models.ForeignKey(Maktab, on_delete=models.CASCADE, related_name='tekshiruvlar')
    vaada = models.ForeignKey(Vaada, on_delete=models.CASCADE, related_name='tekshiruvlar', null=True, blank=True)
    natija = models.CharField(max_length=20, choices=NATIJA)
    rasm = models.ImageField(upload_to='tekshiruvlar/', blank=True, null=True)
    video = models.FileField(upload_to='tekshiruvlar/video/', blank=True, null=True)
    izoh = models.TextField(blank=True)
    telegram_user_id = models.BigIntegerField()
    telegram_username = models.CharField(max_length=150, blank=True)
    telegram_full_name = models.CharField(max_length=200, blank=True)
    vaqt = models.DateTimeField(auto_now_add=True)
    # Geovalidatsiya (TZ: obyektdan 200m radius)
    lat = models.FloatField(null=True, blank=True)
    lng = models.FloatField(null=True, blank=True)
    geo_valid = models.BooleanField(default=False)

    class Meta:
        ordering = ['-vaqt']
        verbose_name = 'Tekshiruv'
        verbose_name_plural = 'Tekshiruvlar'

    def __str__(self):
        return f"{self.maktab.nom} — {self.get_natija_display()} — {self.telegram_full_name or self.telegram_user_id}"


# ─── Feed modellari ──────────────────────────────────────────────────────────

class Like(models.Model):
    murojaat = models.ForeignKey(Murojaat, on_delete=models.CASCADE, related_name='likes')
    telegram_user_id = models.BigIntegerField()
    vaqt = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('murojaat', 'telegram_user_id')
        verbose_name = 'Like'
        verbose_name_plural = 'Likelar'

    def __str__(self):
        return f"Like: {self.telegram_user_id} → Murojaat #{self.murojaat_id}"


class Comment(models.Model):
    murojaat = models.ForeignKey(Murojaat, on_delete=models.CASCADE, related_name='comments')
    telegram_user_id = models.BigIntegerField()
    telegram_full_name = models.CharField(max_length=200, blank=True)
    matn = models.TextField(max_length=500)
    vaqt = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-vaqt']
        verbose_name = 'Izoh'
        verbose_name_plural = 'Izohlar'

    def __str__(self):
        return f"{self.telegram_full_name}: {self.matn[:50]}"


class MaktabIzoh(models.Model):
    """Maktab sahifasidagi izohlar/fikrlar"""
    maktab = models.ForeignKey(Maktab, on_delete=models.CASCADE, related_name='izohlar')
    telegram_user_id = models.BigIntegerField()
    telegram_full_name = models.CharField(max_length=200, blank=True)
    matn = models.TextField(max_length=500)
    vaqt = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-vaqt']
        verbose_name = 'Maktab izohi'
        verbose_name_plural = 'Maktab izohlari'

    def __str__(self):
        return f"{self.telegram_full_name}: {self.matn[:50]}"


# ─── So'rovnoma modellari ─────────────────────────────────────────────────────

SAVOL_TURLARI = [
    ('ha_yoq', "Ha/Yo'q"),
    ('shkala_1_5', 'Shkala 1-5'),
    ('variant', 'Variant tanlash'),
    ('son', 'Son kiritish'),
    ('foto', 'Foto'),
    ('matn', 'Matn'),
]

NASHR_HOLATI = [
    ('qoralama', 'Qoralama'),
    ('nashr', 'Nashr etilgan'),
    ('arxiv', 'Arxiv'),
]


class Dastur(models.Model):
    nom = models.CharField(max_length=300)
    tavsif = models.TextField(blank=True)
    yaratilgan_vaqt = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-yaratilgan_vaqt']
        verbose_name = "Dastur"
        verbose_name_plural = "Dasturlar"

    def __str__(self):
        return self.nom


class Tadbir(models.Model):
    dastur = models.ForeignKey(Dastur, on_delete=models.CASCADE, related_name='tadbirlar')
    nom = models.CharField(max_length=300)
    muddat = models.CharField(max_length=100, blank=True)
    masul = models.CharField(max_length=200, blank=True)
    tartib = models.IntegerField(default=0)

    class Meta:
        ordering = ['tartib', 'id']
        verbose_name = 'Tadbir'
        verbose_name_plural = 'Tadbirlar'

    def __str__(self):
        return f"{self.dastur.nom} — {self.nom}"


class Sorovnoma(models.Model):
    dastur = models.OneToOneField(Dastur, on_delete=models.CASCADE, related_name='sorovnoma')
    tavsif = models.TextField(blank=True)
    nashr_holati = models.CharField(max_length=20, choices=NASHR_HOLATI, default='qoralama')
    ortacha_vaqt_min = models.IntegerField(default=5)

    class Meta:
        verbose_name = "So'rovnoma"
        verbose_name_plural = "So'rovnomalar"

    def __str__(self):
        return f"So'rovnoma: {self.dastur.nom}"


class Savol(models.Model):
    sorovnoma = models.ForeignKey(Sorovnoma, on_delete=models.CASCADE, related_name='savollar')
    tadbir = models.ForeignKey(Tadbir, on_delete=models.SET_NULL, null=True, blank=True, related_name='savollar')
    tur = models.CharField(max_length=20, choices=SAVOL_TURLARI)
    matn = models.TextField()
    variantlar = models.JSONField(null=True, blank=True)
    majburiy = models.BooleanField(default=True)
    foto_biriktirish = models.BooleanField(default=False)
    tartib = models.IntegerField(default=0)

    class Meta:
        ordering = ['tartib', 'id']
        verbose_name = 'Savol'
        verbose_name_plural = 'Savollar'

    def __str__(self):
        return f"{self.sorovnoma.dastur.nom} — {self.matn[:50]}"


class Topshiriq(models.Model):
    sorovnoma = models.ForeignKey(Sorovnoma, on_delete=models.CASCADE, related_name='topshiriqlar')
    maktab = models.ForeignKey(Maktab, on_delete=models.CASCADE, related_name='topshiriqlar')

    class Meta:
        unique_together = ('sorovnoma', 'maktab')
        verbose_name = "Topshiriq"
        verbose_name_plural = "Topshiriqlar"

    def __str__(self):
        return f"{self.maktab.nom} ← {self.sorovnoma.dastur.nom}"


class Javob(models.Model):
    tekshiruv = models.ForeignKey(Tekshiruv, on_delete=models.CASCADE, related_name='javoblar')
    savol = models.ForeignKey(Savol, on_delete=models.CASCADE, related_name='javoblar')
    qiymat = models.JSONField()
    foto = models.ImageField(upload_to='javoblar/', null=True, blank=True)

    class Meta:
        verbose_name = 'Javob'
        verbose_name_plural = 'Javoblar'

    def __str__(self):
        return f"Javob: savol#{self.savol_id} → {str(self.qiymat)[:30]}"
