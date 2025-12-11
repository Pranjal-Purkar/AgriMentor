import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../../services/adminService/admin.service';
import { AdminUser, UserStatistics } from '../../../interfaces/admin.interfaces';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-admin-users',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-users.html',
  styleUrl: './admin-users.css',
})
export class AdminUsers implements OnInit {
  // Statistics
  userStats: UserStatistics | null = null;

  // Users list
  users: AdminUser[] = [];
  filteredUsers: AdminUser[] = [];

  // UI state
  searchTerm = '';
  selectedFilter = 'all';
  isLoading = true;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadUserStatistics();
    this.loadAllUsers();
  }

  loadUserStatistics(): void {
    this.adminService.getUserStatistics().subscribe({
      next: (response) => {
        this.userStats = response.data;
      },
      error: (error) => {
        console.error('Error loading user statistics:', error);
        toast.error('Failed to load user statistics');
      },
    });
  }

  loadAllUsers(): void {
    this.isLoading = true;
    this.adminService.getAllUsers().subscribe({
      next: (response) => {
        this.users = response.data;
        this.filteredUsers = this.users;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading users:', error);
        toast.error('Failed to load users');
        this.isLoading = false;
      },
    });
  }

  toggleUserStatus(user: AdminUser): void {
    this.adminService.toggleUserStatus(user.email).subscribe({
      next: (response) => {
        toast.success(response.message || 'User status updated');
        this.loadAllUsers(); // Reload users
      },
      error: (error) => {
        console.error('Error toggling user status:', error);
        toast.error('Failed to update user status');
      },
    });
  }

  getInitials(firstName: string, lastName: string): string {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  }

  getRoleColor(role: string): string {
    return role === 'FARMER' ? 'emerald' : 'indigo';
  }

  getStatusClass(isActive: boolean): string {
    return isActive
      ? 'bg-green-100 text-green-700 border-green-200'
      : 'bg-red-100 text-red-700 border-red-200';
  }

  getStatusText(isActive: boolean): string {
    return isActive ? 'Active' : 'Inactive';
  }
}
