import { Component, ViewChild, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { AbstractControlOptions, FormBuilder, Validators } from '@angular/forms';
import { PasswordValidator } from '../../validators/passwordValidator';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupComponent {
  signupForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    repeatPassword: ['', [Validators.required]],
  },
    { validators: PasswordValidator } as AbstractControlOptions
  )

  isSigningUp!: boolean

  @ViewChild('emailInput') emailInput!: ElementRef


  constructor
    (private fb: FormBuilder,
      private auth: AuthService,
      private toast: ToastrService,
      private route: Router,
      private spinner: NgxSpinnerService
    ) {
    this.auth.isSigningUp.subscribe((signupStatus) => {
      this.isSigningUp = signupStatus
    })
  }


  ngAfterViewInit(): void {
    this.spinner.show()
    this.emailInput.nativeElement.focus()
  }

  onSubmit() {
    const email = this.signupForm.value.email as string
    const password = this.signupForm.value.password as string

    this.auth.signup(email, password).subscribe({
      next: () => {
        this.toast.success(`Registration Complete`, 'Success', {
          positionClass: "toast-top-right",
          progressBar: true,
          timeOut: 3000
        })

        this.spinner.hide()
        this.route.navigate(['/login'])
      },
      error: error => {
        this.toast.error(error.error.message, 'Error', {
          positionClass: "toast-top-right",
          progressBar: true,
          timeOut: 3000
        })
      }
    })
  }
}
