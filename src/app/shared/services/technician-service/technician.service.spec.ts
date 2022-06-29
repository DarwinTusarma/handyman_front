import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { TechnicianService } from './technician.service';

describe('TechnicianService', () => {
  let service: TechnicianService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(TechnicianService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
