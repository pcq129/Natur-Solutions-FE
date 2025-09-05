import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchOfficeContainer } from './branch-office-container';

describe('BranchOfficeContainer', () => {
  let component: BranchOfficeContainer;
  let fixture: ComponentFixture<BranchOfficeContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BranchOfficeContainer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BranchOfficeContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
