import { Component, Renderer2, Signal, inject, effect, computed } from '@angular/core';
import { ShowsService } from '../../services/shows.service';
import { Shows } from '../../models/shows';
import { Router } from '@angular/router';
import { VideoService } from '../../services/video.service';
import { Subscription, map } from 'rxjs';
import { Observable } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {
  showsService: ShowsService = inject(ShowsService)

  shows: Signal<Shows[]> = this.showsService.getShows()
  trendingShows: Signal<Shows[]> = computed(() => this.shows().filter(show => show.isTrending))
  recommendedShows: Signal<Shows[]> = computed(() => this.shows().filter(show => !show.isTrending))
  filteredShows!: Shows[]

  filterValue = this.showsService.filterValue
  filterValue$ = toObservable(this.filterValue)
  isLoading = this.showsService.isLoading

  constructor(private router: Router, private videoService: VideoService, private renderer: Renderer2) { }

  ngOnInit() {
    this.filterValue$.subscribe((newValue) => {
      this.filteredShows = this.shows().filter(show => show.title.includes(newValue))
    })

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
}
