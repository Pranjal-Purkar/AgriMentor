import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';

// Custom validator to ensure date is in the future
function futureDateValidator(control: AbstractControl): ValidationErrors | null {
  if (!control.value) {
    return null; // Don't validate empty values (let required validator handle that)
  }

  const selectedDate = new Date(control.value);
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset time to start of day for fair comparison

  if (selectedDate <= today) {
    return { pastDate: true };
  }

  return null;
}

@Component({
  selector: 'app-farm-visitiong-schedule',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './farm-visitiong-schedule.html',
  styleUrl: './farm-visitiong-schedule.css',
})
export class FarmVisitiongSchedule {
  @Input() isOpen = false; // show/hide modal
  @Input() consultationId!: number; // consultation ID
  @Output() close = new EventEmitter<void>(); // closes modal
  @Output() scheduled = new EventEmitter<any>(); // returns scheduled data

  farmVisitForm: FormGroup;
  minDate: string; // Minimum date for the date input

  constructor(private fb: FormBuilder) {
    // Set minimum date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.minDate = tomorrow.toISOString().split('T')[0];

    this.farmVisitForm = this.fb.group({
      date: ['', [Validators.required, futureDateValidator]],
      time: ['', Validators.required],
      notes: [''],
    });
  }

  // Getter for easy access to form controls
  get f() {
    return this.farmVisitForm.controls;
  }

  closeModal() {
    this.close.emit();
  }

  submitSchedule() {
    if (this.farmVisitForm.invalid) {
      this.farmVisitForm.markAllAsTouched();
      return;
    }

    const { date, time, notes } = this.farmVisitForm.value;

    const scheduledData = {
      consultationId: this.consultationId,
      scheduledDate: `${date}T${time}`,
      visitNotes: notes,
      visitStatus: 'SCHEDULED',
    };

    console.log('📌 Scheduling Farm Visit:', scheduledData);

    this.scheduled.emit(scheduledData);
    this.close.emit();
  }
}
