import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  
  // Skip interceptor for login/register requests
  if (req.url.includes('/auth/login') || req.url.includes('/auth/register')) {
    return next(req);
  }

  // Get the auth token from session storage
  const token = sessionStorage.getItem('token');

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
          sessionStorage.removeItem('token');
          router.navigate(['/login']);
        }
        return throwError(() => error);
      })
    );
  }


  // If no token, proceed with the original request
  // The server will return 401 if the endpoint requires authentication
  return next(req);
};
