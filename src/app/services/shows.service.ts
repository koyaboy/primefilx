import { Injectable, inject, signal, Signal } from '@angular/core';
import { Shows } from '../models/shows';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { finalize, delay, shareReplay, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { toSignal } from "@angular/core/rxjs-interop"



@Injectable({
  providedIn: 'root'
})
export class ShowsService {
  private apiUrl = environment.SHOWS_API_URL

  http: HttpClient = inject(HttpClient)

  filterValue = signal<string>('')

  private categorySubject$ = new BehaviorSubject<string>('')
  categoryValue$ = this.categorySubject$.asObservable()

  // private isLoadingSubject = new BehaviorSubject<boolean>(false)
  // isLoading$ = this.isLoadingSubject.asObservable()
  isLoading = signal<boolean>(false)

  shows$!: Observable<Shows[]>
  shows!: Signal<Shows[]>
  trendingShows!: Signal<Shows[]>

  constructor() { }

  getShows(): Signal<Shows[]> {
    if (!this.shows$) {
      // this.isLoadingSubject.next(true)
      this.isLoading.set(true)

      this.shows$ = this.http.get<Shows[]>(this.apiUrl, { withCredentials: true }).pipe(
        shareReplay(),
        finalize(() => {
          // this.isLoadingSubject.next(false)
          this.isLoading.set(false)
        })
      )

    }

    this.shows = toSignal(this.shows$) as Signal<Shows[]>
    return this.shows
    //  return this.shows$
  }

  updateBookmark(id: string): Observable<Shows> {
    return this.http.put<Shows>(`${this.apiUrl}/${id}`, {}, { withCredentials: true })
  }

  setSearchCategory(category: string): void {
    this.categorySubject$.next(category)
  }

  setFilterValue(value: string): void {
    // this.filterSubject$.next(value)
    this.filterValue.set(value)
  }

  filterShows(filter: string): string {
    this.setFilterValue(filter)
    // return this.filterSubject$.value
    return this.filterValue()
    // return ""
  }
}
