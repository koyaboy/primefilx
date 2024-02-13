import { Component } from '@angular/core';
import { AbstractControlOptions, FormBuilder, Validators } from '@angular/forms';
import { PasswordValidator } from '../../validators/passwordValidator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signupForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    repeatPassword: ['', [Validators.required]],
  },
    { validators: PasswordValidator } as AbstractControlOptions
  )

  constructor(private fb: FormBuilder) { }

  onSubmit() {
    console.log(this.signupForm.valid)
    console.log(this.signupForm.value)
  }
}
