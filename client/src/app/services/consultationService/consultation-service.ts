import { Injectable } from '@angular/core';
import { ApiService } from '../../API/api-service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConsultationService {
  constructor(
    private api: ApiService, 
    private router: Router,
  ) {} 


   private listConsultationDataSubject = new BehaviorSubject<any | null>(null);
  listConsultationData$ = this.listConsultationDataSubject.asObservable();

  getConsultationRequests() {
    if(!this.listConsultationDataSubject.getValue()) {   
      this.getListConsultationRequestsData();
    }
    console.log("getConsultationRequests");
    console.log(this.listConsultationDataSubject.getValue());
    return this.listConsultationData$;
  }

  getListConsultationRequestsData() {
    console.log("🔵 Fetching consultation requests from API...");
    this.api.getConsultationRequestsByConsultant().subscribe({
      next: (res: any) => {
        console.log("✅ CONSULTANT::getListConsultationRequestsData::SUCCESS: ", res);
        this.listConsultationDataSubject.next(res.data);
      },
      error: (err: any) => {
        console.error('❌ CONSULTANT::getListConsultationRequestsData::ERROR: ', err);
      },
    });
  }

  acceptConsultationRequest(consultationId: any) {
    console.log("🟡 Accepting consultation request:", consultationId);
    this.api.acceptConsultationRequest(consultationId).subscribe({
      next: (res: any) => {
        console.log("✅ CONSULTANT::acceptConsultationRequest::SUCCESS: ", res);
        
        // Refresh data immediately after success
        setTimeout(() => {
          this.getListConsultationRequestsData();
        }, 500); // Small delay to ensure backend updates
      },
      error: (err: any) => {
        console.error('❌ CONSULTANT::acceptConsultationRequest::ERROR: ', err);
      },
    });
  }

  rejectConsultationRequest(consultationId: any) {
    console.log("🟡 Rejecting consultation request:", consultationId);
    this.api.rejectConsultationRequest(consultationId).subscribe({
      next: (res: any) => {
        console.log("✅ CONSULTANT::rejectConsultationRequest::SUCCESS: ", res);
        
        // Refresh data immediately after success
        setTimeout(() => {
          this.getListConsultationRequestsData();
        }, 500); // Small delay to ensure backend updates
      },
      error: (err: any) => {
        console.error('❌ CONSULTANT::rejectConsultationRequest::ERROR: ', err);
      },
    });
  }

  // SCHEDULE FARM VISIT
  scheduleFarmVisit(farmVisitData: any) {
    return this.api.scheduleFarmVisit(farmVisitData);
  }
}
