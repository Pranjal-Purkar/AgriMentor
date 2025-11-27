import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { UiCard } from "../ui-card/ui-card";

@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule, UiCard],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard {
 title = 'Admin Dashboard';
  subtitle = 'Platform Overview — Monitor and manage the E-Consultancy platform';

  summary: any[] = [
    { title: 'Total Farmers', value: '1,247', sub: '+18% this month', color: 'border-green-400' },
    { title: 'Active Consultants', value: '89', sub: '3 pending approval', color: 'border-blue-300' },
    { title: 'Total Consultations', value: '3,456', sub: '289 this month', color: 'border-amber-200' },
    { title: 'Success Rate', value: '94.5%', sub: 'Avg rating: 4.7/5', color: 'border-green-500' }
  ];

  // small dataset for line chart (months and values)
  chartPoints = [
    { label: 'Jun', value: 45 },
    { label: 'Jul', value: 52 },
    { label: 'Aug', value: 61 },
    { label: 'Sep', value: 58 },
    { label: 'Oct', value: 78 }
  ];

  // pie slices
  crops = [
    { name: 'Rice', value: 45, color: '#1f8a4c' },
    { name: 'Wheat', value: 30, color: '#3b82f6' },
    { name: 'Corn', value: 15, color: '#a16207' },
    { name: 'Cotton', value: 10, color: '#f59e0b' }
  ];

  // sample table rows
  recent = [
    { farmer: 'Rajesh Kumar', consultant: 'Dr. Priya Sharma', crop: 'Rice', date: '2025-10-30', status: 'completed' },
    { farmer: 'Amit Patel', consultant: 'Dr. Anil Verma', crop: 'Wheat', date: '2025-10-31', status: 'in-progress' },
    { farmer: 'Suresh Reddy', consultant: 'Dr. Meera Patel', crop: 'Cotton', date: '2025-10-29', status: 'completed' }
  ];

  // tab state
  activeTab = signal<'consultants' | 'consultations' | 'ratings'>('consultations');
  setTab = (t: 'consultants' | 'consultations' | 'ratings') => this.activeTab.set(t);

  // pie math (computed)
  totalCrops = computed(() => this.crops.reduce((s, c) => s + c.value, 0));

  getPolylinePoints(): string {
  if (!this.chartPoints?.length) return '';
  return this.chartPoints
    .map((p, idx) => {
      const x = idx * (100 / (this.chartPoints.length - 1));
      const y = 38 - (p.value / 90 * 28);
      return `${x},${y}`;
    })
    .join(' ');
}
pending = [
  {
    name: 'Dr. Anil Kumar',
    expertise: 'Soil Science',
    experience: '8 years'
  },
  {
    name: 'Prof. Meera Singh',
    expertise: 'Crop Management',
    experience: '12 years'
  },
  {
    name: 'Dr. Rahul Verma',
    expertise: 'Pest Control',
    experience: '6 years'
  }
];

}
