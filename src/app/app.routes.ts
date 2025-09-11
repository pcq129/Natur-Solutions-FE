import { Routes } from '@angular/router';
import { Layout } from './layout/layout';
import { Header } from './layout/components/header/header';
import { Home } from './pages/home/home';
import { LoginLayout } from './auth/components/login-component/login-layout';
import { authGuard } from './auth/guards/auth-guard';
import { SignupComponent } from './auth/components/signup-component/signup-component';
import { ForgotPasswordComponent } from './auth/components/forgot-password-component/forgot-password-component';
import { LoginformComponent } from './auth/components/loginform-component/loginform-component';
import { ResetPasswordComponent } from './auth/components/reset-password-component/reset-password-component';
import { CmsComponent } from './pages/cms/components/cms-component/cms-component';
import { cmsResolverResolver } from './pages/cms/resolvers/cms-resolver-resolver';
import { ProductDetailComponent } from './pages/product/components/product-detail-component/product-detail-component';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '',
        component: Home,
      },
      {
        path: 'documentations/:cms',
        component: CmsComponent,
        resolve: {
          cms: cmsResolverResolver,
        },
      },
      {
        path: 'products/:productId',
        component: ProductDetailComponent,
      }
    ],
  },
  {
    path: 'auth',
    component: LoginLayout,
    canActivate: [authGuard],
    children: [
      {
        path: 'signup',
        component: SignupComponent,
      },
      {
        path: '',
        component: LoginformComponent,
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
      },
      {
        path: 'reset-password',
        component: ResetPasswordComponent,
      },

    ],
  },
  // {
  //   path: 'signup',
  //   component: SignupComponent,
  //   canActivate: [authGuard],
  // },

  // {
  //   path: 'forgot-password',
  //   component: ForgotPasswordComponent,
  //   canActivate: [authGuard],
  // },
  {
    path: '**',
    redirectTo: '',
  },
];
