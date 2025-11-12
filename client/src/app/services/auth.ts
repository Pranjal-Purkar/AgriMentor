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
        console.log(res);
        toast.success("Registration successful")
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.log(err);
        toast.error("Registration failed")
      }
    })
  }

}
