import { Injectable } from '@angular/core';
import { ApiService } from '../../API/api-service';
import { Router } from '@angular/router';
import { toast } from 'ngx-sonner';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FarmerService {

  private farmerDataSubject = new BehaviorSubject<any | null>(null);
  farmerData$ = this.farmerDataSubject.asObservable();

  private consultationRequestSubject = new BehaviorSubject<any | null>(null);
  consultationRequest$ = this.consultationRequestSubject.asObservable();


  constructor(
    private api: ApiService, 
    private router: Router,
  ) {} 

  getFarmerProfile() {
    if(!this.farmerDataSubject.getValue()) {   
      this.getFarmerProfileData();
    }
    console.log("getFarmerProfile");
      console.log(this.farmerDataSubject.getValue());
    return this.farmerData$;
  }

  getFarmerProfileData() {
    this.api.getFarmer().subscribe({
      next: (res: any) => {
        this.farmerDataSubject.next(res.data);
      },
      error: (err: any) => {
        console.log('FARMER::ERROR: ', err);
      },
    });
  }

  updateFarmerProfile(farmerProfile:any){
    this.api.updateFarmerProfile(farmerProfile).subscribe({
      next: (res: any) => {
        this.farmerDataSubject.next(res.data);
        toast.success(res.message);
        this.getFarmerProfileData()
      },
      error: (err: any) => {
        console.log('FARMER::ERROR: ', err);
      },
    });
  }

  


  getConsultationRequest() {
    if(!this.consultationRequestSubject.getValue()) {   
      this.getConsultationRequestData();
    }
    console.log("getConsultationRequest");
      console.log(this.consultationRequestSubject.getValue());
    return this.consultationRequest$;
  }


  getConsultationRequestData() {
    this.api.getConsultationsRequests().subscribe({
      next: (res: any) => {
        this.consultationRequestSubject.next(res.data);
        toast.success(res.message);
      },
      error: (err: any) => {
        console.log('FARMER::ERROR: ', err);
      },
    });
  }
}
