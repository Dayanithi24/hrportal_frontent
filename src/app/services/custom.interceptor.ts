import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const customInterceptor: HttpInterceptorFn = (req, next) => {
  
  if (req.url.includes('/authenticate/')) {
    return next(req.clone()); 
  }

  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (token && token !== 'null' && token !== 'undefined') {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && error.error?.message === 'JWT_EXPIRED') {
        console.warn('JWT expired, clearing session...');
        localStorage.clear();  
        router.navigate(['/login']);  
      }
      return throwError(() => error);
  })
  );
};
