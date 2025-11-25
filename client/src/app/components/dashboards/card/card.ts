import { Component } from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {
  summaryCards = [
    {
      title: 'Active Crops',
      value: '3',
      sub: 'Rice, Wheat, Corn',
      color: 'border-green-400'
    },
    {
      title: 'Total Consultations',
      value: '3',
      sub: '1 pending, 1 in progress',
      color: 'border-blue-400'
    },
    {
      title: 'Farm Size',
      value: '15 acres',
      sub: 'Soil: Loamy',
      color: 'border-yellow-400'
    },
    {
      title: 'Success Rate',
      value: '92%',
      sub: '',
      color: 'border-green-500'
    }
  ];

  user = {
    name: 'Rajesh Kumar',
    farmSize: '15 acres',
    soil: 'Loamy',
    successRate: 92
  };

}
