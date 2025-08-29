import { Component, input } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { IProduct } from '../../interfaces';

@Component({
  selector: 'app-featured-product-container',
  imports: [MatButton],
  templateUrl: './featured-product-container.html',
  styleUrl: './featured-product-container.scss'
})
export class FeaturedProductContainer {
  featuredProductData = input.required<IProduct[]>();

}
