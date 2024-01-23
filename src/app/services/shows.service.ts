import { Injectable, inject } from '@angular/core';
import { Shows } from '../models/shows';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ShowsService {
  private apiUrl = "http://localhost:5000/shows"
  http: HttpClient = inject(HttpClient)

  constructor() { }

  getShows(): Observable<Shows[]> {
    return this.http.get<Shows[]>(this.apiUrl)
  }
}
