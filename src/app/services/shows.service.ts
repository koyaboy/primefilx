import { Injectable, inject, signal, Signal } from '@angular/core';
import { Shows } from '../models/shows';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { finalize, shareReplay } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { toSignal } from "@angular/core/rxjs-interop"


@Injectable({
  providedIn: 'root'
})
export class ShowsService {
  private apiUrl = environment.SHOWS_API_URL

  http: HttpClient = inject(HttpClient)

  filterValue = signal<string>('')
  isLoading = signal<boolean>(true)

  shows$ = this.http.get<Shows[]>(this.apiUrl, { withCredentials: true }).pipe(
    shareReplay(),
    finalize(() => {
      this.isLoading.set(false)
    })
  )

  shows = toSignal(this.shows$) as Signal<Shows[]>

  category = signal<string>("")

  updateBookmark(id: string): Observable<Shows> {
    return this.http.put<Shows>(`${this.apiUrl}/${id}`, {}, { withCredentials: true }).pipe()
  }

  setSearchCategory(categoryValue: string): void {
    this.category.set(categoryValue)
  }

  setFilterValue(value: string): void {
    this.filterValue.set(value)
  }

  filterShows(filter: string): string {
    this.setFilterValue(filter)
    return this.filterValue()
  }
}
