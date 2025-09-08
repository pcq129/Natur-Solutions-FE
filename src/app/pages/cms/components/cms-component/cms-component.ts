import { Component, inject, signal, AfterViewInit, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { ICms } from '../../interfaces';
import { map } from 'rxjs';

@Component({
  selector: 'app-cms-component',
  imports: [],
  providers: [],
  templateUrl: './cms-component.html',
  styleUrl: './cms-component.scss',
})
export class CmsComponent implements OnInit{


  ngOnInit(): void {
    this.location = this.getBreadCrumb();
  }

  private _router = inject(Router);
  private _route = inject(ActivatedRoute);

  cms = toSignal<ICms>(this._route.data.pipe(map((d) => d['cms'] as ICms)));

  getTitle(text: string) {
    console.log(this._route.snapshot.paramMap.get('cms'), this._router.url);
    text = text
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
    return text;
  }

  location: string[] = [];

  getBreadCrumb() {
    return this._router.url
      .split('/')
      .filter(Boolean)
      .map((segment) => segment.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()));
  }
}
