import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedProductContainer } from './featured-product-container';

describe('FeaturedProductContainer', () => {
  let component: FeaturedProductContainer;
  let fixture: ComponentFixture<FeaturedProductContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturedProductContainer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeaturedProductContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
