import { Component, inject, input } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { IProduct } from '../../interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-featured-product-container',
  imports: [MatButton],
  templateUrl: './featured-product-container.html',
  styleUrl: './featured-product-container.scss'
})
export class FeaturedProductContainer {
  private readonly _router = inject(Router);
  featuredProductData = input.required<IProduct[]>();


  redirectToProductPage(productId : number){
    this._router.navigate(['/products', productId])
  }
}
