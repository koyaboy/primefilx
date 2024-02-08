import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private auth: AuthService, private route: Router, @Inject(PLATFORM_ID) private platformId: object) { }

  logout() {
    this.auth.logout().subscribe(() => {
      if (isPlatformBrowser(this.platformId)) {
        localStorage.removeItem("user")
      }
      this.route.navigate(['/login'])
    })
  }
}
