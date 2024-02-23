import { Component, inject } from '@angular/core';
import { ShowsService } from '../../services/shows.service';
import { Shows } from '../../models/shows';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { toObservable } from '@angular/core/rxjs-interop';

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
  filteredBookmarks: Shows[] = this.bookmarkedShows.filter((bookmarkedShow) => bookmarkedShow.title.includes(this.filterValue()))
  // filterValue: string = ""
  // isLoading!: boolean

  filterValue = this.showsService.filterValue
  filterValue$ = toObservable(this.filterValue)
  isLoading = this.showsService.isLoading

  private unsubscribe = new Subject<void>();

  constructor() { }

  ngOnInit() {
    // this.showsService.getShows().subscribe((shows) => {
    //   this.bookmarkedShows = shows.filter((show) => show.isBookmarked == true)
    //   this.bookmarkedMovies = this.bookmarkedShows.filter((show) => show.isBookmarked == true && show.category == "Movie")
    //   this.bookmarkedSeries = this.bookmarkedShows.filter((show) => show.isBookmarked == true && show.category == "TV Series")
    // })

    this.filterValue$.subscribe(newValue => {
      this.filteredBookmarks = this.bookmarkedShows.filter((bookmarkedShow) => bookmarkedShow.title.includes(newValue))
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
