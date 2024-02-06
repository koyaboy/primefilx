import { Component, OnDestroy } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnDestroy {
  title = 'entertainment-web-app-angular';
  isAuthenticated: boolean = false;
  private subscription: Subscription;

  constructor(private auth: AuthService) {
    this.subscription = this.auth.isAuthenticatedSubject.subscribe(authenticationStatus => {
      this.isAuthenticated = authenticationStatus;
    });
  }

  ngOnDestroy() {
    // Unsubscribe to avoid memory leaks
    this.subscription.unsubscribe();
  }
}
