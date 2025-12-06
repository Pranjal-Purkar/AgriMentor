import { TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consultation',
  imports: [TitleCasePipe],
  templateUrl: './consultation.html',
  styleUrl: './consultation.css',
})
export class Consultation {
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

  constructor(private router: Router) {}

  navigateNewRequest() {
    console.log('new Request button clicked');
    this.router.navigate(['/farmer/consultation-request']);
  }

  navigateToConsultationDetails(id: number, consultation: any) {
    console.log('Consultation ID:', id);
    console.log('Consultation:', consultation);
    this.router.navigate(['/farmer/consultation-request', id]);
  }
}
