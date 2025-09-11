import { Injectable } from '@angular/core';
import { BaseService } from '../../../core/services/base-service';
import { BehaviorSubject, map } from 'rxjs';
import { C } from '@angular/cdk/keycodes';

@Injectable({
  providedIn: 'root',
})
export class ProductDetailService extends BaseService {
  getProductDetails(id: number) {
    return this._http
      .getRequest(this._apiBaseUrl + this._endpoints.GET_PRODUCT_DETAIL + id, false, {
        id: id,
      })
      .pipe(
        map((res: any) => {
          const data = res.data;

          const name = data.name;
          const id = data.id;
          const productImages = data.product_images;
          const productVideo = data.product_video.map((v: any) => ({
            id: v.product_id,
            filePath: v.file_path,
            fileType: v.file_type,
            fileName: v.file_name,
          }));
          const productDocuments = data.product_documents.map((v: any) => ({
            id: v.product_id,
            filePath: v.file_path,
            fileType: v.file_type,
            fileName: v.file_name,
          }));
          const sections = data.sections.map((s: any) => ({
            name: s.name,
            content: s.content,
            type: s.type,
            priority: s.priority,
            product_id: s.product_id,
          }));
          const services = data.services.map((s: any) => ({
            id: s.id,
            name: s.name,
            firstService: s.first_service,
            secondService: s.second_service,
            thirdService: s.third_service,
          }));
          const minimumQuantity = data.minimum_quantity;

          return {
            id,
            name,
            productImages,
            productVideo,
            productDocuments,
            sections,
            services,
            minimumQuantity
          };
        })
      );
  }
}
