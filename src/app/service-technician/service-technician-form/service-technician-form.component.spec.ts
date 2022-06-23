import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceTechnicianFormComponent } from './service-technician-form.component';

describe('ServiceTechnicianFormComponent', () => {
  let component: ServiceTechnicianFormComponent;
  let fixture: ComponentFixture<ServiceTechnicianFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceTechnicianFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceTechnicianFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
