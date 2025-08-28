import { Routes } from '@angular/router';
import { Layout } from './layout/layout';
import { Header } from './layout/components/header/header';
import { Home } from './pages/home/home';

export const routes: Routes = [
  {
    path : '',
    component: Layout,
    children : [
      {
        path: '',
        component: Home
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
