import { Component, inject, signal } from '@angular/core';
import { Slogan } from './containers/slogan/slogan';
import { BannerContainer } from './containers/banner-container/banner-container';
import { FeaturedProductContainer } from './containers/featured-product-container/featured-product-container';
import { PopularServicesContainer } from './containers/popular-services-container/popular-services-container';
import { Contact } from './containers/contact/contact';
import { HomeService, IHomeResponse } from './services/home-service';
import { BranchOfficeContainer } from "./containers/branch-office-container/branch-office-container";

@Component({
  selector: 'app-home',
  imports: [
    BannerContainer,
    Slogan,
    FeaturedProductContainer,
    PopularServicesContainer,
    Contact,
    BranchOfficeContainer,
],
  providers: [HomeService],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private readonly _homeService = inject(HomeService);

  // TODO: implement interface for the data received from backend (time constraint for now).

  data = signal<IHomeResponse | null>(null);

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this._homeService.getHomeData().subscribe((res) => {
      this.data.set(res);
    });
  }
}
