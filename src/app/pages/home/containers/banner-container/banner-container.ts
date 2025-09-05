import { Component, computed, input, OnInit, WritableSignal } from '@angular/core';
import { IBanner } from '../../interfaces';
import { ELanguage, EStatus } from '../../../../core/enums';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
// import Swiper from 'swiper/bundle';

// import styles bundle
// import 'swiper/css/bundle';

@Component({
  selector: 'container-banner',
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './banner-container.html',
  styleUrl: './banner-container.scss',
})
export class BannerContainer implements OnInit{
  private router = inject(Router);

  ngOnInit(): void {
    this.swiper = new Swiper('.myswiper', {
      // Optional parameters
      direction: 'horizontal',
      loop: true,

      // If we need pagination
      pagination: {
        el: '.swiper-pagination',
      },

      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      // And if we need scrollbar
      scrollbar: {
        el: '.swiper-scrollbar',
      },
    });
  }
  swiper : any;

  readonly emptyBanner: IBanner[] = [
    {
      name: 'Loading...',
      action: 'https://google.com',
      heading: 'Test Heading',
      text: 'Test Text',
      image:
        'https://images.squarespace-cdn.com/content/v1/60f1a490a90ed8713c41c36c/1629223610791-LCBJG5451DRKX4WOB4SP/37-design-powers-url-structure.jpeg',
      buttons: {
        buttonOne: undefined,
        buttonTwo: undefined,
      },
      links: {},
      priority: 0,
    },
  ];

  bannerData = input<IBanner[]>(this.emptyBanner);
  index: WritableSignal<number> = signal(0);
  currentBanner = signal<IBanner>(this.bannerData()[0]);
  currentBannerTest = computed(() => this.bannerData()[this.index()]);

  nextBanner(event: MouseEvent) {
    event.stopPropagation();
    if (this.index() < this.bannerData().length - 1) {
      this.index.set(this.index() + 1);
    }
  }

  previousBanner(event: MouseEvent) {
    event.stopPropagation();
    if (this.index() >= 1) {
      this.index.set(this.index() - 1);
    }
  }

  bannerAction() {
    const action = this.currentBanner().action;
    if (!action) {
      return;
    }
    if (action.startsWith('http')) {
      window.open(action, '_blank');
    } else {
      this.router.navigateByUrl(action);
    }
  }

  getBannerImageURL(banner : IBanner) {
    return 'url(' + this.currentBannerTest().image + ')';
  }
}
