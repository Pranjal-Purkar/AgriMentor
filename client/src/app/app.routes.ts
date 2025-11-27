import { Routes } from '@angular/router';
import { HomeLayout } from './components/home-layout/home-layout';
import { Home } from './components/home/home';
import { Farmer } from './components/register/farmer/farmer';
import { Consultant } from './components/register/consultant/consultant';
import { Login } from './components/login/login';
import { DashboardLayout } from './components/dashboards/dashboard-layout/dashboard-layout';
import { FarmerDashboardLayout } from './components/dashboards/farmer/farmer-dashboard-layout/farmer-dashboard-layout';
import { AdminDashboard } from './components/dashboards/admin/admin-dashboard/admin-dashboard';
import { AdminDashboardLayout } from './components/dashboards/admin/admin-dashboard-layout/admin-dashboard-layout';

export const routes: Routes = [
  {
    path: '',
    component: HomeLayout,
    children: [
      {
        path: '',
        component: Home,
      },
      {
        path: 'register-farmer',
        component: Farmer,
      },
      {
        path: 'register-consultant',
        component: Consultant,
      },
      {
        path: 'login',
        component: Login,
      },
    ],
  },
  {
    path: 'dashboard',
    component: DashboardLayout,
    children: [
      {
        path: 'farmer-dashboard',
        component: FarmerDashboardLayout,
      },
      {
        path: 'admin-dashboard',
        component: AdminDashboardLayout
      }
    ],

  },
  { path: '**', redirectTo: '' },
];
