import { Injectable } from '@angular/core';
import { API } from '../../API/api';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FarmerService {
  private farmerDataSubject = new Subject<any>();
  farmerData$ = this.farmerDataSubject.asObservable();

  constructor(private api: API) {}

  getFarmer() {
    this.api.getFarmer().subscribe({
      next: (res: any) => {
        console.log('FARMER::DATA: ' + res);
        console.log(res);
        this.farmerDataSubject.next(res);
      },
      error: (err: any) => {
        console.log('FARMER::ERROR: ' + err);
        console.log(err);
      },
    });
  }
}
