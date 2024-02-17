import { Component, Renderer2, inject } from '@angular/core';
import { ShowsService } from '../../services/shows.service';
import { Shows } from '../../models/shows';
import { Router } from '@angular/router';
import { VideoService } from '../../services/video.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {
  showsService: ShowsService = inject(ShowsService)

  shows: Shows[] = []
  recommendedShows: Shows[] = []
  trendingShows: Shows[] = []
  filteredShows: Shows[] = []

  filterValue: string = ""
  isLoading!: boolean

  shouldDisplayVideo!: boolean

  private unsubscribe = new Subject<void>();

  constructor(private router: Router, private videoService: VideoService, private renderer: Renderer2) {
    this.showsService.filterValue
      .pipe(
        takeUntil(this.unsubscribe)
      )
      .subscribe((filter) => {
        this.filterValue = filter
        this.filteredShows = this.shows.filter((show) => show.title.includes(filter))
      })

    this.showsService.isLoading
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((loadingValue) => {
        this.isLoading = loadingValue
      })

    this.videoService.showVideo$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((shouldDisplay) => {
        this.shouldDisplayVideo = shouldDisplay

        if (!this.shouldDisplayVideo) {
          this.videoService.closeVideo()
        }
      })
  }

  ngOnInit() {
    this.showsService.getShows().subscribe(
      (data) => {
        this.shows = data

        this.recommendedShows = this.shows.filter((show) => show.isTrending == false)
        this.trendingShows = this.shows.filter((show) => show.isTrending == true)
      }
    )

    this.showsService.setSearchCategory('movies or TV series')
  }

  toggleBookmark(show: Shows) {
    show.isBookmarked = !show.isBookmarked

    this.showsService.updateBookmark(show._id).subscribe()
  }

  playVideo(id: string, videoUrl: string, showTitle: string, showYear: number) {
    this.videoService.playVideo(id, videoUrl, showTitle, showYear)
  }

  handleKeydown(event: KeyboardEvent, id: string, videoUrl: string, showTitle: string, showYear: number) {
    if (event.key == "Enter") {
      this.playVideo(id, videoUrl, showTitle, showYear)
    }
  }

  ngOnDestroy() {
    this.unsubscribe.next()
    this.unsubscribe.complete()
  }
}
