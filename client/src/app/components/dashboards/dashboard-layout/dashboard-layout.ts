import { Component } from '@angular/core';
import { FarmerDashboardLayout } from "../farmer/farmer-dashboard-layout/farmer-dashboard-layout";
import { AdminDashboardLayout } from "../admin/admin-dashboard-layout/admin-dashboard-layout";
@Component({
  selector: 'app-dashboard-layout',
  imports: [FarmerDashboardLayout, AdminDashboardLayout],
  templateUrl: './dashboard-layout.html',
  styleUrl: './dashboard-layout.css',
})
export class DashboardLayout {

}
