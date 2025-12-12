import { Injectable } from '@angular/core';
import { FeedbackApi } from '../../API/feedbackAPI/feedback-api';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  private feedbackSubject = new BehaviorSubject<any>(null);
  feedback$ = this.feedbackSubject.asObservable();

  constructor(private api: FeedbackApi) {}

  submitFeedback(data: any): Observable<any> {
    return this.api.createFeedback(data).pipe(
      tap((res) => {
        // Optionally update local state
      })
    );
  }

  updateFeedback(id: number, data: any): Observable<any> {
    return this.api.updateFeedback(id, data);
  }

  getFeedbackByConsultationId(consultationId: number): Observable<any> {
    return this.api.getFeedbackByConsultationId(consultationId);
  }

  hasFeedback(consultationId: number): Observable<any> {
    return this.api.hasFeedback(consultationId);
  }

  getConsultantStats(consultantId: number): Observable<any> {
    return this.api.getConsultantStats(consultantId);
  }

  getAllFeedback(): Observable<any> {
    return this.api.getAllFeedback();
  }
}
