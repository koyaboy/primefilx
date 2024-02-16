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
    this.videoUrl = this.videoService.getVideoUrl()
    this.videoTitle = this.videoService.getVideoTitle()
    this.videoYear = this.videoService.getVideoYear()
  }

  constructor(
    private videoService: VideoService,
    private renderer: Renderer2,
    private elementRef: ElementRef
  ) { }

  closePlayer() {
    this.videoService.showVideo.next(false)
  }

  // @HostListener('document:keydown.escape', ['$event'])
  // handleEscape(event: KeyboardEvent) {
  //   this.closePlayer();
  // }
}
