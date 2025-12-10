import { CommonModule, Location } from '@angular/common';
import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FarmVisitiongSchedule } from '../farm-visitiong-schedule/farm-visitiong-schedule';
import { ConsultationService } from '../../../services/consultationService/consultation-service';

@Component({
  selector: 'app-consultant-consulation-details',
  imports: [CommonModule, ReactiveFormsModule, FarmVisitiongSchedule],
  templateUrl: './consultant-consulation-details.html',
  styleUrl: './consultant-consulation-details.css',
})
export class ConsultantConsulationDetails implements OnInit {
  activeTab = 'details';
  consultation: any = null;
  isLoading = true;

  showAddVisitModal = false;
  showAddReportModal = false;

  reports: any[] = [];
  visits: any[] = [];

  reportForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private consultationService: ConsultationService,
    private cdr: ChangeDetectorRef,
    private location: Location
  ) {}

  ngOnInit(): void {
    // Initialize form
    this.reportForm = this.fb.group({
      identifiedIssue: ['', Validators.required],
      recommendations: ['', Validators.required],
      reportText: ['', Validators.required],
      followUpDate: [''],
    });

    // Get ID from route and fetch data
    this.route.paramMap.subscribe((params) => {
      const idStr = params.get('id');
      if (idStr) {
        const id = Number(idStr);
        this.fetchConsultationDetails(id);
      }
    });
  }

  fetchConsultationDetails(id: number) {
    this.isLoading = true;

    // Subscribe to the BehaviorSubject observable
    this.consultationService.listConsultationData$.subscribe({
      next: (data) => {
        if (!data) {
          // Data not yet loaded, trigger initial fetch
          this.consultationService.getConsultationRequests();
          return;
        }

        // Find the specific consultation from the list
        this.consultation = data.find((c: any) => c.id === id);

        if (this.consultation) {
          this.visits = this.consultation.farmVisits || [];
          this.reports = this.consultation.consultationReports || [];
        }

        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('🔴 Error fetching consultation details:', err);
        this.isLoading = false;
        this.cdr.detectChanges();
      },
    });
  }

  goBack() {
    this.location.back();
  }

  // open modals
  openAddVisit() {
    this.showAddVisitModal = true;
  }

  openAddReport() {
    this.showAddReportModal = true;
  }

  // close modals
  closeAddVisit() {
    this.showAddVisitModal = false;
  }

  closeAddReport() {
    this.showAddReportModal = false;
  }

  // when visit scheduled
  handleScheduledVisit(data: any) {
    // We optimistically add it to the list, or re-fetch
    // For now, let's just push to local array
    this.visits.unshift(data); // Add to top
    this.showAddVisitModal = false;

    // Optionally refresh data from server to be sure
    this.consultationService.getListConsultationRequestsData();
  }

  // add report
  submitReport() {
    if (this.reportForm.invalid) {
      this.reportForm.markAllAsTouched();
      return;
    }

    const newReport = {
      ...this.reportForm.value,
      createdAt: new Date().toISOString(),
    };

    // Note: Here we'd typically call an API to save the report
    // For this demo, we'll push to local state
    this.reports.unshift(newReport);
    this.showAddReportModal = false;
    this.reportForm.reset();
  }
}
