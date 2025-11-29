import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-consultation-request',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './consultation-request.html',
  styleUrls: ['./consultation-request.css']
})
export class ConsultationRequest implements OnInit {
  isOpen = false;
  consultationForm!: FormGroup;

  requests: any[] = [
 {
 crop: 'Wheat',
 issue: 'Yellowing of leaves',
 urgency: 'High',
 status: 'Pending',
 date: '2025-11-28'
 },
 {
 crop: 'Rice',
 issue: 'Pest infestation',
 urgency: 'Normal',
 status: 'Approved',
 date: '2025-11-27'
 },
 {
 crop: 'Corn',
 issue: 'Soil nutrition advice needed',
 urgency: 'Low',
 status: 'Rejected',
 date: '2025-11-25'
 }
 ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.consultationForm = this.fb.group({
      cropName: ['', Validators.required],
      issue: ['', Validators.required],
      urgency: ['Normal', Validators.required],
    });
  }

  toggleForm(): void {
    this.isOpen = !this.isOpen;
  }

  submitRequest(): void {
    if (this.consultationForm.invalid) {
      this.consultationForm.markAllAsTouched();
      return;
    }

    const req = {
      crop: this.consultationForm.value.cropName,
      issue: this.consultationForm.value.issue,
      urgency: this.consultationForm.value.urgency,
      status: 'Pending'
    };

    // this.requests.unshift(req);

    this.consultationForm.reset({ urgency: 'Normal' });
    this.isOpen = false;
  }
}
