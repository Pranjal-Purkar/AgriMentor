import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-consultations',
  imports: [CommonModule],
  templateUrl: './admin-consultations.html',
  styleUrl: './admin-consultations.css',
})
export class AdminConsultations {
  totalConsultations = 342;
  activeConsultations = 187;
  completedConsultations = 98;
  pendingConsultations = 57;
}
