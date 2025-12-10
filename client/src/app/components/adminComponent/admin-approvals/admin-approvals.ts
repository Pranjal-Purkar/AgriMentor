import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-approvals',
  imports: [CommonModule],
  templateUrl: './admin-approvals.html',
  styleUrl: './admin-approvals.css',
})
export class AdminApprovals {
  pendingApprovals = 89;
  approvedToday = 12;
  rejectedToday = 3;
}
