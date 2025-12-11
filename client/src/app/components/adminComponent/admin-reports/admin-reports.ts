import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../services/adminService/admin.service';
import { UserStatistics, ConsultationOverview } from '../../../interfaces/admin.interfaces';

@Component({
  selector: 'app-admin-reports',
  imports: [CommonModule],
  templateUrl: './admin-reports.html',
  styleUrl: './admin-reports.css',
})
export class AdminReports implements OnInit {
  userStats: UserStatistics | null = null;
  consultationStats: ConsultationOverview | null = null;
  isLoading = true;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadStatistics();
  }

  loadStatistics(): void {
    this.isLoading = true;

    // Load user statistics
    this.adminService.getUserStatistics().subscribe({
      next: (response) => {
        this.userStats = response.data;
      },
      error: (error) => {
        console.error('Error loading user statistics:', error);
      },
    });

    // Load consultation statistics
    this.adminService.getConsultationStatistics().subscribe({
      next: (response) => {
        this.consultationStats = response.data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading consultation statistics:', error);
        this.isLoading = false;
      },
    });
  }
}
