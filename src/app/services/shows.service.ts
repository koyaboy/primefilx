import { Injectable, inject } from '@angular/core';
import { Shows } from '../models/shows';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class ShowsService {
  private apiUrl = "http://localhost:8000/shows"

  http: HttpClient = inject(HttpClient)

  private filterSubject$ = new BehaviorSubject<string>('')
  filterValue = this.filterSubject$.asObservable()

  private categorySubject$ = new BehaviorSubject<string>('')
  categoryValue = this.categorySubject$.asObservable()


  constructor() { }

  getShows(): Observable<Shows[]> {
    return this.http.get<Shows[]>(this.apiUrl)
  }

  updateBookmark(id: string): Observable<Shows> {
    return this.http.put<Shows>(`${this.apiUrl}/${id}`, {})
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
