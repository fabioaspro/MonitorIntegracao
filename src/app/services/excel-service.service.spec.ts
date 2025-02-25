import { TestBed } from '@angular/core/testing';

import { ExcelServiceService } from './excel-service.service';

describe('ExcelServiceService', () => {
  let service: ExcelServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExcelServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
