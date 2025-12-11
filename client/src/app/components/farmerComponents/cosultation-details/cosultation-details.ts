import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FarmerService } from '../../../services/farmerService/farmer-service';
import { ConsultationReportService } from '../../../services/consultationReport/consultation-report-service';
import { FarmVisit } from '../../../services/farmVisit/farm-visit';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-cosultation-details',
  imports: [CommonModule, DatePipe],
  templateUrl: './cosultation-details.html',
  styleUrl: './cosultation-details.css',
})
export class CosultationDetails implements OnInit, OnDestroy {
  consultation: any = null;
  isLoading: boolean = true;
  reports: any[] = [];
  visits: any[] = [];

  activeTab: string = 'request';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private farmerService: FarmerService,
    private reportService: ConsultationReportService,
    private farmVisitService: FarmVisit
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.loadConsultationDetails(+id);
  }

  loadConsultationDetails(id: number) {
    this.farmerService.getConsultationRequest().subscribe({
      next: (list) => {
        this.consultation = list.find((item: any) => item.id === id);

        if (this.consultation) {
          // Load reports using the report service for reactive state
          this.reportService.loadReportsByConsultationId(this.consultation.id);

          // Subscribe to reports state
          this.reportService.currentConsultationReports$.subscribe({
            next: (reports) => {
              if (reports) {
                this.reports = reports;
                console.log('📊 Farmer - Reports updated:', reports);
              }
            },
          });

          // Load farm visits using the farm visit service (read-only for farmer)
          this.farmVisitService.getAllVisitsForConsultation(this.consultation.id);

          // Subscribe to farm visits state
          this.farmVisitService.farmVisits$.subscribe({
            next: (visits) => {
              // Sort visits by nearest date (ascending)
              this.visits = visits.sort((a, b) => {
                const dateA = new Date(a.scheduledDate).getTime();
                const dateB = new Date(b.scheduledDate).getTime();
                return dateA - dateB;
              });
              console.log('📅 Farmer - Farm visits updated and sorted:', this.visits);
            },
          });
        }

        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      },
    });
  }

  setTab(tabName: string) {
    this.activeTab = tabName;
  }

  viewReportDetails(reportId: number): void {
    this.router.navigate(['/farmer/report', reportId]);
  }

  ngOnDestroy() {
    // Clean up report service state when leaving the component
    this.reportService.clearCurrentConsultationReports();
  }
}
