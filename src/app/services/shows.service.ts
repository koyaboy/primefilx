import { Injectable, inject } from '@angular/core';
import { Shows } from '../models/shows';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ShowsService {
  private apiUrl = "http://localhost:5000/shows"

  http: HttpClient = inject(HttpClient)

  private filterSubject$ = new BehaviorSubject<string>('')
  filterValue = this.filterSubject$.asObservable()

  constructor() { }

  getShows(): Observable<Shows[]> {
    return this.http.get<Shows[]>(this.apiUrl)
  }

  filterShows(filter: string): string {
    this.filterSubject$.next(filter)
    return this.filterSubject$.value
  }
}
