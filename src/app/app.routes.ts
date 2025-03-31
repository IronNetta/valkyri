import { Routes } from '@angular/router';

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
        loadComponent: () => import('./features/user/pages/user-list/user-list.component').then(m => m.UserListComponent)
      },
      {
        path: 'product/:id',
        loadComponent: () => import('./features/products/components/pages/single-product-page/single-product-page.component').then(m => m.SingleProductPageComponent)
      }
];
