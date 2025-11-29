import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UiCard } from "../ui-card/ui-card";

@Component({
  selector: 'app-admin-home',
  imports: [CommonModule, UiCard],
  templateUrl: './admin-home.html',
  styleUrl: './admin-home.css',
})
export class AdminHome {
    summary = [
    { title: 'Total Farmers', value: '1,247', sub: '+18% this month', color: 'border-green-600' },
    { title: 'Active Consultants', value: '89', sub: '3 pending approval', color: 'border-blue-600' },
    { title: 'Total Consultations', value: '3,456', sub: '289 this month', color: 'border-gray-600' },
    { title: 'Success Rate', value: '94.5%', sub: 'Avg rating: 4.7/5', color: 'border-green-500' },
  ];

  chartPoints = [
    { label: 'Jun', value: 45 },
    { label: 'Jul', value: 52 },
    { label: 'Aug', value: 60 },
    { label: 'Sep', value: 58 },
    { label: 'Oct', value: 70 },
  ];

  crops = [
    { name: 'Rice', value: 45, color: '#2d7a3e' },
    { name: 'Wheat', value: 30, color: '#3b82f6' },
    { name: 'Corn', value: 15, color: '#8b6914' },
    { name: 'Cotton', value: 10, color: '#f59e0b' },
  ];

  consultantPerformance = [
    { name: 'Dr. Priya Sharma', rating: 4.9, reviews: 89, consultations: 156 },
    { name: 'Dr. Anil Verma', rating: 4.7, reviews: 64, consultations: 112 },
    { name: 'Dr. Meera Patel', rating: 4.8, reviews: 72, consultations: 128 },
  ];

  recentConsultations = [
    { farmer: 'Rajesh Kumar', consultant: 'Dr. Priya Sharma', crop: 'Rice', date: '2025-10-30', status: 'completed' },
    { farmer: 'Amit Patel', consultant: 'Dr. Anil Verma', crop: 'Wheat', date: '2025-10-31', status: 'in-progress' },
    { farmer: 'Suresh Reddy', consultant: 'Dr. Meera Patel', crop: 'Cotton', date: '2025-10-29', status: 'completed' },
  ];

  pendingApprovals = [
    { name: 'Dr. Anil Kumar', expertise: 'Soil Science', experience: '8 years' },
    { name: 'Prof. Meera Singh', expertise: 'Crop Management', experience: '12 years' },
    { name: 'Dr. Rahul Verma', expertise: 'Pest Control', experience: '6 years' },
  ];

  activeTab = 'consultants';

  setTab(tab: string) {
    this.activeTab = tab;
  }

  getConsultationLinePoints() {
    return this.chartPoints
      .map((p, index) => {
        const x = 10 + index * 22.5;
        const y = 45 - (p.value / 80 * 30);
        return `${x},${y}`;
      })
      .join(' ');
  }

  totalCrops() {
    return this.crops.reduce((sum, c) => sum + c.value, 0);
  }

  getChartSlices() {
    const total = this.totalCrops();
    let acc = 0;
    
    return this.crops.map(slice => {
      const start = acc / total;
      acc += slice.value;
      const end = acc / total;
      
      const dash = (end - start) * 100;
      const offset = (1 - end) * 100;
      
      return {
        ...slice,
        dash,
        offset
      };
    });
  }

  getCropLabelPosition(index: number) {
    const angles = [30, 120, 200, 310]; // Approximate angles for each slice
    const angle = angles[index];
    const radius = 85; // Distance from center
    
    const x = 50 + radius * Math.cos((angle * Math.PI) / 180);
    const y = 50 + radius * Math.sin((angle * Math.PI) / 180);
    
    return `left: ${x}%; top: ${y}%; transform: translate(-50%, -50%);`;
  }
}
