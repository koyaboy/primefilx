import { Component } from '@angular/core';
import { VideoService } from '../../services/video.service';


@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrl: './video-player.component.css'
})
export class VideoPlayerComponent {
  videoUrl!: string

  ngOnInit() {
    this.videoUrl = this.videoService.getVideoUrl()
  }
  constructor(private videoService: VideoService) { }
}
