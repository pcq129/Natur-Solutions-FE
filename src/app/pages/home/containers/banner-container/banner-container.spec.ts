import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerContainer } from './banner-container';

describe('BannerContainer', () => {
  let component: BannerContainer;
  let fixture: ComponentFixture<BannerContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BannerContainer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BannerContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
