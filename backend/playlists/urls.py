from rest_framework.routers import DefaultRouter
from .views import PlaylistViewSet, VideoViewSet
from rest_framework_nested.routers import NestedDefaultRouter
from django.urls import path

router = DefaultRouter()

router.register(r'playlists', PlaylistViewSet, basename='playlist')

video_router = NestedDefaultRouter(router, r'playlists', lookup='playlist')
video_router.register(r'videos', VideoViewSet, basename='playlist-videos')

urlpatterns = router.urls + video_router.urls + [
    path(
        'playlists/<int:playlist_pk>/videos/by-link/<str:link_video_id>/',
        VideoViewSet.as_view({'get': 'get_video_by_link_id'}),
        name='get_video_by_link_id'
    ),
]
