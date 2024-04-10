import { TestBed } from '@angular/core/testing';

import { ListCompanyService } from './list-company.service';

describe('ListCompanyService', () => {
  let service: ListCompanyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListCompanyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
