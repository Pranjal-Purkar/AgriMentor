
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-consultant-navbar',
  imports: [RouterModule,CommonModule],
  templateUrl: './consultant-navbar.html',
  styleUrl: './consultant-navbar.css',
})
export class ConsultantNavbar {

  @Output() closeMenu = new EventEmitter<void>();
  isMobileMenuOpen = false;
   isInitialized = false;

  menuItems = [
    {
      title: 'Dashboard',
      route: 'dashboard',
      icon: `
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6">
      </path>
    `,
    },
    
    {
      title: 'Consultation Request',
      route: 'consultation-request',
      icon: `
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4">
      </path>
    `,
    },
    {
      title: 'Weather',
      route: '/consultant/weather',
      icon: `
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z">
      </path>
    `,
    },
    {
      title: 'Consultants',
      route: '/consultant/weather',
      icon: `
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z">
      </path>
    `,
    },
    {
      title: 'Profile',
      route: '/consultant/profile',
      icon: `
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z">
      </path>
    `,
    },
  ];

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit() {
    // Mark the component as initialized
    this.isInitialized = true;
    // Trigger change detection
    this.cdr.detectChanges();
  }


  // Close mobile menu when a link is clicked
  onLinkClick() {
    this.closeMenu.emit();
  }

  // Handle logout
  onLogout() {
    // Add your logout logic here
    console.log('Logging out...');

    // Close menu
    this.closeMenu.emit();

    // Example: Clear auth token and redirect
    // localStorage.removeItem('authToken');
    // this.router.navigate(['/login']);

    // For now, just navigate to login
    this.router.navigate(['/login']);
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

}
