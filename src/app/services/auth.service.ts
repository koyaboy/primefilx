import { Inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../environments/environment';
import { BehaviorSubject, finalize } from 'rxjs';
import { computed } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.USERS_API_URL;

  #isLoggingIn = signal<boolean>(false);
  isLoggingIn = computed(this.#isLoggingIn);
  #isSigningUp = signal<boolean>(false);
  isSigningUp = computed(this.#isSigningUp);

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private http: HttpClient
  ) {}

  refreshToken() {
    return this.http.get<any>(`${this.apiUrl}/refresh-token`, {
      withCredentials: true,
    });
  }

  login(email: string, password: string) {
    this.#isLoggingIn.set(true);

    return this.http
      .post<User>(
        `${this.apiUrl}/login`,
        { email, password },
        { withCredentials: true }
      )
      .pipe(
        finalize(() => {
          this.#isLoggingIn.set(false);
        })
      );
  }

  signup(email: string, password: string) {
    this.#isSigningUp.set(true);

    return this.http
      .post<any>(
        `${this.apiUrl}/register`,
        { email, password },
        { withCredentials: true }
      )
      .pipe(
        finalize(() => {
          this.#isSigningUp.set(false);
        })
      );
  }

  getUser(email: string) {
    return this.http.post<User>(
      `${this.apiUrl}/getUser`,
      { email },
      { withCredentials: true }
    );
  }

  saveUserToLocalStorage(user: User) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }

  logout() {
    return this.http.post<any>(
      `${this.apiUrl}/logout`,
      {},
      { withCredentials: true }
    );
  }
}
