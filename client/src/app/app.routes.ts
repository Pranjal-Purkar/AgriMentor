import { Routes } from '@angular/router';
import { Home } from './components/homeComponents/home/home';
import { HomeLayout } from './layouts/home-layout/home-layout';
import { Login } from './components/homeComponents/login/login';
import { FarmerRegister } from './components/homeComponents/farmer-register/farmer-register';
import { ConsultantRegister } from './components/homeComponents/consultant-register/consultant-register';
import { animation } from '@angular/animations';
import { ForgotPassword } from './components/homeComponents/forgot-password/forgot-password';
import { FarmerDashboardLayout } from './layouts/farmer-dashboard-layout/farmer-dashboard-layout';
import { FarmerHome } from './components/farmerComponents/farmer-home/farmer-home';

export const routes: Routes = [
    {
        path: '',
        component: HomeLayout,
        children:[
            {
                path: '',
                component: Home,
                 data: { animation: 'Home' } 
            },
            {
                path:'login',
                component:Login,
                 data: { animation: 'Login' } 
            },
            {
                path:'register/farmer',
                component:FarmerRegister,
                data:{
                    animation:'FarmerRegister'
                }
            },
            {
                path:'register/consultant',
                component:ConsultantRegister,
                data:{
                    animation:'ConsultantRegister'
                }
            },
            {
                path: 'forgot/password',
                component: ForgotPassword,
                data: { animation: 'ForgotPassword' }
            }
        ]
    },
    {
        path:'dashboard/farmer',
        component:FarmerDashboardLayout,
        children:[
            {
                path: '',
                component: FarmerHome,
                 data: { animation: 'Home' } 
            }
        ]
        
    }
];
