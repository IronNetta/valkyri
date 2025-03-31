import { Routes } from '@angular/router';
import {isConnectedGuard} from './features/shared/guards/is-connected.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
      {
        path: 'home',
        loadComponent: () => import('./features/home/pages/home/home.component').then(m => m.HomeComponent)
      },
      {
        path: 'users',
        loadComponent: () => import('./features/user/pages/user-list/user-list.component').then(m => m.UserListComponent),
        canActivate: [isConnectedGuard]
      },
  {
    path: 'products',
    loadComponent: () => import('./features/products/pages/product-list/product-list.component').then(m => m.ProductListComponent),
    canActivate: [isConnectedGuard]
  }
];
