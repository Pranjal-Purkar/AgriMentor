import { Component, OnInit, OnDestroy, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserCard } from '../../user-card/user-card';
import { ApiService } from '../../../API/api-service';
import AOS from 'aos';
import { ConsultantService } from '../../../services/consultantService/consultant-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-consultant',
  imports: [CommonModule, UserCard],
  templateUrl: './consultant.html',
  styleUrl: './consultant.css',
})
export class Consultant implements OnInit, AfterViewInit, OnDestroy {
  consultants: any[] = [];
  filteredConsultants: any[] = [];
  isLoading = true;
  searchTerm = '';
  private subscription!: Subscription;

  constructor(
    private consultantService: ConsultantService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadConsultants();

    // Initialize AOS
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      offset: 100,
    });
  }

  ngAfterViewInit(): void {
    // Refresh AOS after view init
    setTimeout(() => {
      AOS.refresh();
    }, 100);
  }

  ngOnDestroy(): void {
    // Clean up AOS
    AOS.refresh();
  }

  /**LOADING CONSULTANTS */
  loadVerifiedConsultant() {}

  loadConsultants(): void {
    this.isLoading = true;
    this.subscription = this.consultantService.getVerifiedConsultants().subscribe((state: any) => {
      console.log('Consultants loaded:', state);
      // The response is already an array from the BehaviorSubject
      if (Array.isArray(state)) {
        this.consultants = state;
      } else {
        this.consultants = [];
      }

      this.filteredConsultants = this.consultants;
      console.log('Processed consultants:', this.consultants);
      console.log('Filtered consultants:', this.filteredConsultants);
      this.isLoading = false;
      this.cdr.detectChanges();

      // Refresh AOS after data loads
      setTimeout(() => {
        AOS.refresh();
      }, 100);
    });
  }

  onSearch(event: any): void {
    this.searchTerm = event.target.value.toLowerCase();
    this.filteredConsultants = this.consultants.filter((consultant) => {
      const fullName = `${consultant.firstName} ${consultant.lastName}`.toLowerCase();
      const email = consultant.email?.toLowerCase() || '';
      const specialization = consultant.specialization?.toLowerCase() || '';

      return (
        fullName.includes(this.searchTerm) ||
        email.includes(this.searchTerm) ||
        specialization.includes(this.searchTerm)
      );
    });

    // Refresh AOS after filtering
    setTimeout(() => {
      AOS.refresh();
    }, 50);
  }

  handleCardAction(event: { action: string; user: any }): void {
    console.log('Card action:', event);

    if (event.action === 'view') {
      // Navigate to consultant profile or details
      this.router.navigate(['/farmer/consultant/profile', event.user.id]);
    } else if (event.action === 'request') {
      // Navigate to consultation request form with consultant pre-selected
      this.router.navigate(['/farmer/consultation-request'], {
        queryParams: { consultantId: event.user.id },
      });
    }
  }
}
