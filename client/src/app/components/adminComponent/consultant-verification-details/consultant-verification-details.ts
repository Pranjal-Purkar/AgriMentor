import { Component, OnInit, Inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../../services/adminService/admin-service';
import { HttpClient } from '@angular/common/http';
import { toast } from 'ngx-sonner';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-consultant-verification-details',
  imports: [CommonModule],
  templateUrl: './consultant-verification-details.html',
  styleUrl: './consultant-verification-details.css',
})
export class ConsultantVerificationDetails implements OnInit {
  consultant: any = null;
  isLoading = true;
  consultantId: string | null = null;

  // Document Preview Modal
  isPreviewOpen = false;
  previewLoading = false;
  previewUrl: SafeResourceUrl | null = null;
  previewType: 'image' | 'pdf' | 'unknown' = 'unknown';
  currentDocumentUrl = '';

  private baseUrl = 'http://localhost:8080';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adminService: AdminService,
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.route.paramMap.subscribe((params) => {
        this.consultantId = params.get('id');
        if (this.consultantId) {
          this.loadConsultantDetails(this.consultantId);
        }
      });
    }
  }

  loadConsultantDetails(id: string): void {
    this.isLoading = true;
    this.adminService.getAllConsultants().subscribe({
      next: (response) => {
        const allConsultants = response.data || [];
        this.consultant = allConsultants.find(
          (c: any) => c.id == id || c.email === id || c.firstName === id
        );
        setTimeout(() => {
          this.isLoading = false;
          this.cdr.detectChanges();
        });
      },
      error: (error) => {
        console.error('Error loading consultant details:', error);
        toast.error('Failed to load consultant details');
        setTimeout(() => {
          this.isLoading = false;
          this.cdr.detectChanges();
        });
      },
    });
  }

  // Open document preview modal
  openDocumentPreview(): void {
    if (!this.consultant?.verificationDocument?.documentUrl) {
      toast.error('No document available');
      return;
    }

    this.isPreviewOpen = true;
    this.previewLoading = true;
    this.previewUrl = null;
    this.currentDocumentUrl = this.baseUrl + this.consultant.verificationDocument.documentUrl;

    this.http.get(this.currentDocumentUrl, { responseType: 'blob' }).subscribe({
      next: (blob) => {
        this.detectFileType(blob).then((detectedType) => {
          this.previewType = detectedType;

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

        // PDF: %PDF (25 50 44 46)
        if (header.startsWith('25504446')) {
          resolve('pdf');
          return;
        }
        // PNG: 89 50 4E 47
        if (header.startsWith('89504e47')) {
          resolve('image');
          return;
        }
        // JPEG: FF D8 FF
        if (header.startsWith('ffd8ff')) {
          resolve('image');
          return;
        }
        // GIF: 47 49 46 38
        if (header.startsWith('47494638')) {
          resolve('image');
          return;
        }
        // BMP: 42 4D
        if (header.startsWith('424d')) {
          resolve('image');
          return;
        }
        // WebP: 52 49 46 46
        if (header.startsWith('52494646')) {
          resolve('image');
          return;
        }

        // Default to image for reasonable file sizes
        if (blob.size > 0 && blob.size < 10 * 1024 * 1024) {
          resolve('image');
          return;
        }

        resolve('unknown');
      };
      reader.readAsArrayBuffer(blob.slice(0, 8));
    });
  }

  closePreview(): void {
    this.isPreviewOpen = false;
    this.previewUrl = null;
    this.previewType = 'unknown';
    this.cdr.detectChanges();
  }

  downloadDocument(): void {
    if (!this.currentDocumentUrl) return;

    this.http.get(this.currentDocumentUrl, { responseType: 'blob' }).subscribe({
      next: (blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `verification_document_${this.consultant?.firstName}_${this.consultant?.lastName}`;
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

  verifyConsultant(): void {
    if (!this.consultant) return;

    this.adminService.verifyConsultant(this.consultant.email).subscribe({
      next: (response) => {
        toast.success('Consultant verified successfully');
        this.router.navigate(['/admin/approvals']);
      },
      error: (error) => {
        console.error('Error verifying consultant:', error);
        toast.error('Failed to verify consultant');
      },
    });
  }

  rejectConsultant(): void {
    if (!this.consultant) return;

    this.adminService.rejectConsultant(this.consultant.email).subscribe({
      next: (response) => {
        toast.success('Consultant rejected successfully');
        this.router.navigate(['/admin/approvals']);
      },
      error: (error) => {
        console.error('Error rejecting consultant:', error);
        toast.error('Failed to reject consultant');
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/admin/approvals']);
  }
}
