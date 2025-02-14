import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Signal,
  signal,
} from '@angular/core';
import { ShowsService } from '../../services/shows.service';
import { Shows } from '../../models/shows';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { toObservable } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrl: './bookmarks.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookmarksComponent {
  showsService: ShowsService = inject(ShowsService);

  shows = this.showsService.shows;
  filterValue = this.showsService.filterValue;
  isLoading = this.showsService.isLoading;
  bookmarkedShows = this.showsService.bookmarkedShows;

  bookmarkedMovies: Signal<Shows[]> = computed(() =>
    this.bookmarkedShows().filter((show) => show.category == 'Movie')
  );
  bookmarkedSeries: Signal<Shows[]> = computed(() =>
    this.bookmarkedShows().filter((show) => show.category == 'TV Series')
  );
  filteredBookmarks: Signal<Shows[]> = computed(() => {
    const newFilter = this.filterValue();
    return this.bookmarkedShows().filter((bookmarkedShow) =>
      bookmarkedShow.title.includes(newFilter)
    );
  });

  constructor() {}

  ngOnInit() {
    this.showsService.fetchShows();
    this.showsService.setSearchCategory('bookmarked shows');
  }

  onShowsChanged(updatedBookmarkedShows: Shows[]): void {
    // this.bookmarkedShows.set(updatedBookmarkedShows);
  }
}
