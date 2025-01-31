from rest_framework.routers import DefaultRouter
from .views import PlaylistViewSet, VideoViewSet
from rest_framework_nested.routers import NestedDefaultRouter

router = DefaultRouter()

router.register(r'playlists', PlaylistViewSet, basename='playlist')

video_router = NestedDefaultRouter(router, r'playlists', lookup='playlist_pk')
video_router.register(r'videos', VideoViewSet, basename='playlist-videos')

urlpatterns = router.urls + video_router.urls
