import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-consultant-home',
  imports: [CommonModule],
  templateUrl: './consultant-home.html',
  styleUrl: './consultant-home.css',
})
export class ConsultantHome {
  activeTab: string = 'new';

  summary = [
    { title: 'Total Consultations', value: 156, sub: '+12% this month', color: 'border-blue-500' },
    { title: 'Pending Requests', value: 5, sub: '3 new today', color: 'border-yellow-500' },
    { title: 'Average Rating', value: '4.8 ★', sub: 'Based on 89 reviews', color: 'border-orange-500' },
    { title: 'Completion Rate', value: '96%', sub: '151 completed', color: 'border-green-500' },
  ];

  tabs = [
    { key: 'new', label: 'New (3)' },
    { key: 'progress', label: 'In Progress (2)' },
    { key: 'completed', label: 'Completed' }
  ];

  requests = [
    {
      farmer: 'Rajesh Kumar',
      location: 'Punjab',
      crop: 'Rice',
      issue: 'Soil preparation and fertilizer recommendation',
      date: '2025-10-31',
      urgency: 'high',
      status: 'new'
    },
    {
      farmer: 'Amit Patel',
      location: 'Gujarat',
      crop: 'Wheat',
      issue: 'Dry patches appearing in early growth',
      date: '2025-10-30',
      urgency: 'medium',
      status: 'progress'
    },
    {
      farmer: 'Suresh Reddy',
      location: 'Maharashtra',
      crop: 'Cotton',
      issue: 'Pest infestation',
      date: '2025-10-29',
      urgency: 'high',
      status: 'completed'
    },
    {
      farmer: 'Priya Sharma',
      location: 'Karnataka',
      crop: 'Coconut',
      issue: 'Disease outbreak',
      date: '2025-10-28',
      urgency: 'medium',
      status: 'new'
    },
    {
      farmer: 'Ravi Kumar',
      location: 'Tamil Nadu',
      crop: 'Paddy',
      issue: 'Waterlogging',
      date: '2025-10-27',
      urgency: 'high',
      status: 'progress'
    },
    {
      farmer: 'Priya Sharma',
      location: 'Karnataka',
      crop: 'Coconut',
      issue: 'Disease outbreak',
      date: '2025-10-26',
      urgency: 'medium',
      status: 'completed'
    },
    {
      farmer: 'Suresh Reddy',
      location: 'Maharashtra',
      crop: 'Cotton',
      issue: 'Pest infestation',
      date: '2025-10-25',
      urgency: 'high',
      status: 'new'
    },
    {
      farmer: 'Amit Patel',
      location: 'Gujarat',
      crop: 'Wheat',
      issue: 'Dry patches appearing in early growth',
      date: '2025-10-24',
      urgency: 'medium',
      status: 'progress'
    }
  ];

  recentActivity = [
    { text: 'Submitted report for Rajesh Kumar', time: '2 hours ago' },
    { text: 'New consultation request from Amit Patel', time: '5 hours ago' },
    { text: 'Received 5-star rating from Suresh Reddy', time: '1 day ago' },
  ];

  monthStats = {
    consultations: 24,
    reports: 22,
    responseTime: '2.5 hours',
    satisfaction: '98%'
  };

  changeTab(tabKey: string) {
    this.activeTab = tabKey;
  }

  filteredRequests() {
    if (this.activeTab === 'new') return this.requests.filter(r => r.status === 'new');
    if (this.activeTab === 'progress') return this.requests.filter(r => r.status === 'progress');
    return this.requests.filter(r => r.status === 'completed');
  }
}
