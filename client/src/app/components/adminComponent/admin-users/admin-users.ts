import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-users',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-users.html',
  styleUrl: './admin-users.css',
})
export class AdminUsers {
  // Mock data - replace with actual API calls
  totalUsers = 2847;
  farmers = 1523;
  consultants = 1324;
  activeUsers = 2156;

  users = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      email: 'rajesh@example.com',
      role: 'Farmer',
      status: 'Active',
      joined: '2024-01-15',
      location: 'Maharashtra',
    },
    {
      id: 2,
      name: 'Dr. Priya Sharma',
      email: 'priya@example.com',
      role: 'Consultant',
      status: 'Active',
      joined: '2024-02-20',
      location: 'Punjab',
    },
    {
      id: 3,
      name: 'Amit Patel',
      email: 'amit@example.com',
      role: 'Farmer',
      status: 'Active',
      joined: '2024-03-10',
      location: 'Gujarat',
    },
    {
      id: 4,
      name: 'Dr. Suresh Reddy',
      email: 'suresh@example.com',
      role: 'Consultant',
      status: 'Pending',
      joined: '2024-11-25',
      location: 'Telangana',
    },
    {
      id: 5,
      name: 'Lakshmi Devi',
      email: 'lakshmi@example.com',
      role: 'Farmer',
      status: 'Active',
      joined: '2024-04-05',
      location: 'Karnataka',
    },
  ];

  searchTerm = '';
  selectedFilter = 'all';

  getInitials(name: string): string {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  }

  getRoleColor(role: string): string {
    return role === 'Farmer' ? 'emerald' : 'indigo';
  }

  getStatusClass(status: string): string {
    return status === 'Active'
      ? 'bg-green-100 text-green-700 border-green-200'
      : 'bg-amber-100 text-amber-700 border-amber-200';
  }
}
