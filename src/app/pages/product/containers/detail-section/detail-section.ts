import { Component, input, signal } from '@angular/core';
import { IProductSection } from '../../interface/IProductDetail';

@Component({
  selector: 'app-detail-section',
  imports: [],
  templateUrl: './detail-section.html',
  styleUrl: './detail-section.scss'
})
export class DetailSection {
    sectionData = input.required<IProductSection>()
}
