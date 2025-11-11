import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-farmer',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './farmer.html',
  styleUrl: './farmer.css',
})
export class Farmer {
  farmerForm: FormGroup;
  soilTypes = ['Sandy', 'Clay', 'Loamy', 'Peaty', 'Chalky', 'Silty'];

  constructor(private fb: FormBuilder) {
    this.farmerForm = this.fb.group(
      {
        firstName: ['', [Validators.required, Validators.minLength(3)]],
        lastName: ['', [Validators.required, Validators.minLength(3)]],
       
        email: [
          '',
          [
            Validators.required,
            Validators.email,
            Validators.pattern('^[a-zA-Z0-9_.]+@[a-zA-Z0-9]+.[a-zA-Z]{2,}$'),
          ],
        ],
        phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
        password: ['', [Validators.required, this.passwordValidator]],
        confirmPassword: ['', Validators.required],
        terms: [false, Validators.requiredTrue],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  // ✅ Custom validator for password match
  passwordMatchValidator(form: FormGroup) {
    const pass = form.get('password')?.value;
    const confirm = form.get('confirmPassword')?.value;
    return pass === confirm ? null : { passwordMismatch: true };
  }

  passwordValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value || '';
    const errors: any = {};

    if (!/[a-z]/.test(value)) {
      errors.lowercase = 'At least one lowercase letter is required.';
    }

    if (!/[A-Z]/.test(value)) {
      errors.uppercase = 'At least one uppercase letter is required.';
    }

    if (!/[0-9]/.test(value)) {
      errors.number = 'At least one number is required.';
    }

    if (!/[@$!%*?&]/.test(value)) {
      errors.special = 'At least one special character (@ $ ! % * ? &) is required.';
    }

    if (value.length < 8) {
      errors.minlength = 'Password must be at least 8 characters long.';
    }

    return Object.keys(errors).length ? errors : null;
  }

  // ✅ Helper for cleaner template code
  get f() {
    return this.farmerForm.controls;
  }

  onSubmit() {
    console.log(this.farmerForm.invalid);
    // console.log(f.get);
    console.log(this.farmerForm.value);
    
    
    
    if (this.farmerForm.valid) {
      console.log('✅ Farmer registration data:', this.farmerForm.value);
    } else {
      this.farmerForm.markAllAsTouched();
    }
  }

}
