import { CommonModule } from '@angular/common';
import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-consultant-register',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './consultant-register.html',
  styleUrl: './consultant-register.css',
})
export class ConsultantRegister {
  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef<HTMLInputElement>>;
  
  consultantForm: FormGroup;
  currentStep: number = 1;
  otpCode: string[] = ['', '', '', '', '', ''];
  otpError: string = '';
  
  qualifications = [
    'B.Sc Agriculture',
    'M.Sc Agriculture',
    'PhD Agriculture',
    'Soil Science',
    'Plant Pathology'
  ];

  constructor(private fb: FormBuilder) {
    this.consultantForm = this.fb.group({
      // Step 1: Basic Information
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      experienceYears: ['', [Validators.required, Validators.min(1)]],
      qualifications: ['', Validators.required],
      experienceArea: ['', Validators.required],
      verificationDocument: [null, Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      
      // Step 2: Address Details
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      postalCode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
      country: ['', Validators.required],
      terms: [false, Validators.requiredTrue]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    const pass = form.get('password')?.value;
    const confirm = form.get('confirmPassword')?.value;
    return pass === confirm ? null : { passwordMismatch: true };
  }

  get f() {
    return this.consultantForm.controls;
  }

  getProgressWidth(): string {
    return `${((this.currentStep - 1) / 2) * 100}%`;
  }

  nextStep() {
    if (this.currentStep === 1) {
      // Validate Step 1 fields
      const step1Fields = ['firstName', 'lastName', 'email', 'phone', 'experienceYears', 
                           'qualifications', 'experienceArea', 'verificationDocument', 
                           'password', 'confirmPassword'];
      
      let isValid = true;
      step1Fields.forEach(field => {
        const control = this.consultantForm.get(field);
        control?.markAsTouched();
        if (control?.invalid) {
          isValid = false;
        }
      });

      if (isValid && !this.consultantForm.hasError('passwordMismatch')) {
        this.currentStep = 2;
      }
    } else if (this.currentStep === 2) {
      // Validate Step 2 fields
      const step2Fields = ['street', 'city', 'state', 'postalCode', 'country', 'terms'];
      console.log("inside step 2");
      
      let isValid = true;
      step2Fields.forEach(field => {
        const control = this.consultantForm.get(field);
        control?.markAsTouched();
        if (control?.invalid) {
          isValid = false;
        }
      });

      if (isValid) {
        this.currentStep = 3;
        this.sendOtp();
      }
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      if (file.size <= 10 * 1024 * 1024) {
        this.consultantForm.patchValue({ verificationDocument: file });
      } else {
        this.consultantForm.get('verificationDocument')?.setErrors({ fileTooLarge: true });
      }
    }
  }

  // OTP Methods
  onOtpInput(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    if (value && /^[0-9]$/.test(value)) {
      this.otpCode[index] = value;
      this.otpError = '';
      
      // Move to next input
      if (index < 5) {
        const nextInput = this.otpInputs.toArray()[index + 1];
        nextInput?.nativeElement.focus();
      }
    } else {
      input.value = '';
      this.otpCode[index] = '';
    }
  }

  onOtpKeydown(event: KeyboardEvent, index: number) {
    const input = event.target as HTMLInputElement;
    
    // Handle backspace
    if (event.key === 'Backspace' && !input.value && index > 0) {
      const prevInput = this.otpInputs.toArray()[index - 1];
      prevInput?.nativeElement.focus();
      this.otpCode[index - 1] = '';
    }
  }

  sendOtp() {
    console.log('📧 Sending OTP to:', this.f['email'].value);
    // Implement actual OTP sending logic here
  }

  resendOtp() {
    this.otpCode = ['', '', '', '', '', ''];
    this.otpError = '';
    this.otpInputs.toArray().forEach(input => input.nativeElement.value = '');
    this.otpInputs.first?.nativeElement.focus();
    console.log('📧 Resending OTP...');
  }

  verifyOtp(): boolean {
    const enteredOtp = this.otpCode.join('');
    
    if (enteredOtp.length !== 6) {
      this.otpError = 'Please enter complete OTP code';
      return false;
    }

    // Mock verification - replace with actual API call
    const correctOtp = '123456';
    if (enteredOtp === correctOtp) {
      this.otpError = '';
      return true;
    } else {
      this.otpError = 'Invalid OTP code. Please try again.';
      return false;
    }
  }

  onSubmit() {
    if (this.currentStep === 3) {
      if (this.verifyOtp()) {
        if (this.consultantForm.valid) {
          console.log('✅ Consultant Registration Data:', this.consultantForm.value);
          console.log('✅ OTP Verified:', this.otpCode.join(''));
          // Implement registration logic here
        }
      }
    }
  }
}
