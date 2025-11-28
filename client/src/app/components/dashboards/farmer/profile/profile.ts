import { ChangeDetectorRef, Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { FarmerService } from '../../../../services/farmer/farmer-service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  farmerProfile: any = null;
  editMode = false;

  private subscription!: Subscription;
  profileForm: FormGroup;

  

  constructor(
    private farmerService: FarmerService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.profileForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    location: ['', Validators.required],
    soilType: ['', Validators.required],
    farmSize: ['', Validators.required],
    primaryCrops: ['', Validators.required],
  });
    console.log('👤 FarmerProfile Constructor Initialized');
  }

  ngOnInit(): void {
    console.log('📌 FarmerProfile ngOnInit — subscribing to profile state');

    this.subscription = this.farmerService.getFarmerProfile().subscribe((profile: any) => {
      console.log('🟢 Profile data from service:', profile);

      this.farmerProfile = profile;

      if (profile) {
        this.profileForm.patchValue({
          firstName: profile.firstName,
          lastName: profile.lastName,
          email: profile.email,
          phone: profile.phone,
          location: profile.location,
          soilType: profile.soilType,
          farmSize: profile.farmSize,
          primaryCrops: profile.primaryCrops,
        });
      }

      this.cdr.detectChanges();
    });
  }

  toggleEdit() {
    this.editMode = !this.editMode;

    if (this.editMode && this.farmerProfile) {
      // repatch values when switching to edit mode
      this.profileForm.patchValue(this.farmerProfile);
    }

    this.cdr.detectChanges();
  }

  saveChanges() {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    const updatedData = this.profileForm.value;

    console.log('💾 Saving updated data:', updatedData);

    // Update cached data in service
    // this.farmerService.updateFarmerProfileCache(updatedData);

    this.editMode = false;
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
      console.log('🧹 FarmerProfile subscription cleaned');
    }
  }
}
