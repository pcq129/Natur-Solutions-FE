import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularServicesContainer } from './popular-services-container';

describe('PopularServicesContainer', () => {
  let component: PopularServicesContainer;
  let fixture: ComponentFixture<PopularServicesContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopularServicesContainer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopularServicesContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
