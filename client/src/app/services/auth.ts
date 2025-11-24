import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../API/api';
import { Router } from '@angular/router';
import { toast } from 'ngx-sonner';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  
  constructor(
    private api: API,
    private router: Router
  ){}

  registerUser(userData: any){
    this.api.registerUser(userData).subscribe({
      next: (res) => {
        console.log("AUTH::DATA: "+res);
        toast.success("Registration successful")
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.log("AUTH::ERROR: "+err);
        toast.error("Registration failed")
      }
    })
  }

  registerConsultant(userData: any){
    this.api.registerConsultant(userData).subscribe({
      next: (res) => {
        console.log("AUTH:RegisterConsultant::DATA: "+res);
        toast.success("Registration successful")
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.log("AUTH:RegisterConsultant::ERROR: "+err);
        toast.error("Registration failed")
      }
    })
  }

   login(userData: any){
    this.api.login(userData).subscribe({
      next: (res) => {
        console.log("AUTH:LOGIN::DATA: "+res);
        toast.success("Login successful")
        console.log(res);
        
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.log("AUTH:LOGIN::ERROR: "+err);
        toast.error("Login failed: " + (err.error?.message || err.message || 'Unknown error'));
      }
    })
  }
}
