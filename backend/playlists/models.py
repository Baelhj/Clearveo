from django.db import models
from django.contrib.auth.models import User

class Playlist(models.Model):
    name = models.CharField(max_length=255)
    desc = models.TextField(blank=True)
    user = models.ForeignKey(User, related_name='playlists', on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class Video(models.Model):
    url = models.URLField(max_length=200)
    playlist = models.ForeignKey(Playlist, related_name='videos', on_delete=models.CASCADE)
    position = models.PositiveIntegerField()

    def __str__(self):
        return self.url
    
    class Meta:
        ordering = ['position']