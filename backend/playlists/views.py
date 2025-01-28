from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from .serializers import PlaylistSerializer, VideoSerializer
from .models import Playlist, Video

class PlaylistViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_classes = PlaylistSerializer

    def get_queryset(self):
        return Playlist.objects.filter(user=self.request.user)
    
class VideoViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_classes = VideoSerializer

    def get_queryset(self):
        return Video.objects.filter(Playlist__user=self.request.user)
    


