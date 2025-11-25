import { Component } from '@angular/core';
import { Card } from "../../card/card";
import { Consultation } from "../../consultation/consultation";

@Component({
  selector: 'app-farmer-dashboard-layout',
  imports: [Card, Consultation],
  templateUrl: './farmer-dashboard-layout.html',
  styleUrl: './farmer-dashboard-layout.css',
})
export class FarmerDashboardLayout {
  user = {
    name: 'Rajesh Kumar',
    farmSize: '15 acres',
    soil: 'Loamy',
    successRate: 92
  };

  

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

  crops = [
    { name: 'Rice', status: 'Active' },
    { name: 'Wheat', status: 'Active' },
    { name: 'Corn', status: 'Active' }
  ];
}
