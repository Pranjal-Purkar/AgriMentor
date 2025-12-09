import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FarmerService } from '../../../services/farmerService/farmer-service';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-cosultation-details',
  imports: [CommonModule, DatePipe],
  templateUrl: './cosultation-details.html',
  styleUrl: './cosultation-details.css',
})
export class CosultationDetails implements OnInit {

  consultation: any = null;
  isLoading: boolean = true;

  activeTab: string = 'request';

  constructor(
    private route: ActivatedRoute,
    private farmerService: FarmerService,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.loadConsultationDetails(+id);
  }

  loadConsultationDetails(id: number) {
    this.farmerService.getConsultationRequest().subscribe({
      next: (list) => {
        this.consultation = list.find((item: any) => item.id === id);
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  setTab(tabName: string) {
    this.activeTab = tabName;
  }
}
