import { Component, HostListener, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { App, RouteAnimations} from '../../app';
import { FarmerNavbar } from "../../components/farmerComponents/farmer-navbar/farmer-navbar";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-farmer-dashboard-layout',
  imports: [RouterOutlet, FarmerNavbar,CommonModule],
  templateUrl: './farmer-dashboard-layout.html',
  styleUrl: './farmer-dashboard-layout.css',
  animations: [RouteAnimations]
})
export class FarmerDashboardLayout {
  private app = inject(App);

  prepareRoute(outlet: RouterOutlet) {
    // return in next tick to avoid ExpressionChangedAfterItHasBeenCheckedError
    return Promise.resolve().then(() => this.app.prepareRoute(outlet));
  }

  isMobileMenuOpen = false;

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    
    // Prevent body scroll when menu is open on mobile
    if (this.isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
    document.body.style.overflow = '';
  }

  // Close menu when screen size changes to desktop
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (event.target.innerWidth >= 1024) { // lg breakpoint
      this.closeMobileMenu();
    }
  }

  // Cleanup on component destroy
  ngOnDestroy() {
    document.body.style.overflow = '';
  }
}
