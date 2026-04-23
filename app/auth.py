import hashlib
import hmac
import json
from urllib.parse import unquote, parse_qsl

from django.conf import settings


def validate_telegram_init_data(init_data_raw: str, bot_token: str = None) -> dict | None:
    """
    Telegram WebApp initData ni HMAC-SHA256 orqali tekshiradi.
    Muvaffaqiyatli bo'lsa user dict qaytaradi, aks holda None.

    Telegram algoritmi:
    1. initData string ni URL-parse qil
    2. hash maydonini ajratib ol
    3. Qolgan juftlarni kalibiga ko'ra saralab '\\n' bilan birlashtir
    4. secret_key = HMAC-SHA256("WebAppData", bot_token)
    5. data_check = HMAC-SHA256(data_check_string, secret_key)
    6. data_check == hash bo'lsa valid
    """
    if not init_data_raw:
        return None

    token = bot_token or getattr(settings, 'TELEGRAM_BOT_TOKEN', '')
    if not token:
        # Development muhitida token yo'q bo'lsa skip
        if getattr(settings, 'DEBUG', False):
            return _parse_user_from_init_data(init_data_raw)
        return None

    try:
        params = dict(parse_qsl(init_data_raw, keep_blank_values=True))
        received_hash = params.pop('hash', None)
        if not received_hash:
            return None

        data_check_string = '\n'.join(
            f'{k}={v}' for k, v in sorted(params.items())
        )

        secret_key = hmac.new(
            b'WebAppData',
            token.encode(),
            hashlib.sha256
        ).digest()

        computed_hash = hmac.new(
            secret_key,
            data_check_string.encode(),
            hashlib.sha256
        ).hexdigest()

        if not hmac.compare_digest(computed_hash, received_hash):
            return None

        return _parse_user_from_params(params)

    except Exception:
        return None


def _parse_user_from_params(params: dict) -> dict:
    """initData params dan user dict ni oladi."""
    user_json = params.get('user', '{}')
    try:
        user = json.loads(unquote(user_json))
    except (json.JSONDecodeError, TypeError):
        user = {}
    return user


def _parse_user_from_init_data(init_data_raw: str) -> dict:
    """DEBUG muhiti uchun — faqat user JSON ni parse qiladi, HMAC tekshirmasdan."""
    try:
        params = dict(parse_qsl(init_data_raw, keep_blank_values=True))
        return _parse_user_from_params(params)
    except Exception:
        return {}
