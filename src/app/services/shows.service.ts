import { Injectable, inject } from '@angular/core';
import { Shows } from '../models/shows';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { finalize, delay, shareReplay } from 'rxjs/operators';
import { environment } from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class ShowsService {
  private apiUrl = environment.SHOWS_API_URL

  http: HttpClient = inject(HttpClient)

  private filterSubject$ = new BehaviorSubject<string>('')
  filterValue$ = this.filterSubject$.asObservable()

  private categorySubject$ = new BehaviorSubject<string>('')
  categoryValue$ = this.categorySubject$.asObservable()

  private isLoadingSubject = new BehaviorSubject<boolean>(false)
  isLoading$ = this.isLoadingSubject.asObservable()

  shows!: Observable<Shows[]>

  constructor() { }

  getShows(): Observable<Shows[]> {
    if (!this.shows) {
      this.isLoadingSubject.next(true)

      this.shows = this.http.get<Shows[]>(this.apiUrl, { withCredentials: true }).pipe(
        shareReplay(),
        finalize(() => {
          this.isLoadingSubject.next(false)
        })
      )
    }

    return this.shows
  }

  updateBookmark(id: string): Observable<Shows> {
    return this.http.put<Shows>(`${this.apiUrl}/${id}`, {}, { withCredentials: true })
  }

  setSearchCategory(category: string): void {
    this.categorySubject$.next(category)
  }

  setFilterValue(value: string): void {
    this.filterSubject$.next(value)
  }

  filterShows(filter: string): string {
    this.setFilterValue(filter)
    return this.filterSubject$.value
  }
}
