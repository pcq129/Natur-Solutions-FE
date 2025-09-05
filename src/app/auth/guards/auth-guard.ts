import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('auth_token');
  const url = state.url;

  if (token) {
    // User is logged in
    if (isPublicRoute(url)) {
      // Logged in but trying to access login/signup → redirect to /home
      return router.createUrlTree(['/home']);
    }
    return true; // allow access to private pages
  }
  return true; // allow access to public pages
};

function isPublicRoute(url: string): boolean {
  return ['/login', '/signup', '/forgot-password'].includes(url);
}

function isPrivateRoute(url: string): boolean {
  // Example: anything under /home is private
  return url.startsWith('/home');
}
