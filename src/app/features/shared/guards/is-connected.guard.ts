import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from '../../features/auth/services/auth.service';
import {inject} from '@angular/core';

export const isConnectedGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  if(!authService.currentUser()){
    router.navigate(['/home']);
  }
  return !!authService.currentUser();
};
