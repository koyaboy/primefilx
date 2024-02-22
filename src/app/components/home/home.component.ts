import { Component, Renderer2, inject } from '@angular/core';
import { ShowsService } from '../../services/shows.service';
import { Shows } from '../../models/shows';
import { Router } from '@angular/router';
import { VideoService } from '../../services/video.service';
import { Subscription, map } from 'rxjs';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {
  private subscriptions: Subscription[] = [];

  showsService: ShowsService = inject(ShowsService)

  shows$: Observable<Shows[]> = this.showsService.getShows()
  trendingShows$: Observable<Shows[]> = this.shows$.pipe(map((shows) => shows.filter(show => show.isTrending)))
  recommendedShows$: Observable<Shows[]> = this.shows$.pipe(map((shows) => shows.filter(show => !show.isTrending)))
  filteredShows$!: Observable<Shows[]>

  filterValue: string = ""
  isLoading!: boolean
  shouldDisplayVideo!: boolean

  constructor(private router: Router, private videoService: VideoService, private renderer: Renderer2) {
    this.subscriptions.push(
      this.showsService.filterValue$
        .subscribe((filter) => {
          this.filterValue = filter;
          this.filteredShows$ = this.shows$.pipe(map((shows) => shows.filter(show => show.title.includes(filter))));
        }),
      this.showsService.isLoading$
        .subscribe((loadingValue) => {
          this.isLoading = loadingValue;
        }),
      this.videoService.showVideo$
        .subscribe((shouldDisplay) => {
          this.shouldDisplayVideo = shouldDisplay;

          if (!this.shouldDisplayVideo) {
            this.videoService.closeVideo();
          }
        })
    );
  }

  ngOnInit() {
    this.shows$.subscribe()
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
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
