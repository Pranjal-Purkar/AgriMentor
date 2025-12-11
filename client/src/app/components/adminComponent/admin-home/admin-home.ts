import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../services/adminService/admin.service';
import { AdminDashboardStats, Activity } from '../../../interfaces/admin.interfaces';

@Component({
  selector: 'app-admin-home',
  imports: [CommonModule],
  templateUrl: './admin-home.html',
  styleUrl: './admin-home.css',
})
export class AdminHome implements OnInit {
  // Dashboard statistics
  dashboardStats: AdminDashboardStats | null = null;
  recentActivities: Activity[] = [];

  // Loading states
  isLoadingStats = true;
  isLoadingActivities = true;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadDashboardStatistics();
    this.loadRecentActivities();
  }

  loadDashboardStatistics(): void {
    console.log('🟢 [AdminHome] Loading dashboard statistics...');
    this.isLoadingStats = true;
    this.adminService.getDashboardStatistics().subscribe({
      next: (response) => {
        console.log('🟢 [AdminHome] Received response:', response);
        this.dashboardStats = response.data;
        console.log('🟢 [AdminHome] Dashboard stats assigned:', this.dashboardStats);
        console.log('🟢 [AdminHome] Total Users:', this.dashboardStats?.totalUsers);
        console.log(
          '🟢 [AdminHome] Active Consultations:',
          this.dashboardStats?.activeConsultations
        );
        console.log('🟢 [AdminHome] Pending Requests:', this.dashboardStats?.pendingRequests);
        this.isLoadingStats = false;
      },
      error: (error) => {
        console.error('🔴 [AdminHome] Error loading dashboard statistics:', error);
        console.error('🔴 [AdminHome] Error status:', error.status);
        console.error('🔴 [AdminHome] Error details:', error.error);
        this.isLoadingStats = false;
      },
    });
  }

  loadRecentActivities(): void {
    this.isLoadingActivities = true;
    this.adminService.getRecentActivities().subscribe({
      next: (response) => {
        this.recentActivities = response.data;
        this.isLoadingActivities = false;
      },
      error: (error) => {
        console.error('Error loading recent activities:', error);
        this.isLoadingActivities = false;
      },
    });
  }
}
