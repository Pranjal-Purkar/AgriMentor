import { Routes } from '@angular/router';
import { HomeLayout } from './components/home-layout/home-layout';
import { Home } from './components/home/home';
import { Farmer } from './components/register/farmer/farmer';
import { Consultant } from './components/register/consultant/consultant';

export const routes: Routes = [
  {
    path: '',
    component: HomeLayout,
    children: [
      { 
        path: '',
        component: Home 
      }, 
      { 
        path: 'register-farmer', 
        component: Farmer 
      },
      {
        path: 'register-consultant',
        component: Consultant
      }
    ],
  },
  { path: '**', redirectTo: '' },
];
