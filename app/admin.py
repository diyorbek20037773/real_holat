from django.contrib import admin
from .models import Murojaat, Statistika, Dastur, Tadbir, Sorovnoma, Savol, Topshiriq, Javob


@admin.register(Murojaat)
class MurojaatAdmin(admin.ModelAdmin):
    list_display = ('id', 'telegram_full_name', 'telegram_user_id', 'viloyat', 'tuman', 'infratuzilma', 'holat', 'yuborilgan_vaqt')
    list_filter = ('holat', 'viloyat', 'infratuzilma')
    search_fields = ('telegram_full_name', 'telegram_username', 'tuman', 'izoh')
    list_editable = ('holat',)
    readonly_fields = ('yuborilgan_vaqt', 'telegram_user_id')
    ordering = ('-yuborilgan_vaqt',)


@admin.register(Statistika)
class StatistikaAdmin(admin.ModelAdmin):
    list_display = ('id', 'maktablar_soni', 'bogchalar_soni', 'tibbiyot_soni', 'sport_soni', 'yangilangan_vaqt')


class TadbirInline(admin.TabularInline):
    model = Tadbir
    extra = 1


class SavelInline(admin.TabularInline):
    model = Savol
    extra = 1


@admin.register(Dastur)
class DasturAdmin(admin.ModelAdmin):
    list_display = ('id', 'nom', 'yaratilgan_vaqt')
    search_fields = ('nom',)
    inlines = [TadbirInline]


@admin.register(Sorovnoma)
class SorovnomaAdmin(admin.ModelAdmin):
    list_display = ('id', 'dastur', 'nashr_holati', 'ortacha_vaqt_min')
    list_filter = ('nashr_holati',)
    list_editable = ('nashr_holati',)
    inlines = [SavelInline]


@admin.register(Topshiriq)
class TopshiriqAdmin(admin.ModelAdmin):
    list_display = ('id', 'maktab', 'sorovnoma')
    search_fields = ('maktab__nom', 'sorovnoma__dastur__nom')


@admin.register(Javob)
class JavobAdmin(admin.ModelAdmin):
    list_display = ('id', 'tekshiruv', 'savol', 'qiymat')
    readonly_fields = ('tekshiruv', 'savol', 'qiymat', 'foto')
