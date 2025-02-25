import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const userRole = authService.getUserRole(); // Example: 'Admin', 'HR', 'Employee'
  const allowedRoles = route.data['roles'] as string[];

  if (!allowedRoles.includes(userRole)) {
    router.navigate(['/unauthorized']); // Redirect to an error page
    return false;
  }
  return true;
};
