import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth-service';
import { toast } from 'ngx-sonner';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Check if user is logged in
    if (!this.authService.isLoggedIn()) {
      toast.error('Please login to access this page');
      return this.router.createUrlTree(['/login']);
    }

    // Get the required roles from the route data
    const expectedRoles = route.data['roles'] as Array<string>;

    // If no specific roles are required, allow access
    if (!expectedRoles || expectedRoles.length === 0) {
      return true;
    }

    const userRole = this.authService.getUserRole();

    // Check if the user's role is authorized
    if (userRole && expectedRoles.includes(userRole)) {
      return true;
    }

    // User does not have the required role
    toast.error('You are not authorized to access this page');

    // Redirect based on role
    if (userRole === 'ADMIN') {
      return this.router.createUrlTree(['/admin/home']);
    } else if (userRole === 'CONSULTANT') {
      return this.router.createUrlTree(['/consultant/dashboard']);
    } else if (userRole === 'FARMER') {
      return this.router.createUrlTree(['/farmer/dashboard']);
    } else {
      // Fallback if role is unknown or invalid
      return this.router.createUrlTree(['/login']);
    }
  }
}
