import { Routes } from '@angular/router';
import { Layout } from './layout/layout';
import { Header } from './layout/components/header/header';
import { Home } from './pages/home/home';
import { LoginLayout } from './auth/components/login-component/login-layout';
import { authGuard } from './auth/guards/auth-guard';
import { SignupComponent } from './auth/components/signup-component/signup-component';
import { ForgotPasswordComponent } from './auth/components/forgot-password-component/forgot-password-component';
import { LoginformComponent } from './auth/components/loginform-component/loginform-component';

export const routes: Routes = [
  {
    path: 'home',
    component: Layout,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: Home,
      },
    ],
  },
  {
    path: '',
    component: LoginLayout,
    canActivate: [authGuard],
    children: [
      {
        path: 'signup',
        component: SignupComponent,
      },{
        path: 'login',
        component: LoginformComponent,
      },{
        path: 'forgot-password',
        component: ForgotPasswordComponent,
      },
    ]
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [authGuard],
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    canActivate: [authGuard],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
