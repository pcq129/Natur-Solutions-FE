import { Component, computed, input, WritableSignal } from '@angular/core';
import { IBanner } from '../../interfaces';
import { ELanguage, EStatus } from '../../../../core/enums';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { signal, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'container-banner',
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './banner-container.html',
  styleUrl: './banner-container.scss',
})
export class BannerContainer {
  private router = inject(Router);

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
  private index: WritableSignal<number> = signal(0);
  currentBanner = signal<IBanner>(this.bannerData()[0]);
  currentBannerTest = computed(() => this.bannerData()[this.index()]);

  nextBanner(event: MouseEvent) {
    event.stopPropagation();
    if (this.index() < this.bannerData().length - 1) {
      this.index.set(this.index() + 1);
    } else {
      console.log('not allowed', this.index());
    }
  }

  previousBanner(event: MouseEvent) {
    event.stopPropagation();
    if (this.index() >= 1) {
      this.index.set(this.index() - 1);
    } else {
      console.log('not allowed', this.index());
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

  getBannerImageURL() {
    return 'url(' + this.currentBannerTest().image + ')';
  }
}
