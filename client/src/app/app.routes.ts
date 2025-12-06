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
import { Consultation } from './components/farmerComponents/consultation/consultation';
import { ConsultationRequest } from './components/farmerComponents/consultation-request/consultation-request';
import { FarmerProfile } from './components/farmerComponents/farmer-profile/farmer-profile';
import { CosultationDetails } from './components/farmerComponents/cosultation-details/cosultation-details';

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
        path:'farmer',
        component:FarmerDashboardLayout,
        children:[
            {
                path: 'dashboard',
                component: FarmerHome,
                 data: { animation: 'Home' } 
            },
            {
                path:'consultation',
                component:Consultation,
                data: { animation: 'Consultation' }
                
            },
            {
                path:'consultation-request',
                component:ConsultationRequest,
                data: { animation: 'ConsultantRegister' }
            },
            {
                path:'profile',
                component:FarmerProfile,
                data: { animation: 'FarmerProfile' },

            },
            {
                path:'consultation-request/:id',
                component:CosultationDetails,
                data: { animation: 'CosultationDetails' },

            }
        ]
        
    }
];
