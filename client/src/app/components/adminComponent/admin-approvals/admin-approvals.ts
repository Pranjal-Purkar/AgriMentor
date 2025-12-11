import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../services/adminService/admin.service';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-admin-approvals',
  imports: [CommonModule],
  templateUrl: './admin-approvals.html',
  styleUrl: './admin-approvals.css',
})
export class AdminApprovals implements OnInit {
  pendingApprovals = 0;
  approvedToday = 0;
  rejectedToday = 0;

  pendingConsultants: any[] = [];
  isLoading = true;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadPendingConsultants();
  }

  loadPendingConsultants(): void {
    this.isLoading = true;
    this.adminService.getAllConsultants().subscribe({
      next: (response) => {
        // Filter for unverified consultants
        const allConsultants = response.data || [];
        this.pendingConsultants = allConsultants.filter((c: any) => !c.isVerified);
        this.pendingApprovals = this.pendingConsultants.length;

        // Calculate today's approvals/rejections (mock for now)
        this.approvedToday = 0;
        this.rejectedToday = 0;

        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading consultants:', error);
        toast.error('Failed to load pending approvals');
        this.isLoading = false;
      },
    });
  }

  verifyConsultant(username: string): void {
    this.adminService.verifyConsultant(username).subscribe({
      next: (response) => {
        toast.success(response.message || 'Consultant verified successfully');
        this.approvedToday++;
        this.loadPendingConsultants(); // Reload list
      },
      error: (error) => {
        console.error('Error verifying consultant:', error);
        toast.error('Failed to verify consultant');
      },
    });
  }

  rejectConsultant(username: string): void {
    this.adminService.rejectConsultant(username).subscribe({
      next: (response) => {
        toast.success(response.message || 'Consultant rejected successfully');
        this.rejectedToday++;
        this.loadPendingConsultants(); // Reload list
      },
      error: (error) => {
        console.error('Error rejecting consultant:', error);
        toast.error('Failed to reject consultant');
      },
    });
  }
}
