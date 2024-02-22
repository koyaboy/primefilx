import { Component, Renderer2, WritableSignal, inject, effect } from '@angular/core';
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
  private subscriptions: Subscription[] = [];

  showsService: ShowsService = inject(ShowsService)

  shows$: Observable<Shows[]> = this.showsService.getShows()
  trendingShows$: Observable<Shows[]> = this.shows$.pipe(map((shows) => shows.filter(show => show.isTrending)))
  recommendedShows$: Observable<Shows[]> = this.shows$.pipe(map((shows) => shows.filter(show => !show.isTrending)))
  filteredShows$!: Observable<Shows[]>;
  // filteredShows:Shows[] = 

  filterValue = this.showsService.filterValue
  filterValue$ = toObservable(this.filterValue)
  isLoading = this.showsService.isLoading
  shouldDisplayVideo!: boolean

  constructor(private router: Router, private videoService: VideoService, private renderer: Renderer2) {
    this.subscriptions.push(
      this.videoService.showVideo$
        .subscribe((shouldDisplay) => {
          this.shouldDisplayVideo = shouldDisplay;

          if (!this.shouldDisplayVideo) {
            this.videoService.closeVideo();
          }
        })
    );

    // effect(() => {
    //   this.filteredShows$ = this.shows$.pipe(map((shows => shows.filter(show => show.title.includes(this.filterValue())))))
    // })
  }

  ngOnInit() {
    this.shows$.subscribe()

    this.filterValue$.subscribe(newValue => {
      this.filteredShows$ = this.shows$.pipe(map((shows) => shows.filter(show => show.title.includes(newValue))))
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

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
