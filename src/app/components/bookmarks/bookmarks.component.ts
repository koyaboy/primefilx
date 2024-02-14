import { Component, inject } from '@angular/core';
import { ShowsService } from '../../services/shows.service';
import { Shows } from '../../models/shows';
import { Subject, take, takeUntil } from 'rxjs';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrl: './bookmarks.component.css'
})
export class BookmarksComponent {
  showsService: ShowsService = inject(ShowsService)
  bookmarkedShows: Shows[] = []
  bookmarkedMovies: Shows[] = []
  bookmarkedSeries: Shows[] = []
  filteredBookmarks: Shows[] = []
  filterValue: string = ""
  isLoading!: boolean

  private unsubscribe = new Subject<void>();

  constructor() {
    this.showsService.filterValue
      .pipe(
        takeUntil(this.unsubscribe)
      )
      .subscribe((filter) => {
        this.filterValue = filter
        this.filteredBookmarks = this.bookmarkedShows.filter((bookmarkedShow) => bookmarkedShow.title.includes(this.filterValue))
      })

    this.showsService.isLoading
      .pipe(
        takeUntil(this.unsubscribe)
      )
      .subscribe((loadingValue) => {
        this.isLoading = loadingValue
      })
  }

  ngOnInit() {
    this.showsService.getShows().subscribe((shows) => {
      this.bookmarkedShows = shows.filter((show) => show.isBookmarked == true)
      this.bookmarkedMovies = this.bookmarkedShows.filter((show) => show.isBookmarked == true && show.category == "Movie")
      this.bookmarkedSeries = this.bookmarkedShows.filter((show) => show.isBookmarked == true && show.category == "TV Series")
    })
    this.showsService.setSearchCategory('bookmarked shows')
  }

  ngOnDestroy() {
    this.unsubscribe.next()
    this.unsubscribe.complete()
  }

  onShowsChanged(updatedBookmarkedShows: Shows[]): void {
    this.bookmarkedShows = updatedBookmarkedShows;
  }
}
