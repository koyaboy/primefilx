import { Component, Input, inject, Output, EventEmitter, Renderer2 } from '@angular/core';
import { Shows } from '../../models/shows';
import { ShowsService } from '../../services/shows.service';
import { VideoService } from '../../services/video.service';
import { Overlay } from "@angular/cdk/overlay"
import { ViewChild } from '@angular/core';
import { CdkPortal } from '@angular/cdk/portal';
import { OverlayConfig } from '@angular/cdk/overlay';
import { VideoPlayerComponent } from '../video-player/video-player.component';
import { ComponentPortal } from '@angular/cdk/portal';

@Component({
  selector: 'app-shows-list',
  templateUrl: './shows-list.component.html',
  styleUrl: './shows-list.component.css'
})
export class ShowsListComponent {
  @Input() title!: string
  @Input() Shows!: Shows[]
  @Input() filterType!: string

  @ViewChild(CdkPortal) portal!: CdkPortal;

  @Output() updatedShows = new EventEmitter<Shows[]>();

  showsService: ShowsService = inject(ShowsService)

  shouldDisplayVideo!: boolean

  overlayRef = this.overlay.create(new OverlayConfig({
    hasBackdrop: true
  }));

  constructor(
    private videoService: VideoService,
    private renderer: Renderer2,
    private overlay: Overlay,
  ) {
    this.videoService.showVideo$.subscribe((shouldDisplay) => {
      this.shouldDisplayVideo = shouldDisplay

      if (!this.shouldDisplayVideo) {
        this.overlayRef.detach()
      }
    })
  }

  ngOnInit() {
    if (this.title == "Bookmarked Movies" || this.title == "Bookmarked Series") {
      this.Shows = this.Shows.filter((show) => show.isBookmarked)
    }
  }

  updateBookmarkedShows(): void {
    let newBookmarkedShows: Shows[] = []
    this.showsService.getShows().subscribe((shows) => {
      newBookmarkedShows = shows.filter((show) => show.isBookmarked)
      this.updatedShows.emit(newBookmarkedShows)
    })
  }

  toggleBookmark(show: Shows) {
    show.isBookmarked = !show.isBookmarked

    if (this.title == "Bookmarked Movies" || this.title == "Bookmarked Series" || this.filterType == "bookmark-filter") {
      this.showsService.updateBookmark(show._id).subscribe(() => {
        this.updateBookmarkedShows()
      })

      const index = this.Shows.indexOf(show)
      this.Shows.splice(index, 1)
    }

    else {
      this.showsService.updateBookmark(show._id).subscribe()
    }
  }

  playVideo(event: Event, id: string, videoUrl: string, showTitle: string, showYear: number) {
    this.videoService.showVideo.next(true)
    this.videoService.setVideoUrl(videoUrl)
    this.videoService.setVideoTitle(showTitle)
    this.videoService.setVideoYear(showYear)

    const portal = new ComponentPortal(VideoPlayerComponent);
    this.overlayRef.attach(portal)
  }

  handleKeydown(event: KeyboardEvent, id: string, videoUrl: string, showTitle: string, showYear: number) {
    if (event.key == "Enter") {
      this.playVideo(event, id, videoUrl, showTitle, showYear)
    }
  }

}
