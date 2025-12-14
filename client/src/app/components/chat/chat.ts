import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  AfterViewChecked,
  Inject,
  PLATFORM_ID,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService, ChatRoom, ChatMessage } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.html',
  styleUrls: ['./chat.css'],
})
export class ChatComponent implements OnInit, OnDestroy, AfterViewChecked {
  @ViewChild('messageContainer') private messageContainer!: ElementRef;

  chatRooms: ChatRoom[] = [];
  selectedRoom: ChatRoom | null = null;
  messages: ChatMessage[] = [];
  newMessage = '';
  loading = false;

  private refreshInterval: any;
  private isBrowser: boolean;

  constructor(
    private chatService: ChatService,
    @Inject(PLATFORM_ID) platformId: Object,
    private cdr: ChangeDetectorRef
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      console.log('Chat Init - Session Storage:', {
        token: sessionStorage.getItem('token'),
        email: sessionStorage.getItem('email'),
        role: sessionStorage.getItem('role'),
      });
      this.loadRooms();
      // Poll for new messages every 3 seconds
      this.refreshInterval = setInterval(() => {
        if (this.selectedRoom) {
          this.refreshMessages();
        } else {
          this.loadRooms(); // Refresh room list to show new chats/last message updates
        }
      }, 3000);
    }
    console.log('chatRoom', this.chatRooms);
  }

  ngOnDestroy(): void {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
  }

  ngAfterViewChecked(): void {
    // Only scroll if we just loaded messages or sent one
    // We can add logic here if needed, but for now simple valid
  }

  loadRooms() {
    // Determine user role from sessionStorage (simple polling approach)
    if (!this.isBrowser) return;

    const role = sessionStorage.getItem('role') || 'FARMER';
    this.chatService.getChatRooms(role).subscribe({
      next: (rooms) => {
        console.log('rooms', rooms);

        // Filter unique participants to show only one entry per person (most recent)
        const uniqueParticipants = new Map<number, ChatRoom>();

        rooms.forEach((room) => {
          const other = this.getOtherParticipant(room);
          if (!other || !other.id) return;
          const otherId = other.id;

          if (!uniqueParticipants.has(otherId)) {
            uniqueParticipants.set(otherId, room);
          } else {
            // Keep the one with the latest activity
            const existingRoom = uniqueParticipants.get(otherId)!;
            const existingTime = existingRoom.lastMessageAt || existingRoom.createdAt || '';
            const newTime = room.lastMessageAt || room.createdAt || '';

            if (newTime > existingTime) {
              uniqueParticipants.set(otherId, room);
            }
          }
        });

        this.chatRooms = Array.from(uniqueParticipants.values());
        this.sortRooms();
        this.cdr.detectChanges();
      },
      error: (e) => console.error('Error loading rooms', e),
    });
  }

  selectRoom(room: ChatRoom) {
    this.selectedRoom = room;
    this.loadMessages();
    setTimeout(() => this.scrollToBottom(), 100);
  }

  loadMessages() {
    if (!this.selectedRoom) return;

    this.chatService.getMessages(this.selectedRoom.id).subscribe({
      next: (page) => {
        // Reverse because backend returns desc order (newest first)
        // Frontend wants oldest top, newest bottom
        this.messages = page.content.reverse();
        this.cdr.detectChanges();

        if (this.selectedRoom) {
          this.selectedRoom.unreadCount = 0;
        }

        // Mark as read
        this.chatService.markAsRead(this.selectedRoom!.id).subscribe();
      },
    });
  }

  refreshMessages() {
    if (!this.selectedRoom) return;

    this.chatService.getMessages(this.selectedRoom.id).subscribe({
      next: (page) => {
        const newMessages = page.content.reverse();
        // Only update if count changed to avoid flickering/scroll jumps
        if (
          newMessages.length !== this.messages.length ||
          (newMessages.length > 0 &&
            newMessages[newMessages.length - 1].id !== this.messages[this.messages.length - 1].id)
        ) {
          this.messages = newMessages;
          this.cdr.detectChanges();
          // If near bottom, scroll to bottom? For now, just let user scroll
        }
      },
    });
  }

  sendMessage() {
    if (!this.newMessage.trim() || !this.selectedRoom) return;

    const content = this.newMessage;
    this.newMessage = ''; // Clear input immediately

    this.chatService.sendMessage(this.selectedRoom.id, content).subscribe({
      next: (msg) => {
        this.messages.push(msg);
        if (this.selectedRoom) {
          this.selectedRoom.lastMessageAt = msg.sentAt || new Date().toISOString();
          this.sortRooms();
        }
        this.cdr.detectChanges(); // Update view immediately
        setTimeout(() => this.scrollToBottom(), 50);
      },
      error: (e) => {
        console.error('Failed to send', e);
        this.newMessage = content; // Restore if failed
      },
    });
  }

  scrollToBottom(): void {
    try {
      this.messageContainer.nativeElement.scrollTop =
        this.messageContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }

  // Helpers
  getOtherParticipant(room: ChatRoom): any {
    if (!this.isBrowser) return {};
    const myEmail = sessionStorage.getItem('email');
    if (room.farmer.email === myEmail) {
      return room.consultant;
    }
    return room.farmer;
  }

  isSentByMe(msg: ChatMessage): boolean {
    if (!this.isBrowser) return false;
    const myEmail = sessionStorage.getItem('email');
    return msg.sender.email === myEmail;
  }

  formatTime(dateStr: string): string {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  sortRooms() {
    this.chatRooms.sort((a, b) => {
      const timeA = new Date(a.lastMessageAt || a.createdAt || 0).getTime();
      const timeB = new Date(b.lastMessageAt || b.createdAt || 0).getTime();
      return timeB - timeA;
    });
  }
}
