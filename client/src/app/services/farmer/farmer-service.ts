import { Injectable } from '@angular/core';
import { API } from '../../API/api';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FarmerService {
  
  private farmerDataSubject = new BehaviorSubject<any | null>(null);
  farmerData$ = this.farmerDataSubject.asObservable();

  constructor(private api: API) {}

  getFarmerProfile() {
    if(!this.farmerDataSubject.getValue()) {   
      this.getFarmerProfileData();
    }
    console.log("getFarmerProfile");
      console.log(this.farmerDataSubject.getValue());
    return this.farmerData$;
  }

  private getFarmerProfileData() {
    this.api.getFarmer().subscribe({
      next: (res: any) => {
        this.farmerDataSubject.next(res.data);
      },
      error: (err: any) => {
        console.log('FARMER::ERROR: ', err);
      },
    });
  }
}
