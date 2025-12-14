import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ChatRoom {
  id: number;
  consultation: any;
  farmer: any;
  consultant: any;
  isActive: boolean;
  lastMessageAt: string;
  createdAt: string;
  unreadCount?: number;
}

export interface ChatMessage {
  id?: number;
  chatRoomId: number;
  sender: any;
  receiver: any;
  content: string;
  status?: string;
  sentAt?: string;
  deliveredAt?: string;
  readAt?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private apiUrl = 'http://localhost:8080/api/chat';

  constructor(private http: HttpClient) {}

  getChatRooms(role: string): Observable<ChatRoom[]> {
    return this.http.get<ChatRoom[]>(`${this.apiUrl}/rooms?role=${role}`);
  }

  getMessages(roomId: number, page: number = 0, size: number = 50): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/room/${roomId}/messages?page=${page}&size=${size}`);
  }

  sendMessage(roomId: number, content: string): Observable<ChatMessage> {
    return this.http.post<ChatMessage>(`${this.apiUrl}/room/${roomId}/send`, { content });
  }

  markAsRead(roomId: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/room/${roomId}/read`, {});
  }

  getUnreadCount(): Observable<{ count: number }> {
    return this.http.get<{ count: number }>(`${this.apiUrl}/unread-count`);
  }
}
