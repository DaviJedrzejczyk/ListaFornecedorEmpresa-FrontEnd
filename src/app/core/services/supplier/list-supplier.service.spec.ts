import { TestBed } from '@angular/core/testing';

import { ListSupplierService } from './list-supplier.service';

describe('ListSupplierService', () => {
  let service: ListSupplierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListSupplierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
