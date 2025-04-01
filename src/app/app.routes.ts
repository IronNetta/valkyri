import { Routes } from '@angular/router';
import {isConnectedGuard} from "./features/shared/guards/is-connected.guard";
import {SingleProductPageComponent} from './features/products/pages/single-product-page/single-product-page.component';

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
        path: 'product/create',
        loadComponent: () => import('./features/products/components/create/create.component').then(m => m.CreateComponent),
        canActivate: [isConnectedGuard]
      },
      {
        path: 'product/update/:id',
        loadComponent: () => import('./features/products/components/update/update.component').then(m => m.UpdateComponent),
        canActivate: [isConnectedGuard]
      },
      {
        path: 'product/:id',
        loadComponent: () => import('./features/products/pages/single-product-page/single-product-page.component').then(m => m.SingleProductPageComponent),
      },
      {
        path: 'users',
        loadComponent: () => import('./features/user/pages/user-list/user-list.component').then(m => m.UserListComponent)
      },

      {
        path: 'product/update/:id',
        loadComponent: () => import('./features/products/components/update/update.component').then(m => m.UpdateComponent)
      },
        {
          path: 'products/:id',
          loadComponent: () => import('./features/products/pages/single-product-page/single-product-page.component').then(m => m.SingleProductPageComponent)
        },
      {
        path: 'products',
        loadComponent: () => import('./features/products/pages/product-list/product-list.component').then(m => m.ProductListComponent)
      },
];
