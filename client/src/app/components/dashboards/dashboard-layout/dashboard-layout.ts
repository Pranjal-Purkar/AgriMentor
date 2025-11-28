import { Component } from '@angular/core';
import { FarmerDashboardLayout } from "../farmer/farmer-dashboard-layout/farmer-dashboard-layout";
import { AdminDashboardLayout } from "../admin/admin-dashboard-layout/admin-dashboard-layout";
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-dashboard-layout',
  imports: [FarmerDashboardLayout, AdminDashboardLayout, RouterOutlet],
  templateUrl: './dashboard-layout.html',
  styleUrl: './dashboard-layout.css',
})
export class DashboardLayout {

}
