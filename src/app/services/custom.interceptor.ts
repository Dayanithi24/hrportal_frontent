import { HttpInterceptorFn } from '@angular/common/http';

export const customInterceptor: HttpInterceptorFn = (req, next) => {
  
  if (req.url.includes('/authenticate/')) {
    return next(req.clone()); 
  }

  const token = localStorage.getItem('token');

  if (token && token !== 'null' && token !== 'undefined') {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }

  return next(req);
};
