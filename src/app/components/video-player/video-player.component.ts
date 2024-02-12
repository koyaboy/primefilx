import { Component, Renderer2 } from '@angular/core';
import { VideoService } from '../../services/video.service';


@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrl: './video-player.component.css'
})
export class VideoPlayerComponent {
  videoUrl!: string
  videoTitle!: string
  videoYear!: number

  ngOnInit() {
    this.videoUrl = this.videoService.getVideoUrl()
    this.videoTitle = this.videoService.getVideoTitle()
    this.videoYear = this.videoService.getVideoYear()
  }

  constructor(private videoService: VideoService, private renderer: Renderer2) { }

  closePlayer() {
    const overlay = document.querySelector(".overlay")
    this.renderer.setStyle(overlay, "display", "none")

    this.videoService.showVideo.next(false)
  }
}
