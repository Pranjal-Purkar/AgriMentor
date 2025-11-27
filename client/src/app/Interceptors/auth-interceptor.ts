import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { Platform } from '../services/platform/platform';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
 const router = inject(Router);
  const platformService = inject(Platform);
  
  // Skip interceptor for login/register requests
  if (req.url.includes('/auth/login') || req.url.includes('/auth/register')) {
    return next(req);
  }

  // Get the auth token from session storage safely
  const token = platformService.getItem('token');

  // If we have a token, add it to the request headers
  if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Token might be expired or invalid, clear it and redirect to login
          platformService.removeItem('token');
          router.navigate(['/login']);
        }
        return throwError(() => error);
      })
    );
  }

  return next(req);
};
