import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import {
  AdminDashboardStats,
  UserStatistics,
  ConsultationOverview,
  Activity,
  AdminUser,
} from '../../interfaces/admin.interfaces';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private baseUrl: string = 'http://localhost:8080/api/v1/admin';

  // BehaviorSubjects for caching data
  private dashboardStatsSubject = new BehaviorSubject<AdminDashboardStats | null>(null);
  dashboardStats$ = this.dashboardStatsSubject.asObservable();

  private userStatsSubject = new BehaviorSubject<UserStatistics | null>(null);
  userStats$ = this.userStatsSubject.asObservable();

  constructor(private http: HttpClient) {}

  // ==================== Dashboard Statistics ====================

  /**
   * Get comprehensive dashboard statistics
   */
  getDashboardStatistics(): Observable<any> {
    console.log('🔵 [AdminService] Calling API:', `${this.baseUrl}/dashboard/statistics`);
    console.log(
      '🔵 [AdminService] Token from sessionStorage:',
      sessionStorage.getItem('token') ? 'EXISTS' : 'MISSING'
    );

    return this.http.get<any>(`${this.baseUrl}/dashboard/statistics`).pipe(
      tap((response) => {
        console.log('✅ [AdminService] Dashboard statistics response:', response);
        console.log('✅ [AdminService] Response data:', response.data);
        if (response.data) {
          this.dashboardStatsSubject.next(response.data);
          console.log('✅ [AdminService] Dashboard stats cached:', response.data);
        } else {
          console.warn('⚠️ [AdminService] No data in response');
        }
      }),
      catchError((error) => {
        console.error('❌ [AdminService] Dashboard statistics error:', error);
        console.error('❌ [AdminService] Error status:', error.status);
        console.error('❌ [AdminService] Error message:', error.message);
        throw error;
      })
    );
  }

  /**
   * Get detailed user statistics
   */
  getUserStatistics(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/statistics/users`).pipe(
      tap((response) => {
        if (response.data) {
          this.userStatsSubject.next(response.data);
        }
      })
    );
  }

  /**
   * Get consultation overview statistics
   */
  getConsultationStatistics(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/statistics/consultations`);
  }

  // ==================== User Management ====================

  /**
   * Get all users with optional role filtering
   * @param role Optional role filter (FARMER, CONSULTANT, ADMIN)
   */
  getAllUsers(role?: string): Observable<any> {
    const url = role ? `${this.baseUrl}/users/all?role=${role}` : `${this.baseUrl}/users/all`;
    return this.http.get<any>(url);
  }

  /**
   * Get all farmers
   */
  getAllFarmers(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/farmers/all`);
  }

  /**
   * Toggle user active/inactive status
   * @param username User's email/username
   */
  toggleUserStatus(username: string): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/users/${username}/toggle-status`, null);
  }

  // ==================== Consultant Management ====================

  /**
   * Get all consultants
   */
  getAllConsultants(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/all/consultants`);
  }

  /**
   * Verify a consultant
   * @param username Consultant's email/username
   */
  verifyConsultant(username: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/verify/consultant/${username}`, null);
  }

  /**
   * Reject a consultant
   * @param username Consultant's email/username
   */
  rejectConsultant(username: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/reject/consultant/${username}`, null);
  }

  // ==================== Consultation Management ====================

  /**
   * Get all consultations
   */
  getAllConsultations(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/consultations/all`);
  }

  /**
   * Get consultation overview statistics
   */
  getConsultationOverview(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/consultations/overview`);
  }

  /**
   * Get specific consultation by ID
   * @param id Consultation ID
   */
  getConsultationById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/consultations/${id}`);
  }

  // ==================== Activity Tracking ====================

  /**
   * Get recent platform activities
   */
  getRecentActivities(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/activities/recent`);
  }

  // ==================== Helper Methods ====================

  /**
   * Clear cached dashboard statistics
   */
  clearDashboardCache(): void {
    this.dashboardStatsSubject.next(null);
    this.userStatsSubject.next(null);
  }

  /**
   * Refresh dashboard statistics
   */
  refreshDashboardStats(): void {
    this.getDashboardStatistics().subscribe();
    this.getUserStatistics().subscribe();
  }
}
