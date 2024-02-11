import { Component, inject } from '@angular/core';
import { ShowsService } from '../../services/shows.service';
import { Shows } from '../../models/shows';
import { Router } from '@angular/router';
import { VideoService } from '../../services/video.service';

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

  constructor(private router: Router, private videoService: VideoService) {
    this.showsService.filterValue.subscribe((filter) => {
      this.filterValue = filter
      this.filteredShows = this.shows.filter((show) => show.title.includes(filter))
    })

    this.showsService.isLoading.subscribe((loadingValue) => {
      this.isLoading = loadingValue
    })

    this.videoService.showVideo$.subscribe((shouldDisplay) => {
      this.shouldDisplayVideo = shouldDisplay
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
    this.videoService.setVideoUrl(videoUrl)
    this.videoService.setVideoTitle(showTitle)
    this.videoService.setVideoYear(showYear)
    this.videoService.showVideo.next(true)
  }
}
