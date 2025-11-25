import { Component } from '@angular/core';

@Component({
  selector: 'app-consultation',
  imports: [],
  templateUrl: './consultation.html',
  styleUrl: './consultation.css',
})
export class Consultation {

  consultations = [
    {
      doctor: 'Dr. Priya Sharma',
      crop: 'Rice',
      date: '2025-10-20',
      status: 'completed',
      rating: 5
    },
    {
      doctor: 'Dr. Anil Verma',
      crop: 'Wheat',
      date: '2025-10-28',
      status: 'in-progress'
    },
    {
      doctor: 'Dr. Meera Patel',
      crop: 'Corn',
      date: '2025-10-31',
      status: 'pending'
    }
  ];
}
