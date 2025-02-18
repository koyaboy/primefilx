import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { switchMap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  isLoggingIn = this.auth.isLoggingIn;

  @ViewChild('emailInput') emailInput!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private toast: ToastrService,
    private route: Router,
    private spinner: NgxSpinnerService
  ) {}

  ngAfterViewInit(): void {
    this.spinner.show();
    this.emailInput.nativeElement.focus();
  }

  onSubmit(): void {
    let email = this.loginForm.value.email as string;
    email = email.toLowerCase();
    let password = this.loginForm.value.password as string;

    let authFlow = this.auth
      .login(email, password)
      .pipe(switchMap(() => this.auth.getUser(email)));

    authFlow.subscribe({
      next: (user) => {
        this.auth.saveUserToLocalStorage(user);

        this.toast.success(`Welcome back ${user.email}`, 'Login Successful', {
          positionClass: 'toast-top-right',
          progressBar: true,
          timeOut: 3000,
        });

        this.spinner.hide();
        this.route.navigate(['/']);
      },
      error: (error) => {
        this.toast.error(error.error.message, 'Login Error', {
          positionClass: 'toast-top-right',
          progressBar: true,
          timeOut: 3000,
        });

        this.spinner.hide();
      },
    });
  }
}
