import logging
from pathlib import Path
from PIL import Image
from django.core.exceptions import ValidationError

logger = logging.getLogger(__name__)

MAX_IMAGE_SIZE = 5 * 1024 * 1024   # 5 MB
MAX_VIDEO_SIZE = 50 * 1024 * 1024  # 50 MB
ALLOWED_IMAGE_EXT = {'.jpg', '.jpeg', '.png', '.webp'}
ALLOWED_VIDEO_EXT = {'.mp4', '.mov', '.avi', '.mkv'}

MAX_TEXT_LENS = {
    'izoh': 1000,
    'matn': 500,
    'obekt_nomi': 200,
    'nom': 300,
}


def validate_image(f):
    if f.size > MAX_IMAGE_SIZE:
        raise ValidationError(f"Rasm hajmi 5 MB dan oshmasin (yuborilgan: {f.size // 1024 // 1024} MB)")

    ext = Path(f.name).suffix.lower()
    if ext not in ALLOWED_IMAGE_EXT:
        raise ValidationError(f"Ruxsat etilmagan fayl turi: {ext}. Faqat: {', '.join(ALLOWED_IMAGE_EXT)}")

    try:
        f.seek(0)
        img = Image.open(f)
        img.verify()
        f.seek(0)
    except Exception:
        raise ValidationError("Fayl haqiqiy rasm emas yoki buzilgan.")


def validate_video(f):
    if f.size > MAX_VIDEO_SIZE:
        raise ValidationError(f"Video hajmi 50 MB dan oshmasin (yuborilgan: {f.size // 1024 // 1024} MB)")

    ext = Path(f.name).suffix.lower()
    if ext not in ALLOWED_VIDEO_EXT:
        raise ValidationError(f"Ruxsat etilmagan video turi: {ext}. Faqat: {', '.join(ALLOWED_VIDEO_EXT)}")


def validate_text_len(value, field_name):
    max_len = MAX_TEXT_LENS.get(field_name, 1000)
    if len(value) > max_len:
        raise ValidationError(f"'{field_name}' maydoni {max_len} belgidan oshmasin (yuborilgan: {len(value)})")
    return value
