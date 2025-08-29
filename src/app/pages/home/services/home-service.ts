import { contentChild, contentChildren, inject, Injectable } from '@angular/core';
import { HttpService } from '../../../core/services/http-service';
import { HOME_API } from '../../../../environments/APIs/homeApi';
import { environment } from '../../../../environments/environment';
import { map } from 'rxjs';

import { IBanner, ICategory, IButton, IContact, IProduct, IService } from '../interfaces';

export interface IHomeResponse {
  banners: IBanner[];
  categories: ICategory[];
  featuredProducts: IProduct[];
  popularServices: any[]; // you can strongly type later
  contactDetails: IContact[];
}

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private readonly _http = inject(HttpService);
  private readonly _endpoints = HOME_API;
  private readonly _apiBaseUrl = environment.apiUrl;

  getHomeData() {
    const endpoint = this._apiBaseUrl + this._endpoints.GET_HOMEPAGE_DATA;
    return this._http.getRequest(endpoint, false).pipe(
      map((res: any) => {
        const data = res.data;
        console.log(data);
        const banners: IBanner[] = data.banners.map((b: any) => ({
          name: b.name,
          image: b.image,
          action: b.banner_link,
          heading: b.overlay_heading,
          text: b.overly_text,
          buttons: {
            buttonOne: b.buttons?.button_one,
            buttonTwo: b.buttons?.button_two,
          },
          links: {
            linkOne: b.links?.link_one,
            linkTwo: b.links?.link_two,
          },
          priority: b.priority,
        }));

        const categories: ICategory[] = data.categories.map((c: any) => ({
          id: c.id,
          name: c.name,
          image: c.image,
        }));

        const featuredProducts: IProduct[] = data.featuredProducts.map((p: any) => ({
          id: p.id,
          name: p.name,
          description: p.description,
          image: p.image,
        }));

        const popularServices: IService[] = data.featuredServices.map((s: any) => ({
          icon: s.icon,
          description: s.description,
          name: s.name,
          id: s.serviceId,
        }));

        const contactDetails: IContact[] = data.contactDetails.map((c: any) => ({
          name: c.name,
          type: c.contact_type,
          contact: c.contact,
          buttonText: c.button_text,
          actionUrl: c.action_url,
        }));

        console.log({ banners, categories, featuredProducts, popularServices, contactDetails });
        return {
          banners,
          categories,
          featuredProducts,
          popularServices,
          contactDetails,
        };
      })
    );
  }
}
