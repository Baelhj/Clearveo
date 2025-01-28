from rest_framework.routers import DefaultRouter
from .views import PlaylistViewSet, VideoViewSet

router = DefaultRouter()

router.register(r'playlists', PlaylistViewSet, basename='playlist')

urlpatterns = router.urls
