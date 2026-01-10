import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-site-map',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './site-map.html',
  styleUrl: './site-map.css',
})
export class SiteMap {}
