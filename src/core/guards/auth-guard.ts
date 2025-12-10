import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { environment } from '../../environments/environment.js';
import { Authservice } from '../authservice/authservice.js';

export const authGuard: CanActivateFn = (route, state) => {
  //не забыть изменить логику, когда добавятся роли
  const authService = inject(Authservice);
  const router=inject (Router);

  if(authService.isAdmin()) return true;

   router.navigate(['/login']);
  return false;
 
 
};
