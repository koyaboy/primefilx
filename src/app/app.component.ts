import { Component, OnDestroy } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnDestroy {
  title = 'entertainment-web-app-angular';
  private subscription: Subscription;

  constructor(public auth: AuthService, private router: Router) {
    this.subscription = this.auth.isAuthenticated().subscribe({
      next: res => {
        if (res === true) {
          this.router.navigate(['/']);
        } else {
          this.router.navigate(['/login'])
        }
      },
      error: err => console.log(err)
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
