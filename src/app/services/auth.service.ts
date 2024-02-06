import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = "http://localhost:8000/user"

  isAuthenticatedSubject = new BehaviorSubject<boolean>(false)

  constructor(private cookieService: CookieService, private http: HttpClient) { }

  getToken() {
    return this.cookieService.check('jwt');
  }

  login(email: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }, { withCredentials: true })
  }
}
