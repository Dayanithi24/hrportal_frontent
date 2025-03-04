import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const userRole = authService.getUserRole()?.split(',');
  const allowedRoles = route.data['roles'] as string[];

  if (userRole) {
    for (let role of userRole) {
      if (allowedRoles.includes(role)) {
        return true;
      }
    }
  }
  router.navigate(['/unauthorized']);
  return false;
};
