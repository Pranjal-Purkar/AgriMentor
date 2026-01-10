import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-site-map-diagram',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './site-map-diagram.html',
  styleUrl: './site-map-diagram.css',
})
export class SiteMapDiagram {}
