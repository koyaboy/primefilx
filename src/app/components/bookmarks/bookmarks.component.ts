import { Component, computed, inject, Signal, signal } from '@angular/core';
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

  bookmarkedShows = signal<Shows[]>([])
  bookmarkedMovies: Signal<Shows[]> = computed(() => this.bookmarkedShows().filter(show => show.category == "Movie"))
  bookmarkedSeries: Signal<Shows[]> = computed(() => this.bookmarkedShows().filter(show => show.category == "TV Series"))
  filteredBookmarks!: Shows[]

  filterValue = this.showsService.filterValue
  filterValue$ = toObservable(this.filterValue)
  isLoading = this.showsService.isLoading

  constructor() { }

  ngOnInit() {
    this.showsService.shows$.subscribe((shows) => {
      this.bookmarkedShows.set(shows.filter(show => show.isBookmarked))
    })

    this.filterValue$.subscribe(newFilter => {
      this.filteredBookmarks = this.bookmarkedShows().filter((bookmarkedShow) => bookmarkedShow.title.includes(newFilter))
    })

    this.showsService.setSearchCategory('bookmarked shows')
  }

  onShowsChanged(updatedBookmarkedShows: Shows[]): void {
    this.bookmarkedShows.set(updatedBookmarkedShows)
  }
}
