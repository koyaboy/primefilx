import { Injectable, inject, signal, Signal } from '@angular/core';
import { Shows } from '../models/shows';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { finalize, shareReplay } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { toSignal } from '@angular/core/rxjs-interop';
import { computed } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ShowsService {
  apiUrl = environment.SHOWS_API_URL;

  http: HttpClient = inject(HttpClient);

  filterValue = signal<string>('');
  isLoading = signal<boolean>(true);
  category = signal<string>('');
  #shows = signal<Shows[]>([]);
  shows = computed(this.#shows);
  #bookmarkedShows = signal<Shows[]>([]);
  bookmarkedShows = computed(this.#bookmarkedShows);

  constructor() {}

  toggleBookmark(showId: string) {
    const updatedShows = this.shows().map((show) =>
      show._id === showId ? { ...show, isBookmarked: !show.isBookmarked } : show
    );

    this.#shows.set(updatedShows);
    this.#bookmarkedShows.set(updatedShows.filter((show) => show.isBookmarked));

    this.updateBookmark(showId).subscribe();
  }

  fetchShows(): void {
    if (this.shows().length !== 0) {
      return;
    }
    this.isLoading.set(true);
    this.http
      .get<Shows[]>(this.apiUrl, { withCredentials: true })
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe((shows) => {
        this.#shows.set(shows);
        this.getBookmarkedShows();
      });
  }

  getBookmarkedShows() {
    this.#bookmarkedShows.set(this.shows().filter((show) => show.isBookmarked));
  }

  updateBookmark(id: string): Observable<Shows> {
    return this.http
      .put<Shows>(`${this.apiUrl}/${id}`, {}, { withCredentials: true })
      .pipe();
  }

  setSearchCategory(categoryValue: string): void {
    this.category.set(categoryValue);
  }

  setFilterValue(value: string): void {
    this.filterValue.set(value);
  }

  filterShows(filter: string): string {
    this.setFilterValue(filter);
    return this.filterValue();
  }
}
