import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierInsertComponent } from './supplier-insert.component';

describe('SupplierInsertComponent', () => {
  let component: SupplierInsertComponent;
  let fixture: ComponentFixture<SupplierInsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupplierInsertComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SupplierInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
