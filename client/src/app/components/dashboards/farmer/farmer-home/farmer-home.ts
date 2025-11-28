import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FarmerService } from '../../../../services/farmer/farmer-service';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Consultation } from '../../consultation/consultation';
import { Card } from '../../card/card';

@Component({
  selector: 'app-farmer-home',
  imports: [Card, Consultation, RouterOutlet, RouterLink],
  templateUrl: './farmer-home.html',
  styleUrl: './farmer-home.css',
})
export class FarmerHome implements OnInit, OnDestroy {
  farmerProfile: any = null;
  private subscription!: Subscription;

  consultations = [ { doctor: 'Dr. Priya Sharma', crop: 'Rice', date: '2025-10-20', status: 'completed', rating: 5 }, { doctor: 'Dr. Anil Verma', crop: 'Wheat', date: '2025-10-28', status: 'in-progress' }, { doctor: 'Dr. Meera Patel', crop: 'Corn', date: '2025-10-31', status: 'pending' } ]; crops = [ { name: 'Rice', status: 'Active' }, { name: 'Wheat', status: 'Active' }, { name: 'Corn', status: 'Active' } ];

  constructor(
    private farmerService: FarmerService,
    private cdr: ChangeDetectorRef
  ) {
    console.log('🚜 FarmerDashboardLayout Constructor Initialized');
  }

  ngOnInit() {
    console.log('📌 ngOnInit() called — subscribing to farmer profile');

    this.subscription = this.farmerService.getFarmerProfile().subscribe((state: any) => {
      console.log('🟢 Received farmer profile from service:', state);

      this.farmerProfile = state;

      // FIX: Avoid ExpressionChangedAfterItHasBeenCheckedError
      this.cdr.detectChanges();
      console.log('🛠 ChangeDetectorRef.detectChanges() called — view updated');
    });
    console.log('farmarProfile');
    console.log(this.farmerProfile);
    
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      console.log('🧹 Subscription cleaned up in ngOnDestroy()');
    }
  }
}
