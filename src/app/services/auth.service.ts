import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = "http://localhost:8000/user"

  isAuthenticatedSubject = new BehaviorSubject<boolean>(false)

  constructor(private http: HttpClient) { }

  isAuthenticated() {
    return this.http.get<any>(`${this.apiUrl}/is-authenticated`, { withCredentials: true }).pipe(
      map(res => {
        return res.isAuthenticated === true ? true : false
      })
    )
  }

  login(email: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }, { withCredentials: true })
  }

  logout() {
    return this.http.post<any>(`${this.apiUrl}/logout`, {}, { withCredentials: true })
  }
}
