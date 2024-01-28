import { Component, inject } from '@angular/core';
import { ShowsService } from '../../services/shows.service';
import { Shows } from '../../models/shows';

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

  constructor() {
    this.showsService.filterValue.subscribe((filter) => {
      this.filterValue = filter
      this.filteredBookmarks = this.bookmarkedShows.filter((bookmarkedShow) => bookmarkedShow.title.includes(this.filterValue))
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

  onShowsChanged(updatedBookmarkedShows: Shows[]): void {
    this.bookmarkedShows = updatedBookmarkedShows;
  }
}
