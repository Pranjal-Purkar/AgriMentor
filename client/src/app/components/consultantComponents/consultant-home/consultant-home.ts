import { TitleCasePipe } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { FarmerService } from '../../../services/farmerService/farmer-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consultant-home',
  imports: [TitleCasePipe],
  templateUrl: './consultant-home.html',
  styleUrl: './consultant-home.css',
})
export class ConsultantHome {
  consultantProfile: any = null;
  editMode: boolean = false;
  // consultationRequests: any = null;
  private subscription!: Subscription;

  summaryCards = [
    {
      title: 'Total Consultation',
      value: '3',
      sub: '',
      color: 'border-green-400',
    },
    {
      title: 'Pending Requests',
      value: '3',
      sub: '2 new today',
      color: 'border-blue-400',
    },
    {
      title: 'Average rating',
      value: '15 starts',
      sub: 'based on 89 reviews',
      color: 'border-yellow-400',
    },
    {
      title: 'Completion Rate',
      value: '92%',
      sub: '151 completed',
      color: 'border-green-500',
    },
  ];

  user = {
    name: 'Rajesh Kumar',
    farmSize: '15 acres',
    soil: 'Loamy',
    successRate: 92,
  };

  // consultations
  consultationRequests = [
    {
      consultant: {
        firstName: 'Priya',
      lastName: 'Sharma',
      },
      topic: 'Rice',
      consultationRequestStatus: 'APPROVED',
      date: '2025-10-20',
      status: 'completed',
      rating: 5,
    },
    {
      consultant: {
        firstName: 'Rajesh',
      lastName: 'Kumar',
      },
      topic: 'Wheat',
      consultationRequestStatus: 'PENDING',
      date: '2025-10-20',
      status: 'in progress',
      rating: 0,
    },
    {
      consultant: {
        firstName: 'Rajesh',
      lastName: 'Kumar',
      },
      topic: 'Corn',
      consultationRequestStatus: 'PENDING',
      date: '2025-10-20',
      status: 'in progress',
      rating: 0,
    },
    {
      consultant: {
        firstName: 'Rajesh',
      lastName: 'Kumar',
      },
      topic: 'Rice',
      consultationRequestStatus: 'PENDING',
      date: '2025-10-20',
      status: 'in progress',
      rating: 0,
    },
    {
      consultant: {
        firstName: 'Rajesh',
      lastName: 'Kumar',
      },
      topic: 'Rice',
      consultationRequestStatus: 'PENDING',
      date: '2025-10-20',
      status: 'in progress',
      rating: 0,
    },
    ];
  crops = [
    { name: 'Rice', status: 'Active' },
    { name: 'Wheat', status: 'Active' },
    { name: 'Corn', status: 'Active' },
  ];


  
  constructor(
    private farmerService: FarmerService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    console.log('🚜 FarmerDashboardLayout Constructor Initialized');
  }

  enableEditMode(): void {
    this.editMode = true;
  }

  cancelEdit(): void {
    this.editMode = false;
    // Reset form to original values if needed
    if (this.consultantProfile) {
      // You might want to reset the form here
    }
  }

  ngOnInit() {
    console.log('📌 ngOnInit() called — subscribing to farmer profile');
    this.getFarmerProfile()
    this.getConsultationRequest()
    

  }

  getConsultationRequest(){
    
    this.subscription = this.farmerService.getConsultationRequest().subscribe((state: any) => {
      console.log('🟢 Received consultation requests from service:', state);

      this.consultationRequests = state;

      // FIX: Avoid ExpressionChangedAfterItHasBeenCheckedError
      this.cdr.detectChanges();
      console.log('🛠 ChangeDetectorRef.detectChanges() called — view updated');
      console.log(this.consultationRequests);
      
    })
  }

  getFarmerProfile(){
    this.subscription = this.farmerService.getFarmerProfile().subscribe((state: any) => {
      console.log('🟢 Received farmer profile from service:', state);

      this.consultantProfile = state;

      // FIX: Avoid ExpressionChangedAfterItHasBeenCheckedError
      this.cdr.detectChanges();
      console.log('🛠 ChangeDetectorRef.detectChanges() called — view updated');
    });
    console.log('farmarProfile');
    console.log(this.consultantProfile);

    
  }

  navigateNewRequest(){
    console.log('new Request button clicked');
    this.router.navigate(['farmer/consultation-request']);
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      console.log('🧹 Subscription cleaned up in ngOnDestroy()');
    }
  }
}
