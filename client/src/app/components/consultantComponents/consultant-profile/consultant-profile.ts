import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ConsultantService } from '../../../services/consultantService/consultant-service';

interface AddressDTO {
  street: string;
  city: string;
  state: string;
  pinCode: string;
  country: string;
  latitude?: string;
  longitude?: string;
}

interface ConsultantProfileUpdateRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  expertiseArea: string;
  experienceYears: number;
  qualifications: string;
  specialization: string;
  address: AddressDTO;
}

@Component({
  selector: 'app-consultant-profile',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './consultant-profile.html',
  styleUrl: './consultant-profile.css',
})
export class ConsultantProfile implements OnInit, OnDestroy {
  consultantProfile: any = null;
  editMode = false;
  isLoading = false;
  saveSuccess = false;

  profileForm: FormGroup;
  private subscription!: Subscription;

  profilePreview: any = null;
  selectedPhotoFile: File | null = null;

  constructor(
    private consultantService: ConsultantService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      expertiseArea: ['', Validators.required],
      experienceYears: [0, [Validators.required, Validators.min(0)]],
      qualifications: ['', Validators.required],
      specialization: ['', Validators.required],
      address: this.fb.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        pinCode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
        country: ['India', Validators.required],
        latitude: [''],
        longitude: [''],
      }),
    });

    console.log('👤 ConsultantProfile Constructor Initialized');
  }

  ngOnInit(): void {
    console.log('📌 ConsultantProfile ngOnInit — fetching profile');
    this.getConsultantProfile();
  }

  getConsultantProfile() {
    this.isLoading = true;
    this.subscription = this.consultantService.getConsultantProfile().subscribe((state: any) => {
      console.log('🟢 Received consultant profile from service:', state);
      this.consultantProfile = state;
      this.patchFormValues();

      if (this.consultantProfile?.profilePhotoUrl) {
        this.profilePreview = this.consultantProfile.profilePhotoUrl;
      }

      console.log("Final consultant profile:", this.consultantProfile);
      this.isLoading = false;
      this.cdr.detectChanges();
    });
  }

  patchFormValues() {
    if (!this.consultantProfile) {
      console.warn("❗ Consultant profile is empty");
      return;
    }

    const formData: any = {
      firstName: this.consultantProfile.firstName || '',
      lastName: this.consultantProfile.lastName || '',
      email: this.consultantProfile.email || '',
      phone: this.consultantProfile.phone || '',
      expertiseArea: this.consultantProfile.expertiseArea || '',
      experienceYears: this.consultantProfile.experienceYears || 0,
      qualifications: this.consultantProfile.qualifications || '',
      specialization: this.consultantProfile.specialization || '',
      address: {
        street: '',
        city: '',
        state: '',
        pinCode: '',
        country: 'India',
        latitude: '',
        longitude: '',
      },
    };

    // FIXED LOGIC HERE
    const address =
      this.consultantProfile.addressDTO ||
      this.consultantProfile.address ||
      null;

    if (address) {
      console.log("📍 Using address:", address);
      formData.address = {
        street: address.street || '',
        city: address.city || '',
        state: address.state || '',
        pinCode: address.pinCode || '',
        country: address.country || 'India',
        latitude: address.latitude || '',
        longitude: address.longitude || '',
      };
    } else {
      console.warn("⚠ No address found in backend response");
    }

    this.profileForm.patchValue(formData);
  }

  toggleEdit() {
    this.editMode = !this.editMode;
    this.saveSuccess = false;

    this.patchFormValues();
    this.selectedPhotoFile = null;

    if (this.consultantProfile?.profilePhotoUrl) {
      this.profilePreview = this.consultantProfile.profilePhotoUrl;
    }

    this.cdr.detectChanges();
  }

  onPhotoSelect(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) return alert('Invalid image file');
    if (file.size > 5 * 1024 * 1024) return alert('File must be <5MB');

    this.selectedPhotoFile = file;

    const reader = new FileReader();
    reader.onload = () => {
      this.profilePreview = reader.result;
      this.cdr.detectChanges();
    };

    reader.readAsDataURL(file);
  }

  removePhoto() {
    this.profilePreview = null;
    this.selectedPhotoFile = null;
    this.cdr.detectChanges();
  }

  saveChanges() {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    const formValue = this.profileForm.value;

    const updateRequest: ConsultantProfileUpdateRequest = {
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      email: formValue.email,
      phone: formValue.phone,
      expertiseArea: formValue.expertiseArea,
      experienceYears: Number(formValue.experienceYears),
      qualifications: formValue.qualifications,
      specialization: formValue.specialization,
      address: {
        street: formValue.address.street,
        city: formValue.address.city,
        state: formValue.address.state,
        pinCode: formValue.address.pinCode,
        country: formValue.address.country,
        latitude: formValue.address.latitude || undefined,
        longitude: formValue.address.longitude || undefined,
      },
    };

    console.log("💾 Sending updated data:", updateRequest);

    this.consultantService.updateConsultantProfile(updateRequest);
    this.getConsultantProfile();
  }

  get f() {
    return this.profileForm.controls;
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
