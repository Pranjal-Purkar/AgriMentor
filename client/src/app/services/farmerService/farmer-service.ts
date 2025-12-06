import { Injectable } from '@angular/core';
import { ApiService } from '../../API/api-service';
import { Router } from '@angular/router';
import { toast } from 'ngx-sonner';

@Injectable({
  providedIn: 'root',
})
export class FarmerService {
  constructor(
    private api: ApiService, 
    private router: Router,
    private farmerService:FarmerService
  ) {} 

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
}
