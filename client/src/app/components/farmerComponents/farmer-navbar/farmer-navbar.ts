import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-farmer-navbar',
  imports: [RouterModule],
  templateUrl: './farmer-navbar.html',
  styleUrl: './farmer-navbar.css',
})
export class FarmerNavbar {
 @Output() closeMenu = new EventEmitter<void>();
  isMobileMenuOpen = false;

  constructor(private router: Router) {}

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
