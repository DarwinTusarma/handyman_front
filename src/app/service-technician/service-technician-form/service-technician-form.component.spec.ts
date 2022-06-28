import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ServiceTechnicianServiceMock } from '@app/shared/mocks/services-mocks/service-technician-service.mock';
import { ServicesServiceMock } from '@app/shared/mocks/services-mocks/services-service.mock';
import { TechnicianServiceMock } from '@app/shared/mocks/services-mocks/technician-service.mock';
import { ServiceTechnicianService } from '@app/shared/services/service-technician-service/service-technician.service';
import { ServicesService } from '@app/shared/services/services-service/services.service';
import { TechnicianService } from '@app/shared/services/technician-service/technician.service';
import { NotifierModule } from 'angular-notifier';

import { ServiceTechnicianFormComponent } from './service-technician-form.component';

fdescribe('ServiceTechnicianFormComponent', () => {
  let component: ServiceTechnicianFormComponent;
  let fixture: ComponentFixture<ServiceTechnicianFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceTechnicianFormComponent ],
      imports: [
        ReactiveFormsModule,
        NotifierModule
      ],
      providers: [
        {provide: TechnicianService, useValue: TechnicianServiceMock},
        {provide: ServicesService, useValue: ServicesServiceMock},
        {provide: ServiceTechnicianService, useValue: ServiceTechnicianServiceMock}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceTechnicianFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('[Form validations]', () => {
    describe('Control "idService"', () => {
      it('When control has an empty value, should be invalid', () => {
        const idServiceControl = component.form.get('idService');
        const emptyValue = '';

        idServiceControl?.setValue(emptyValue);

        const required = idServiceControl?.errors? idServiceControl?.errors['required'] : false;
        expect(required).toBeTruthy();
      })
    })
  })
});
