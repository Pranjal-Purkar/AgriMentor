import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ui-card',
  imports: [CommonModule],
  templateUrl: './ui-card.html',
  styleUrl: './ui-card.css',
})
export class UiCard {
  @Input() noPadding = false;
  @Input() fullHeight = false;
}
