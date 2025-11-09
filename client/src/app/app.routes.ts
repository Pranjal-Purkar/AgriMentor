import { Routes } from '@angular/router';
import { HomeLayout } from './components/home-layout/home-layout';
import { Home } from './components/home/home';

export const routes: Routes = [
     {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: HomeLayout,
    children:[
       {
        path: 'home',
        component: Home,
      },
    ]
  },
];
