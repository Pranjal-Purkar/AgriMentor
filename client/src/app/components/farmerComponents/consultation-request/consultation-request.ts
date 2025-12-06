import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-consultation-request',
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './consultation-request.html',
  styleUrl: './consultation-request.css',
})
export class ConsultationRequest {
  isOpen = true;
  consultationForm!: FormGroup;
  showConsultantSearch = false;
  consultantSearchQuery = '';
  selectedConsultant: any | null = null;

  // Mock consultant data - replace with actual API call
  allConsultants: any[] = [
    {
      id: '1',
      name: 'Dr. Rajesh Kumar',
      email: 'rajesh.kumar@agri.com',
      specialization: 'Sugarcane & Rice',
      experience: '15 years',
      rating: 4.8,
      availability: 'Available'
    },
    {
      id: '2',
      name: 'Dr. Priya Sharma',
      email: 'priya.sharma@agri.com',
      specialization: 'Wheat & Corn',
      experience: '12 years',
      rating: 4.9,
      availability: 'Available'
    },
    {
      id: '3',
      name: 'Suresh Bhor',
      email: 'sbhor12@gmail.com',
      specialization: 'All Crops',
      experience: '20 years',
      rating: 5.0,
      availability: 'Busy'
    },
    {
      id: '4',
      name: 'Dr. Anjali Patil',
      email: 'anjali.patil@agri.com',
      specialization: 'Cotton & Soybean',
      experience: '10 years',
      rating: 4.7,
      availability: 'Available'
    }
  ];

  filteredConsultants: any[] = [];

  requests: any[] = [
    {
      crop: 'Wheat',
      issue: 'Yellowing of leaves',
      urgency: 'High',
      status: 'Pending',
      date: '2025-11-28',
      consultant: 'Dr. Priya Sharma'
    },
    {
      crop: 'Rice',
      issue: 'Pest infestation',
      urgency: 'Normal',
      status: 'In Progress',
      date: '2025-11-27',
      consultant: 'Dr. Rajesh Kumar'
    },
    {
      crop: 'Corn',
      issue: 'Soil nutrition advice needed',
      urgency: 'Low',
      status: 'Completed',
      date: '2025-11-25',
      consultant: 'Dr. Anjali Patil'
    }
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.consultationForm = this.fb.group({
      topic: ['', Validators.required],
      description: ['', Validators.required],
      consultantEmail: ['', [Validators.required, Validators.email]],
      cropName: ['', Validators.required],
      cropCategory: [''],
      cropType: [''],
      cropDescription: [''],
      useExistingAddress: [false],
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pinCode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
      country: ['India', Validators.required],
      latitude: [''],
      longitude: ['']
    });

    this.consultationForm.get('useExistingAddress')?.valueChanges.subscribe(useExisting => {
      if (useExisting) {
        this.disableAddressFields();
      } else {
        this.enableAddressFields();
      }
    });

    this.filteredConsultants = this.allConsultants;
  }

  toggleForm(): void {
    this.isOpen = !this.isOpen;
    if (!this.isOpen) {
      this.showConsultantSearch = false;
      this.selectedConsultant = null;
      this.consultantSearchQuery = '';
    }
  }

  openConsultantSearch(): void {
    this.showConsultantSearch = true;
    this.filteredConsultants = this.allConsultants;
  }

  closeConsultantSearch(): void {
    this.showConsultantSearch = false;
    this.consultantSearchQuery = '';
  }

  searchConsultants(): void {
    const query = this.consultantSearchQuery.toLowerCase();
    this.filteredConsultants = this.allConsultants.filter(consultant =>
      consultant.name.toLowerCase().includes(query) ||
      consultant.email.toLowerCase().includes(query) ||
      consultant.specialization.toLowerCase().includes(query)
    );
  }

  selectConsultant(consultant: any): void {
    this.selectedConsultant = consultant;
    this.consultationForm.patchValue({
      consultantEmail: consultant.email
    });
    this.showConsultantSearch = false;
    this.consultantSearchQuery = '';
  }

  removeConsultant(): void {
    this.selectedConsultant = null;
    this.consultationForm.patchValue({
      consultantEmail: ''
    });
  }

  disableAddressFields(): void {
    ['street', 'city', 'state', 'pinCode', 'country'].forEach(field => {
      this.consultationForm.get(field)?.disable();
    });
  }

  enableAddressFields(): void {
    ['street', 'city', 'state', 'pinCode', 'country'].forEach(field => {
      this.consultationForm.get(field)?.enable();
    });
  }

  submitRequest(): void {
    if (this.consultationForm.invalid) {
      this.consultationForm.markAllAsTouched();
      return;
    }

    const formValue = this.consultationForm.getRawValue();
    
    const requestPayload = {
      topic: formValue.topic,
      description: formValue.description,
      consultantEmail: formValue.consultantEmail,
      crop: {
        name: formValue.cropName,
        category: formValue.cropCategory || null,
        type: formValue.cropType || null,
        description: formValue.cropDescription || null
      },
      farmAddress: {
        street: formValue.street,
        city: formValue.city,
        state: formValue.state,
        pinCode: formValue.pinCode,
        country: formValue.country,
        latitude: formValue.latitude || null,
        longitude: formValue.longitude || null
      },
      useExistingAddress: formValue.useExistingAddress
    };

    console.log('Request Payload:', requestPayload);

    const displayRequest = {
      crop: formValue.cropName,
      issue: formValue.topic,
      urgency: 'Normal',
      status: 'Pending',
      date: new Date().toISOString().split('T')[0],
      consultant: this.selectedConsultant?.name || 'Unknown'
    };

    this.requests.unshift(displayRequest);

    this.consultationForm.reset({
      useExistingAddress: false,
      country: 'India'
    });
    this.selectedConsultant = null;
    this.isOpen = false;
  }

  // In your component class
get initials(): string {
  return this.selectedConsultant?.name?.split(' ').map((n: string) => n[0]).join('') || '';
}
getInitials(name: string) {
  return name.split(' ').map(n => n[0]).join('');
}

  getStatusClass(status: string): string {
    switch(status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'In Progress': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Completed': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  }

  getUrgencyClass(urgency: string): string {
    switch(urgency) {
      case 'High': return 'text-red-600';
      case 'Normal': return 'text-blue-600';
      case 'Low': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  }

}
