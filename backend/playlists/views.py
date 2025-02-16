from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from .serializers import PlaylistSerializer, VideoSerializer
from .models import Playlist, Video
from rest_framework.decorators import action


class PlaylistViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = PlaylistSerializer

    def get_queryset(self):
        return Playlist.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    
class VideoViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = VideoSerializer

    def get_queryset(self):
        playlist_id = self.kwargs.get('playlist_pk')
        playlist = get_object_or_404(Playlist, id=playlist_id, user=self.request.user)
        return Video.objects.filter(playlist=playlist)
    
    def perform_create(self, serializer):
        playlist_id = self.kwargs.get('playlist_pk')
        print(playlist_id)
        print("KWARGS:", self.kwargs)

        playlist = get_object_or_404(Playlist, id=playlist_id, user=self.request.user)
        serializer.save(playlist=playlist)

    @action(detail=False, methods=['get'], url_path='by-link/(?P<link_video_id>[^/.]+)')
    def get_video_by_link_id(self, request, playlist_pk=None, link_video_id=None):
        playlist = get_object_or_404(Playlist, id=playlist_pk, user=request.user)
        video = get_object_or_404(Video, playlist=playlist,link_video_id=link_video_id, )
        serializer = self.get_serializer(video)
        return Response(serializer.data)