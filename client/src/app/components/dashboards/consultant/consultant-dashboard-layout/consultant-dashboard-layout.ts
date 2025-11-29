import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ConsultantNavbar } from "../consultant-navbar/consultant-navbar";

@Component({
  selector: 'app-consultant-dashboard-layout',
  imports: [RouterOutlet, ConsultantNavbar],
  templateUrl: './consultant-dashboard-layout.html',
  styleUrl: './consultant-dashboard-layout.css',
})
export class ConsultantDashboardLayout {

}
