  import { Component, input, inject } from '@angular/core';
  import { MatButton } from '@angular/material/button';
  import { IService } from '../../interfaces';
  import { CdkAutofill } from "@angular/cdk/text-field";
  import { Router } from '@angular/router';
  import { NavigationExtras } from '@angular/router';

  @Component({
    selector: 'app-popular-services-container',
    imports: [MatButton],
    templateUrl: './popular-services-container.html',
    styleUrl: './popular-services-container.scss'
  })
  export class PopularServicesContainer {
      popularServicesData = input.required<IService[]>();
      router = inject(Router);

      redirectToServiceDetailPage(id: number){
        this.router.navigate(['service-detail'], {
          queryParams:
          {
            id: id
          }
        });
      }
  }
