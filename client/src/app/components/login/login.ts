import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass, NgStyle } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NgClass,NgStyle],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  roles = ['Farmer', 'Consultant', 'Admin'];
  activeRole = 'Farmer';

  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  setRole(role: string) {
    if (this.activeRole !== role) {
      this.activeRole = role;
      // Add any additional logic you want to trigger on role change
    }
  }

  get f() {
    return this.loginForm.controls;
  }

  getResponsiveTranslate() {
  const index = this.roles.indexOf(this.activeRole);

  if (window.innerWidth < 640) {      // sm
    return `translateX(${index * 310}%)`;
  } else if (window.innerWidth < 1024) { // md
    return `translateX(${index * 230}%)`;
  } else {                           // lg
    return `translateX(${index * 330}%)`;
  }
}


  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    console.log('Logging in as:', this.activeRole);
    console.log('Form Value:', this.loginForm.value);
  }
}
