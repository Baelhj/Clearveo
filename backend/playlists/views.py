from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from .serializers import PlaylistSerializer, VideoSerializer
from .models import Playlist, Video

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
        playlist = get_object_or_404(Playlist, id=playlist_id, user=self.request.user)
        serializer.save(playlist=playlist)


