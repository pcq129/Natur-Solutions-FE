import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ICms } from '../../interfaces';
import { map } from 'rxjs';

@Component({
  selector: 'app-cms-component',
  imports: [],
  providers: [],
  templateUrl: './cms-component.html',
  styleUrl: './cms-component.scss'
})
export class CmsComponent {
  private _route = inject(ActivatedRoute);

  cms = toSignal<ICms>(this._route.data.pipe(map(d => d['cms'] as ICms)));

  getTitle(text: string){
    text = text.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
    return text;
  }
}
