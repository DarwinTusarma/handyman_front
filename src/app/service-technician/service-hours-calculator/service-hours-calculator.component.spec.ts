import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceHoursCalculatorComponent } from './service-hours-calculator.component';

describe('ServiceHoursCalculatorComponent', () => {
  let component: ServiceHoursCalculatorComponent;
  let fixture: ComponentFixture<ServiceHoursCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceHoursCalculatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceHoursCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
