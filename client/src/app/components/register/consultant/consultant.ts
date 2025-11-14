import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-consultant',
  imports: [ReactiveFormsModule],
  templateUrl: './consultant.html',
  styleUrl: './consultant.css',
})
export class Consultant {
  consultantForm: FormGroup;
  qualifications = ['B.Sc Agriculture', 'M.Sc Agriculture', 'PhD Agriculture', 'Soil Science', 'Plant Pathology'];

  constructor(private fb: FormBuilder) {
    this.consultantForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      experienceYears: ['', [Validators.required, Validators.min(1)]],
      qualifications: ['', Validators.required],
      // licenseNumber: ['', [Validators.required, Validators.minLength(5)]],
      experienceArea: ['', Validators.required],
      // bio: ['', [Validators.required, Validators.minLength(20)]],
      verificationDocument: [null, Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      terms: [false, Validators.requiredTrue]
    }, { validators: this.passwordMatchValidator });
  }

  // ✅ Custom validator for password confirmation
  passwordMatchValidator(form: FormGroup) {
    const pass = form.get('password')?.value;
    const confirm = form.get('confirmPassword')?.value;
    return pass === confirm ? null : { passwordMismatch: true };
  }

  // ✅ Shortcut for form controls in HTML
  get f() {
    return this.consultantForm.controls;
  }

  // ✅ File upload handler
  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      if (file.size <= 10 * 1024 * 1024) { // max 10MB
        this.consultantForm.patchValue({ verificationDocument: file });
      } else {
        this.consultantForm.get('verificationDocument')?.setErrors({ fileTooLarge: true });
      }
    }
  }

  onSubmit() {
    console.log(this.consultantForm.value);
    
    if (this.consultantForm.valid) {
      console.log('✅ Consultant Registration Data:', this.consultantForm.value);
    } else {
      this.consultantForm.markAllAsTouched();
    }
  }
}
