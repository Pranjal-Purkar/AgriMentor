import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-farm-visitiong-schedule',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './farm-visitiong-schedule.html',
  styleUrl: './farm-visitiong-schedule.css',
})
export class FarmVisitiongSchedule {
@Input() isOpen = false;                     // show/hide modal
  @Input() consultationId!: number;            // consultation ID
  @Output() close = new EventEmitter<void>();  // closes modal
  @Output() scheduled = new EventEmitter<any>(); // returns scheduled data

  farmVisitForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.farmVisitForm = this.fb.group({
      date: ['', Validators.required],
      time: ['', Validators.required],
      notes: ['', Validators.required],
    });
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
      visitStatus: 'SCHEDULED'
    };

    console.log('📌 Scheduling Farm Visit:', scheduledData);

    this.scheduled.emit(scheduledData);
    this.close.emit();
  }
}
