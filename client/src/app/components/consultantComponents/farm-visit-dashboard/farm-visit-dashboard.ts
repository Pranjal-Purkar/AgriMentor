import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FarmVisit } from '../../../services/farmVisit/farm-visit';
import { FarmVisitResponse } from '../../../API/farmVisitingAPI/farm-visiting-api';
import { toast } from 'ngx-sonner';

type TabType = 'today' | 'upcoming' | 'completed' | 'canceled' | 'missed';

@Component({
  selector: 'app-farm-visit-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './farm-visit-dashboard.html',
  styleUrl: './farm-visit-dashboard.css',
})
export class FarmVisitDashboard implements OnInit {
  allVisits: FarmVisitResponse[] = [];
  filteredVisits: FarmVisitResponse[] = [];
  isLoading = true;
  activeTab: TabType = 'today';
  searchQuery = '';

  constructor(private farmVisitService: FarmVisit, private router: Router) {}

  ngOnInit(): void {
    this.loadAllVisits();
  }

  loadAllVisits(): void {
    this.isLoading = true;
    this.farmVisitService.getAllConsultantVisits().subscribe({
      next: (response) => {
        
          this.allVisits = response.data;
          this.filterVisits();

        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading farm visits:', error);
        toast.error('Failed to load farm visits');
        this.isLoading = false;
      },
    });
  }

  switchTab(tab: TabType): void {
    this.activeTab = tab;
    this.filterVisits();
  }

  getTabCount(tab: TabType): number {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return this.allVisits.filter((visit) => {
      const visitDate = new Date(visit.scheduledDate);
      visitDate.setHours(0, 0, 0, 0);

      switch (tab) {
        case 'today':
          return visit.visitStatus === 'SCHEDULED' && visitDate.getTime() === today.getTime();
        case 'upcoming':
          return visit.visitStatus === 'SCHEDULED' && visitDate.getTime() > today.getTime();
        case 'completed':
          return visit.visitStatus === 'COMPLETED';
        case 'canceled':
          return visit.visitStatus === 'CANCELLED';
        case 'missed':
          return visit.visitStatus === 'MISSED';
        default:
          return false;
      }
    }).length;
  }

  filterVisits(): void {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    let filtered = this.allVisits.filter((visit) => {
      const visitDate = new Date(visit.scheduledDate);
      visitDate.setHours(0, 0, 0, 0);

      switch (this.activeTab) {
        case 'today':
          return visit.visitStatus === 'SCHEDULED' && visitDate.getTime() === today.getTime();
        case 'upcoming':
          return visit.visitStatus === 'SCHEDULED' && visitDate.getTime() > today.getTime();
        case 'completed':
          return visit.visitStatus === 'COMPLETED';
        case 'canceled':
          return visit.visitStatus === 'CANCELLED';
        case 'missed':
          return visit.visitStatus === 'MISSED';
        default:
          return false;
      }
    });

    // Apply search filter
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (visit) =>
          visit.consultationTopic?.toLowerCase().includes(query) ||
          visit.firstName?.toLowerCase().includes(query) ||
          visit.farmAddress?.city?.toLowerCase().includes(query) ||
          visit.farmAddress?.state?.toLowerCase().includes(query)
      );
    }

    this.filteredVisits = filtered;
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }

  formatTime(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  viewDetails(consultationId: number): void {
    this.router.navigate(['/consultant/consultation-details', consultationId]);
  }

  completeVisit(visitId: number): void {
    this.farmVisitService.completeVisit(visitId).subscribe({
      next: (response) => {
        
          toast.success('Visit marked as completed');
          this.loadAllVisits();

      },
      error: (error) => {
        console.error('Error completing visit:', error);
        toast.error('Failed to complete visit');
      },
    });
  }

  cancelVisit(visitId: number): void {
    this.farmVisitService.cancelVisit(visitId).subscribe({
      next: (response) => {
       
          toast.success('Visit cancelled');
          this.loadAllVisits();

      },
      error: (error) => {
        console.error('Error cancelling visit:', error);
        toast.error('Failed to cancel visit');
      },
    });
  }
}
