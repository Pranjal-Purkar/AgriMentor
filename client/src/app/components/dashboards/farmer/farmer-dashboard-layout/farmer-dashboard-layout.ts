import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FarmerHome } from "../farmer-home/farmer-home";
import { RouterOutlet } from '@angular/router';
import { FarmerNavbar } from "../farmer-navbar/farmer-navbar";

@Component({
  selector: 'app-farmer-dashboard-layout',
  imports: [FarmerHome, RouterOutlet, FarmerNavbar],
  templateUrl: './farmer-dashboard-layout.html',
  styleUrl: './farmer-dashboard-layout.css',
})
export class FarmerDashboardLayout  {

  
}

