import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, RedirectCommand, Router } from '@angular/router';

const authenticationRoutes = ['login', 'signup', 'forgot-password'];

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  console.log(route, state, route.routeConfig?.path === 'login');
  if (checkSiteList(state.url) && localStorage.getItem('auth_token')) {
    return new RedirectCommand(router.createUrlTree(['/home']));
  }
  return true;
};

function checkSiteList(url: string): boolean {
  authenticationRoutes.forEach((element) => {
    if (url.endsWith(element)) {
      return false;
    }
  });
  return true;
}
