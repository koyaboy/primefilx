import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { VideoPlayerComponent } from '../components/video-player/video-player.component';
import { ComponentPortal } from '@angular/cdk/portal';
import { Overlay } from "@angular/cdk/overlay"
import { OverlayConfig } from '@angular/cdk/overlay';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  videoUrl: string = ""
  videoTitle: string = ""
  videoYear!: number

  showVideo = new BehaviorSubject<boolean>(false)
  showVideo$ = this.showVideo.asObservable()

  overlayRef = this.overlay.create(new OverlayConfig({
    hasBackdrop: true
  }));

  constructor(private overlay: Overlay) { }

  playVideo(id: string, videoUrl: string, showTitle: string, showYear: number) {
    this.showVideo.next(true)
    this.setVideoUrl(videoUrl)
    this.setVideoTitle(showTitle)
    this.setVideoYear(showYear)

    const portal = new ComponentPortal(VideoPlayerComponent);
    this.overlayRef.attach(portal)
  }

  closeVideo(): void {
    this.overlayRef.detach()
  }

  setVideoUrl(url: string) {
    this.videoUrl = url
  }

  setVideoTitle(title: string) {
    this.videoTitle = title
  }

  setVideoYear(year: number) {
    this.videoYear = year
  }

  getVideoUrl(): string {
    return this.videoUrl
  }

  getVideoTitle(): string {
    return this.videoTitle
  }

  getVideoYear(): number {
    return this.videoYear
  }
}
