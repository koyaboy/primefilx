import { Injectable, signal } from '@angular/core';
import { VideoPlayerComponent } from '../components/video-player/video-player.component';
import { ComponentPortal } from '@angular/cdk/portal';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { OverlayConfig } from '@angular/cdk/overlay';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  videoUrl: string = '';
  videoTitle: string = '';
  videoYear!: number;
  overlayRef?: OverlayRef;

  // overlayRef = this.overlay.create(new OverlayConfig({
  //   hasBackdrop: true
  // }));

  constructor(private overlay: Overlay) {}

  playVideo(id: string, videoUrl: string, showTitle: string, showYear: number) {
    this.videoUrl = videoUrl;
    this.videoTitle = showTitle;
    this.videoYear = showYear;

    const portal = new ComponentPortal(VideoPlayerComponent);
    this.overlayRef = this.overlay.create(
      new OverlayConfig({
        hasBackdrop: true,
      })
    );
    this.overlayRef.attach(portal);
  }

  closeVideo(): void {
    this.overlayRef?.detach();
  }
}
