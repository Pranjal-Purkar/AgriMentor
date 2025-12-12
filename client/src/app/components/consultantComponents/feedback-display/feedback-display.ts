import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FeedbackService } from '../../../services/feedbackService/feedback-service';

@Component({
  selector: 'app-feedback-display',
  imports: [CommonModule],
  templateUrl: './feedback-display.html',
})
export class FeedbackDisplayComponent implements OnChanges {
  @Input() consultationId!: number;
  @Input() feedbackData: any = null; // Can pass data directly or fetch by ID

  feedback: any = null;
  isLoading = false;

  // Helper for stars
  stars = [1, 2, 3, 4, 5];

  constructor(private feedbackService: FeedbackService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['consultationId'] && this.consultationId) {
      if (!this.feedbackData) {
        this.fetchFeedback();
      } else {
        this.feedback = this.feedbackData;
      }
    }

    if (changes['feedbackData'] && this.feedbackData) {
      this.feedback = this.feedbackData;
    }
  }

  fetchFeedback() {
    this.isLoading = true;
    this.feedbackService.getFeedbackByConsultationId(this.consultationId).subscribe({
      next: (res: any) => {
        this.feedback = res.data;
        this.isLoading = false;
      },
      error: (err) => {
        // Not found or error
        this.feedback = null;
        this.isLoading = false;
      },
    });
  }
}
