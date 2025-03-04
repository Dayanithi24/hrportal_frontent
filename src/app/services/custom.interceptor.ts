import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';

export const customInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.includes('/authenticate/')) {
    return next(req.clone());
  }

  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (token && token !== 'null' && token !== 'undefined') {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && error.error?.message === 'JWT_EXPIRED') {
        Swal.fire('Warning', 'JWT expired, clearing session...', 'warning');
        localStorage.clear();
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};
