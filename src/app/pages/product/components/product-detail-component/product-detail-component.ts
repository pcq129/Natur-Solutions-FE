import { IProductSection } from './../../interface/IProductDetail';
import { IProduct } from './../../../home/interfaces/IProduct';
import { Component, signal, inject, computed } from '@angular/core';
import { DetailSection } from '../../containers/detail-section/detail-section';
import { Comments } from '../../containers/comments/comments';
import { IProductDetail } from '../../interface/IProductDetail';
import { ProductDetailService } from '../../services/product-detail-service';
import { IApiResponse } from '../../../../core/interface/IApiResponse';
import { SnackbarService } from '../../../../shared/services/snackbar-service';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import Swiper from 'swiper';
import 'swiper/css';
// import 'swiper/css/navigation';
// import { SwiperContainer } from 'swiper/element';

@Component({
  selector: 'app-product-detail-component',
  imports: [DetailSection, Comments],
  templateUrl: './product-detail-component.html',
  styleUrl: './product-detail-component.scss',
})
export class ProductDetailComponent {
  private readonly _productDetail = inject(ProductDetailService);
  private readonly _snackbar = inject(SnackbarService);
  private readonly _router = inject(Router);
  private readonly _activatedRoute = inject(ActivatedRoute);

  constructor() {

    this.swiper = new Swiper(".mySwiper", {
      spaceBetween: 10,
      slidesPerView: 4,
      freeMode: true,
      watchSlidesProgress: true,
    });
    this.swiper2 = new Swiper(".mySwiper2", {
      spaceBetween: 10,
      // navigation: {
      //   nextEl: ".swiper-button-next",
      //   prevEl: ".swiper-button-prev",
      // },
      thumbs: {
        swiper: this.swiper,
      },
    });

    console.log(this._activatedRoute.paramMap);
    this._activatedRoute.params.subscribe((params) => {
      this.productId.set(params['productId']);
    });
    console.log(this.productId());

    this._productDetail.getProductDetails(this.productId()).subscribe({
      next: (res: any) => {
        this.ProductData.set(res);
        this.count = res.minimumQuantity;
        this.filteredSections = res.sections.filter(
          (section: IProductSection) => section.name !== 'Description'
        );
        console.log(this.filteredSections);
        console.log(res);
      },
      error: (err) => {
        this._snackbar.error(err.error.message);
      },
    });
  }

  ProductData = signal<IProductDetail>({
    id: 0,
    name: 'Loading',
    productImages: ['loading'],
    sections: [],
    services: [],
    minimumQuantity: 6,
  });

  filteredSections: IProductSection[] | undefined;
  productId = signal(0);
  productDescription = computed(() => {
    const product = this.ProductData();
    return product.sections.find((section) => section.name === 'Description');
  });

  count = 0;
  addBtnDisabled = signal(false);
  removeBtnDisabled = signal(true);
  addCount(flag: boolean) {
    if (flag && this.count < 10) {
      this.count++;
      if (this.count === 10) {
        this.addBtnDisabled.set(true);
      } else {
        this.addBtnDisabled.set(false);
        this.removeBtnDisabled.set(false);
      }
    } else if (!flag && this.count > this.ProductData().minimumQuantity) {
      this.count--;
      if (this.count === this.ProductData().minimumQuantity) {
        this.addBtnDisabled.set(false);
        this.removeBtnDisabled.set(true);
      } else {
        this.addBtnDisabled.set(false);
      }
    }
  }

  swiper : any;
  swiper2 :any;
}
