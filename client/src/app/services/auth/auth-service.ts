import { Injectable } from '@angular/core';
import { ApiService } from '../../API/api-service';
import { Router } from '@angular/router';
import { FarmerService } from '../farmerService/farmer-service';
import { toast } from 'ngx-sonner';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(
    private api: ApiService, 
    private router: Router,
    // private farmerService:FarmerService
  ) {}
  
  

  isUserAlreadyExist(username: string, role: string): Observable<boolean> {
  return this.api.isUserAlreadyExistst(username, role).pipe(
    map((res: any) => {
      return res.data; // true or false
    })
  );
}

  registerUser(userData: any) {
    console.log("Insede ResgisterUser...");
    
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


  
}
