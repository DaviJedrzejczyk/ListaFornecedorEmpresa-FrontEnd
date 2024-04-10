import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyInsertComponent } from './company-insert.component';

describe('CompanyInsertComponent', () => {
  let component: CompanyInsertComponent;
  let fixture: ComponentFixture<CompanyInsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyInsertComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompanyInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
