import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../API/api';
import { Router } from '@angular/router';

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
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
