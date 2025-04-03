import { Routes } from '@angular/router';
import {isConnectedGuard} from "./features/shared/guards/is-connected.guard";
import {SingleProductPageComponent} from './features/products/pages/single-product-page/single-product-page.component';
import {CreateWarehouseComponent} from './features/warehouse/components/create/create.component';

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
      {
        path: 'stock',
        loadComponent: () => import('./features/stock/pages/stock-list/stock-list.component').then(m => m.StockListComponent),
        canActivate: [isConnectedGuard]
      },
      {
        path: 'stock/stock/user',
        loadComponent: () => import('./features/stock/pages/stock-list-user/stock-list-user.component').then(m => m.StockListUserComponent),
        canActivate: [isConnectedGuard]
      },
      {
        path: 'stock/product/:id',
        loadComponent: ()=> import('./features/stock/pages/stock-single-product/stock-single-product.component').then(m => m.StockSingleProductComponent),
        canActivate: [isConnectedGuard]
      },
      {
        path: 'stock/low',
        loadComponent: () => import('./features/stock/pages/low-stock/low-stock.component').then(m => m.LowStockComponent),
        canActivate: [isConnectedGuard]
      },

  {
    path:'warehouse/create',
    loadComponent: () => import('./features/warehouse/components/create/create.component').then(m => m.CreateWarehouseComponent),
    canActivate: [isConnectedGuard]
  },
  {
    path: 'warehouses',
    loadComponent: () => import('./features/warehouse/pages/warehouse-list/warehouse-list.component').then(m => m.WarehouseListComponent),
    canActivate: [isConnectedGuard]
  }
];
