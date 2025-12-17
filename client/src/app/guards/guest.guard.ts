import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth-service';

@Injectable({
  providedIn: 'root',
})
export class GuestGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Check if user is logged in
    if (this.authService.isLoggedIn()) {
      const userRole = this.authService.getUserRole();

      // Redirect to dashboard based on role
      if (userRole === 'ADMIN') {
        return this.router.createUrlTree(['/admin/home']);
      } else if (userRole === 'CONSULTANT') {
        return this.router.createUrlTree(['/consultant/dashboard']);
      } else if (userRole === 'FARMER') {
        return this.router.createUrlTree(['/farmer/dashboard']);
      }
      // If role is somehow missing but token exists, we might normally allow access or clear token
      // But let's assume valid session implies valid role for now.
    }

    // Not logged in, allow access to login/register pages
    return true;
  }
}
