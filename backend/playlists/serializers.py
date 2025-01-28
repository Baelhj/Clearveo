from rest_framework import serializers
from .models import Playlist, Video

class PlaylistSerializer(serializers.ModelSerializer):
    Video = VideoSerializer(many=True, read_only=True)

    class Meta:
        model = Playlist
        fields = ['id', 'name', 'desc']

class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = ['id', 'url', 'position']