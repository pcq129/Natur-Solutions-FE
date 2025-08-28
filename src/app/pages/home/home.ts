import { Component, inject, signal } from '@angular/core';
import { Slogan } from './containers/slogan/slogan';
import { BannerContainer } from './containers/banner-container/banner-container';
import { FeaturedProductContainer } from './containers/featured-product-container/featured-product-container';
import { PopularServicesContainer } from './containers/popular-services-container/popular-services-container';
import { Contact } from './containers/contact/contact';
import { HomeService, IHomeResponse } from './services/home-service';

@Component({
  selector: 'app-home',
  imports: [BannerContainer, Slogan, FeaturedProductContainer, PopularServicesContainer, Contact],
  providers: [HomeService],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private readonly _homeService = inject(HomeService);

  // TODO: implement interface for the data received from backend (time constraint for now).
  /**
   * {
    banners: [
      {
        name: 'August two five test banner',
        image: 'http://localhost:8000/storage/banner/1756126383_4kiLbxYsyO.png',
        action: 'https://unpkg.com/toastify-js@1.12.0/src/toastify.js',
        heading: 'Overlay heading',
        text: 'Overlay Sub-Text',
        buttons: {
          buttonOne: {
            text: 'adfadsf',
            link: 'https://unpkg.com/toastify-js@1.12.0/src/toastify.js',
          },
          buttonTwo: {
            text: 'adsfads',
            link: 'https://unpkg.com/toastify-js@1.12.0/src/toastify.js',
          },
        },
        links: {
          linkOne: {
            text: 'adfadsfa',
            link: 'https://unpkg.com/toastify-js@1.12.0/src/toastify.js',
          },
          linkTwo: {
            text: 'adsfadsf',
            link: 'https://unpkg.com/toastify-js@1.12.0/src/toastify.js',
          },
        },
        priority: 1
      },
    ],
    categories: [
      {
        id: 1,
        name: 'Ecatedafadsfa',
        image: null,
      },
      {
        id: 15,
        name: 'Fiscal Device Category',
        image: null,
      },
      {
        id: 16,
        name: 'Cash Registers',
        image: '/storage/product/images/11/1755057992_dbEFQV4POK.png',
      },
    ],
    featuredProducts: [
      {
        id: 1,
        name: 'productasdfadsf',
        description: null,
        image: {
          id: 2,
          product_id: 3,
          file_path: ''
        },
      },
      {
        id: 2,
        name: 'adfasdfasf',
        description: null,
        image: {
          id: 2,
          product_id: 3,
          file_path: ''
        },
      },
      {
        id: 5,
        name: 'Meta PRo',
        description: null,
        image: {
          id: 2,
          product_id: 3,
          file_path: ''
        },
      },
    ],
    popularServices: [
      {
        icon: 'http://localhost:8000/storage/Service/ServiceIcons//storage/Service/ServiceIcons/1754641788_ZFSqR3LLjA.png',
        description: 'afsadfasdfdafdsfasfds',
        name: 'Service one',
        id: 1,
      },
      {
        icon: 'http://localhost:8000/storage/Service/ServiceIcons//storage/Service/ServiceIcons/1754890498_5wlYsSrmLB.png',
        description: 'fasdfasdfas',
        name: 'adsfasdfads',
        id: 2,
      },
    ],
    contactDetails: [
      {
        name: 'adfadsfdsf',
        type: 2,
        contact: '5644554565',
        buttonText: 'safsadfsdfsafd',
        actionUrl: 'http://google.co',
      },
    ],
  }
   */
  data = signal<IHomeResponse>();

  ngOnInit() {
    this._homeService.getHomeData().subscribe((res) => {
      this.data.set(res);
    });
  }
}
