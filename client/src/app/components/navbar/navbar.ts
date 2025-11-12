import { Component } from '@angular/core';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
   isMenuOpen = false;

   constructor() {
   }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
