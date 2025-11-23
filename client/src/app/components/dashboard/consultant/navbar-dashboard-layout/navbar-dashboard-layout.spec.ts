import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarDashboardLayout } from './navbar-dashboard-layout';

describe('NavbarDashboardLayout', () => {
  let component: NavbarDashboardLayout;
  let fixture: ComponentFixture<NavbarDashboardLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarDashboardLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarDashboardLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
