import { TestBed } from '@angular/core/testing';

import { ServiceTechnicianServiceService } from './service-technician-service.service';

describe('ServiceTechnicianServiceService', () => {
  let service: ServiceTechnicianServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceTechnicianServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
