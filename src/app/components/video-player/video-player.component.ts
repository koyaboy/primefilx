import { Component, Renderer2, ElementRef, ViewChild, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { VideoService } from '../../services/video.service';
import { Overlay } from '@angular/cdk/overlay';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrl: './video-player.component.css'
})
export class VideoPlayerComponent {
  videoUrl!: string
  videoTitle!: string
  videoYear!: number

  @ViewChild('closeBtn') closeBtn!: ElementRef<HTMLButtonElement>

  @Output() closeOverlay = new EventEmitter<void>();

  ngOnInit() {
    this.videoUrl = this.videoService.videoUrl
    this.videoTitle = this.videoService.videoTitle
    this.videoYear = this.videoService.videoYear
  }

  constructor(
    private videoService: VideoService,
    private renderer: Renderer2,
    private elementRef: ElementRef
  ) { }

  closePlayer() {
    this.videoService.closeVideo()
  }
}
