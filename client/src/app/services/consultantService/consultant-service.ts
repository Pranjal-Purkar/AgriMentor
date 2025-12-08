import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from '../../API/api-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ConsultantService {

  private consultantDataSubject = new BehaviorSubject<any | null>(null);
    consultantData$ = this.consultantDataSubject.asObservable();

   
  
    constructor(
    private api: ApiService, 
    private router: Router,
  ) {} 

  getConsultantProfile() {
    if(!this.consultantDataSubject.getValue()) {   
      this.getConsultantProfileData();
    }
    console.log("getConsultantProfile");
      console.log(this.consultantDataSubject.getValue());
    return this.consultantData$;
  }

getConsultantProfileData() {
    this.api.getConsultantProfile().subscribe({
      next: (res: any) => {
        this.consultantDataSubject.next(res.data);
      },
      error: (err: any) => {
        console.log('CONSULTANT::ERROR: ', err);
      },
    });
  }

  updateConsultantProfile(profileData: any){
    console.log("inside consultant profile");
    
    this.api.updateConsultantProfile(profileData).subscribe({
      next: (res: any) => {
        this.getConsultantProfileData();
        console.log('CONSULTANT:updateProfile::SUCCESS: ', res);
        console.log(res);
      },
      error: (err: any) => {
        console.error('CONSULTANT:updateProfile::ERROR: ', err);
        console.error(err);
      }
    });
  }

  
}
