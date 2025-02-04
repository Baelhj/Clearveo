from rest_framework import serializers
from .models import Playlist, Video


class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = ['url', 'position']

class PlaylistSerializer(serializers.ModelSerializer):
    videos = VideoSerializer(many=True, read_only=True)

    class Meta:
        model = Playlist
        fields = ['id', 'name', 'desc', 'videos']