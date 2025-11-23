import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultntDashboardLayout } from './consultnt-dashboard-layout';

describe('ConsultntDashboardLayout', () => {
  let component: ConsultntDashboardLayout;
  let fixture: ComponentFixture<ConsultntDashboardLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultntDashboardLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultntDashboardLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
