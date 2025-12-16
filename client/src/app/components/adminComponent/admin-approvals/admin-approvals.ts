import { Component, OnInit, Inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { AdminService } from '../../../services/adminService/admin-service';
import { HttpClient } from '@angular/common/http';
import { toast } from 'ngx-sonner';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-admin-approvals',
  imports: [CommonModule],
  templateUrl: './admin-approvals.html',
  styleUrl: './admin-approvals.css',
})
export class AdminApprovals implements OnInit {
  pendingApprovals = 0;
  approvedToday = 0;
  rejectedToday = 0;

  pendingConsultants: any[] = [];
  isLoading = true;

  // Document Preview Modal
  isPreviewOpen = false;
  previewLoading = false;
  previewUrl: SafeResourceUrl | null = null;
  previewType: 'image' | 'pdf' | 'unknown' = 'unknown';
  currentDocumentUrl = '';
  currentConsultantName = '';

  private baseUrl = 'http://localhost:8080';

  constructor(
    private adminService: AdminService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadPendingConsultants();
    }
  }

  viewDetails(idOrEmail: string | number): void {
    this.router.navigate(['/admin/verification', idOrEmail]);
  }

  loadPendingConsultants(): void {
    this.isLoading = true;
    this.adminService.getAllConsultants().subscribe({
      next: (response) => {
        const allConsultants = response.data || [];
        console.log('AdminApprovals: Loaded consultants', allConsultants);
        this.pendingConsultants = allConsultants.filter(
          (c: any) => c.verificationStatus != 'VERIFIED'
        );
        this.pendingApprovals = this.pendingConsultants.length;
        this.approvedToday = 0;
        this.rejectedToday = 0;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading consultants:', error);
        toast.error('Failed to load pending approvals');
        this.isLoading = false;
        this.cdr.detectChanges();
      },
    });
  }

  // Open document preview modal
  openDocumentPreview(consultant: any): void {
    if (!consultant.verificationDocument?.documentUrl) {
      toast.error('No document available');
      return;
    }

    this.isPreviewOpen = true;
    this.previewLoading = true;
    this.previewUrl = null;
    this.currentConsultantName = `${consultant.firstName} ${consultant.lastName}`;
    this.currentDocumentUrl = this.baseUrl + consultant.verificationDocument.documentUrl;

    // Fetch the document as blob
    this.http.get(this.currentDocumentUrl, { responseType: 'blob' }).subscribe({
      next: (blob) => {
        // Detect file type from blob content (magic bytes)
        this.detectFileType(blob).then((detectedType) => {
          this.previewType = detectedType;

          // Create appropriate blob with correct MIME type for preview
          let previewBlob = blob;
          if (detectedType === 'image') {
            previewBlob = new Blob([blob], { type: 'image/png' });
          } else if (detectedType === 'pdf') {
            previewBlob = new Blob([blob], { type: 'application/pdf' });
          }

          const objectUrl = URL.createObjectURL(previewBlob);
          this.previewUrl = this.sanitizer.bypassSecurityTrustResourceUrl(objectUrl);
          this.previewLoading = false;
          this.cdr.detectChanges();
        });
      },
      error: (error) => {
        console.error('Error loading document:', error);
        toast.error('Failed to load document preview');
        this.previewLoading = false;
        this.closePreview();
      },
    });
  }

  // Detect file type from magic bytes
  private async detectFileType(blob: Blob): Promise<'image' | 'pdf' | 'unknown'> {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const arr = new Uint8Array(reader.result as ArrayBuffer).subarray(0, 8);
        const header = Array.from(arr)
          .map((b) => b.toString(16).padStart(2, '0'))
          .join('');

        console.log('File header (hex):', header);

        // Check for PDF: %PDF (25 50 44 46)
        if (header.startsWith('25504446')) {
          resolve('pdf');
          return;
        }

        // Check for PNG: 89 50 4E 47
        if (header.startsWith('89504e47')) {
          resolve('image');
          return;
        }

        // Check for JPEG: FF D8 FF
        if (header.startsWith('ffd8ff')) {
          resolve('image');
          return;
        }

        // Check for GIF: 47 49 46 38
        if (header.startsWith('47494638')) {
          resolve('image');
          return;
        }

        // Check for BMP: 42 4D
        if (header.startsWith('424d')) {
          resolve('image');
          return;
        }

        // Check for WebP: 52 49 46 46 ... 57 45 42 50
        if (header.startsWith('52494646')) {
          resolve('image');
          return;
        }

        // Default: try as image first since most verification docs are images
        // If the blob is reasonably sized, assume it might be an image
        if (blob.size > 0 && blob.size < 10 * 1024 * 1024) {
          // Try to verify it's actually displayable as an image
          resolve('image');
          return;
        }

        resolve('unknown');
      };
      reader.readAsArrayBuffer(blob.slice(0, 8));
    });
  }

  // Close preview modal
  closePreview(): void {
    this.isPreviewOpen = false;
    this.previewUrl = null;
    this.previewType = 'unknown';
    this.cdr.detectChanges();
  }

  // Download document
  downloadDocument(): void {
    if (!this.currentDocumentUrl) return;

    // Fetch and download with proper filename
    this.http.get(this.currentDocumentUrl, { responseType: 'blob' }).subscribe({
      next: (blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `verification_document_${this.currentConsultantName.replace(/\s+/g, '_')}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      },
      error: (error) => {
        console.error('Error downloading document:', error);
        toast.error('Failed to download document');
      },
    });
  }

  verifyConsultant(username: string): void {
    this.adminService.verifyConsultant(username).subscribe({
      next: (response) => {
        toast.success(response.message || 'Consultant verified successfully');
        this.approvedToday++;
        this.loadPendingConsultants();
      },
      error: (error) => {
        console.error('Error verifying consultant:', error);
        toast.error('Failed to verify consultant');
      },
    });
  }

  rejectConsultant(username: string): void {
    this.adminService.rejectConsultant(username).subscribe({
      next: (response) => {
        toast.success(response.message || 'Consultant rejected successfully');
        this.rejectedToday++;
        this.loadPendingConsultants();
      },
      error: (error) => {
        console.error('Error rejecting consultant:', error);
        toast.error('Failed to reject consultant');
      },
    });
  }
}
