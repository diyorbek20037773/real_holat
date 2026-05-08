from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.views.generic import RedirectView
from django.views.static import serve
from django.http import FileResponse
from pathlib import Path

BASE = Path(__file__).resolve().parent.parent

_ALLOWED_GEOJSON = {'uz-tumanlar.geojson', 'uz-viloyatlar.geojson'}

def serve_geojson(request, filename):
    from django.http import Http404
    if filename not in _ALLOWED_GEOJSON:
        raise Http404
    filepath = BASE / filename
    if not filepath.exists():
        raise Http404
    return FileResponse(open(filepath, 'rb'), content_type='application/json')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', RedirectView.as_view(url='/tma/feed/', permanent=False)),
    path('', include('app.urls')),
    path('media/<path:path>', serve, {'document_root': settings.MEDIA_ROOT}),
    path('geojson/<str:filename>', serve_geojson, name='geojson'),
]
