import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AdminService } from '../../../services/adminService/admin-service';
import { ConsultationOverview } from '../../../interfaces/admin.interfaces';
import { toast } from 'ngx-sonner';

type SortColumn = 'id' | 'farmer' | 'consultant' | 'topic' | 'date' | 'status';
type SortDirection = 'asc' | 'desc';

@Component({
  selector: 'app-admin-consultations',
  imports: [CommonModule, DatePipe],
  templateUrl: './admin-consultations.html',
  styleUrl: './admin-consultations.css',
})
export class AdminConsultations implements OnInit {
  consultationStats: ConsultationOverview | null = null;
  consultations: any[] = [];
  sortedConsultations: any[] = [];
  isLoading = true;

  // Sorting state
  sortColumn: SortColumn = 'date';
  sortDirection: SortDirection = 'desc'; // Default: latest first

  // Computed properties for template
  get totalConsultations(): number {
    return this.consultationStats?.totalConsultations || 0;
  }

  get activeConsultations(): number {
    return this.consultationStats?.activeConsultations || 0;
  }

  get completedConsultations(): number {
    return this.consultationStats?.completedConsultations || 0;
  }

  get pendingConsultations(): number {
    return this.consultationStats?.pendingConsultations || 0;
  }

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadConsultationOverview();
    this.loadAllConsultations();
  }

  loadConsultationOverview(): void {
    this.adminService.getConsultationOverview().subscribe({
      next: (response) => {
        this.consultationStats = response.data;
      },
      error: (error) => {
        console.error('Error loading consultation overview:', error);
        toast.error('Failed to load consultation statistics');
      },
    });
  }

  loadAllConsultations(): void {
    this.isLoading = true;
    this.adminService.getAllConsultations().subscribe({
      next: (response) => {
        this.consultations = response.data || [];
        this.sortData(); // Apply default sorting
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading consultations:', error);
        toast.error('Failed to load consultations');
        this.isLoading = false;
      },
    });
  }

  // Toggle sort on column click
  toggleSort(column: SortColumn): void {
    if (this.sortColumn === column) {
      // Toggle direction if same column
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      // New column, default to ascending (except date which defaults to desc)
      this.sortColumn = column;
      this.sortDirection = column === 'date' ? 'desc' : 'asc';
    }
    this.sortData();
  }

  // Sort the data
  sortData(): void {
    this.sortedConsultations = [...this.consultations].sort((a, b) => {
      let valueA: any;
      let valueB: any;

      switch (this.sortColumn) {
        case 'id':
          valueA = a.id || 0;
          valueB = b.id || 0;
          break;
        case 'farmer':
          valueA = `${a.farmer?.firstName || ''} ${a.farmer?.lastName || ''}`.toLowerCase().trim();
          valueB = `${b.farmer?.firstName || ''} ${b.farmer?.lastName || ''}`.toLowerCase().trim();
          break;
        case 'consultant':
          valueA = `${a.consultant?.firstName || ''} ${a.consultant?.lastName || ''}`
            .toLowerCase()
            .trim();
          valueB = `${b.consultant?.firstName || ''} ${b.consultant?.lastName || ''}`
            .toLowerCase()
            .trim();
          break;
        case 'topic':
          valueA = (a.topic || a.crop?.name || '').toLowerCase();
          valueB = (b.topic || b.crop?.name || '').toLowerCase();
          break;
        case 'date':
          valueA = new Date(a.createdAt || 0).getTime();
          valueB = new Date(b.createdAt || 0).getTime();
          break;
        case 'status':
          valueA = (a.consultationStatus || a.status || '').toLowerCase();
          valueB = (b.consultationStatus || b.status || '').toLowerCase();
          break;
        default:
          return 0;
      }

      // Compare values
      if (valueA < valueB) return this.sortDirection === 'asc' ? -1 : 1;
      if (valueA > valueB) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }

  // Get sort icon for column header
  getSortIcon(column: SortColumn): string {
    if (this.sortColumn !== column) {
      return 'neutral'; // Show both arrows
    }
    return this.sortDirection;
  }
}
