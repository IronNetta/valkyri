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
        path: 'create',
        loadComponent: () => import('./features/products/components/create/create.component').then(m => m.CreateComponent)
      },
      {
        path: 'update/:id',
        loadComponent: () => import('./features/products/components/update/update.component').then(m => m.UpdateComponent)
      },
];
