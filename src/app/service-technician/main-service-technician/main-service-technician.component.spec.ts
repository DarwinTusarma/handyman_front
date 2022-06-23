import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainServiceTechnicianComponent } from './main-service-technician.component';

describe('MainServiceTechnicianComponent', () => {
  let component: MainServiceTechnicianComponent;
  let fixture: ComponentFixture<MainServiceTechnicianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainServiceTechnicianComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainServiceTechnicianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
