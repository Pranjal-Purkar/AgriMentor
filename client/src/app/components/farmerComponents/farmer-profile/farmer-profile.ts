import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FarmerService } from '../../../services/farmerService/farmer-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-farmer-profile',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './farmer-profile.html',
  styleUrl: './farmer-profile.css',
})
export class FarmerProfile {
  farmerProfile: any = null;
  editMode = false;

  profileForm: FormGroup;
  private subscription!: Subscription;

  // Profile photo preview (base64)
  profilePreview: any = null;

  constructor(
    private farmerService: FarmerService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {

    // Reactive Form Structure
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      location: ['', Validators.required],
      soilType: ['', Validators.required],
      farmSize: ['', Validators.required],
      primaryCrops: ['', Validators.required],
      photo: [''], // New photo field
    });

    console.log('👤 FarmerProfile Constructor Initialized');
  }

  ngOnInit(): void {
    console.log('📌 FarmerProfile ngOnInit — fetching profile');

    // -- Currently using mock profile data --
    // Replace with service when backend ready

    this.farmerProfile = {
      firstName: 'Ramesh',
      lastName: 'Patil',
      email: 'ramesh.patil@example.com',
      phone: '+91 9876543210',
      location: 'Nashik, Maharashtra',
      soilType: 'Black Soil',
      farmSize: 7,
      primaryCrops: 'Grapes, Sugarcane',
      photo: null, // initial photo (can be URL later)
    };

    // Patch form values
    this.profileForm.patchValue(this.farmerProfile);

    console.log('🟢 Profile loaded:', this.farmerProfile);
  }

  // Toggle between view mode and edit mode
  toggleEdit() {
    this.editMode = !this.editMode;

    if (this.editMode && this.farmerProfile) {
      this.profileForm.patchValue(this.farmerProfile);
    }

    this.cdr.detectChanges();
  }

  // Handle photo upload (file → base64 preview)
  onPhotoSelect(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      this.profilePreview = reader.result; // base64 preview
      this.profileForm.patchValue({ photo: this.profilePreview });
      this.cdr.detectChanges();
      console.log('📸 Photo selected:', this.profilePreview);
    };

    reader.readAsDataURL(file);
  }

  // Save updates
  saveChanges() {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    const updatedData = this.profileForm.value;

    console.log('💾 Saving updated data:', updatedData);

    // update local data
    this.farmerProfile = {
      ...this.farmerProfile,
      ...updatedData,
      photo: this.profilePreview || this.farmerProfile.photo,
    };

    // save to cache/local DB
    // this.farmerService.updateFarmerProfileCache(this.farmerProfile);

    this.editMode = false;
    this.cdr.detectChanges();

    console.log('✅ Profile updated:', this.farmerProfile);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
      console.log('🧹 FarmerProfile subscription cleaned');
    }
  }
}
