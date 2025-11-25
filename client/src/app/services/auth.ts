import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../API/api';
import { Router } from '@angular/router';
import { toast } from 'ngx-sonner';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  constructor(private api: API, private router: Router) {}

  registerUser(userData: any) {
    this.api.registerUser(userData).subscribe({
      next: (res) => {
        console.log('AUTH::DATA: ' + res);
        toast.success('Registration successful');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.log('AUTH::ERROR: ' + err);
        toast.error('Registration failed');
      },
    });
  }

  registerConsultant(userData: any) {
    const multipartData = new FormData();
    multipartData.append('firstName', userData.firstName);
    multipartData.append('lastName', userData.lastName);
    multipartData.append('email', userData.email);
    multipartData.append('password', userData.password);
    multipartData.append('phone', userData.phone);
    multipartData.append('experienceYears', userData.experienceYears);
    multipartData.append('qualifications', userData.qualifications);
    multipartData.append('experienceArea', userData.experienceArea);

    // Append file if exists
    if (userData.verificationDocument) {
      multipartData.append('verificationDocument', userData.verificationDocument);
    }
    console.log(userData);

    this.api.registerConsultant(multipartData).subscribe({
      next: (res) => {
        console.log('AUTH:RegisterConsultant::DATA: ' + res);
        toast.success('Registration successful');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.log('AUTH:RegisterConsultant::ERROR: ' + err);
        console.log(err);

        toast.error('Registration failed');
      },
    });
  }

  login(userData: any) {
    this.api.login(userData).subscribe({
      next: (res) => {
         
        console.log('AUTH:LOGIN::DATA: ' + res);
        toast.success('Login successful');
        console.log(res);
        const tokens = res.data;
        sessionStorage.setItem('token', tokens.jwt);
        // // sessionStorage.setItem('refresh', tokens.refresh);
        sessionStorage.setItem('username', tokens.email);
        sessionStorage.setItem('role', tokens.role);
        //switch route based on role 
        if(tokens.role === 'CONSULTANT') {
          this.router.navigate(['/consultant']);
        } else if(tokens.role === 'FARMER'){
          this.router.navigate(['dashboard/farmer-dashboard']);
        } 
      },
      error: (err) => {
        console.log('AUTH:LOGIN::ERROR: ');
        console.log(err);
        
        toast.error('Login failed: ' + (err.error?.message || err.message || 'Unknown error'));
      },
    });
  }
}
