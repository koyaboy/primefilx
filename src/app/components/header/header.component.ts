import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private auth: AuthService, private route: Router) { }

  logout() {
    this.auth.logout().subscribe(() => {
      this.route.navigate(['/login'])
    })
  }
}
