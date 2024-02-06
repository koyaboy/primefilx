import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { catchError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  })

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private toast: ToastrService,
    private route: Router,
  ) { }

  onSubmit(): void {
    const email = this.loginForm.value.email as string
    const password = this.loginForm.value.password as string

    this.auth.login(email, password).subscribe({
      next: res => {
        this.toast.success(`Welcome back ${res.email}`, 'Login Successful', {
          positionClass: "toast-top-right",
          progressBar: true,
          timeOut: 3000
        })

        this.auth.isAuthenticatedSubject.next(true)
        this.route.navigate(['/'])
      },
      error: error => this.toast.error(error.error.message, 'Login Error', {
        positionClass: "toast-top-right",
        progressBar: true,
        timeOut: 3000
      })
    })
  }
}
