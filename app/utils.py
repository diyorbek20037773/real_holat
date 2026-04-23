import math


def haversine_m(lat1, lng1, lat2, lng2):
    """Ikki nuqta orasidagi masofani metrda hisoblaydi (Haversine formula)."""
    R = 6371000
    phi1 = math.radians(lat1)
    phi2 = math.radians(lat2)
    dphi = math.radians(lat2 - lat1)
    dl = math.radians(lng2 - lng1)
    a = math.sin(dphi / 2) ** 2 + math.cos(phi1) * math.cos(phi2) * math.sin(dl / 2) ** 2
    return 2 * R * math.asin(math.sqrt(a))


GEO_RADIUS_M = 200  # TZ: ruxsat etilgan radius obyektdan


def natija_javoblardan(javoblar_list):
    """Sorovnoma javoblaridan natija hisoblash (bajarildi/muammo)."""
    positive = 0
    total = 0
    for j in javoblar_list:
        qiymat = j.get('qiymat')
        if isinstance(qiymat, bool):
            total += 1
            if qiymat:
                positive += 1
        elif isinstance(qiymat, str) and qiymat in ('ha', 'yoq'):
            total += 1
            if qiymat == 'ha':
                positive += 1
        elif isinstance(qiymat, (int, float)) and 1 <= qiymat <= 5:
            total += 1
            if qiymat >= 3:
                positive += 1
    if total == 0:
        return 'bajarildi'
    return 'bajarildi' if positive / total >= 0.5 else 'muammo'
