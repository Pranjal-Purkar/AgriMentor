import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass, NgStyle } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NgClass,NgStyle],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  roles = ['FARMER', 'CONSULTANT', 'ADMIN'];
  activeRole = 'FARMER';

  loginForm: FormGroup;

  constructor(private fb: FormBuilder,private router: Router,private authService:Auth) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: [this.activeRole, Validators.required],
    });
  }

  setRole(role: string) {
    if (this.activeRole !== role) {
      this.activeRole = role;
      this.loginForm.patchValue({ role: role });
    }
  }

  get f() {
    return this.loginForm.controls;
  }

  getResponsiveTranslate() {
    const index = this.roles.indexOf(this.activeRole);
    
    // Check if window is defined (browser environment)
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) {      // sm
        return `translateX(${index * 310}%)`;
      } else if (window.innerWidth < 1024) { // md
        return `translateX(${index * 320}%)`;
      }
    }
    // Default for server-side rendering and lg screens
    return `translateX(${index * 320}%)`;
  }


  onSubmit() {
    
    console.log(this.loginForm.value);
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    console.log('Logging in as:', this.activeRole);
    console.log('Form Value:', this.loginForm.value);
    this.authService.login(this.loginForm.value)    
  }

  toRegister() {
    if(this.activeRole === 'FARMER') {
      this.router.navigate(['/register-farmer']);
    } else if(this.activeRole === 'CONSULTANT') {
      this.router.navigate(['/register-consultant']);
    }
  }
}
