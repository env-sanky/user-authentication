import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(private fb: FormBuilder, private router: Router) {

  }
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const savedUser = JSON.parse(localStorage.getItem('user') || '{}');

    if (localStorage.getItem('isLoggedIn') === 'true' &&
      savedUser.email === this.loginForm.value.email &&
      savedUser.password === this.loginForm.value.password) {
      alert('You are already logged in.');
      return;
    }

    if (savedUser.email === this.loginForm.value.email &&
      savedUser.password === this.loginForm.value.password) {

      localStorage.setItem('isLoggedIn', 'true');
      this.router.navigate(['/dashboard']);

    } else {
      alert('Invalid email or password');
    }
  }

}
