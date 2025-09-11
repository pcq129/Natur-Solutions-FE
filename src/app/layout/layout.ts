import { Component, signal, inject, computed } from '@angular/core';
import { Header } from './components/header/header';
import { Footer } from "./components/footer/footer";
import { RouterOutlet } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoaderService } from '../core/services/loader-service';

@Component({
  selector: 'app-layout',
  imports: [Header, Footer, RouterOutlet, MatProgressSpinnerModule],
  templateUrl: './layout.html',
  styleUrl: './layout.scss'
})
export class Layout {
  private readonly _loader = inject(LoaderService);

    isLoading = computed(this._loader.isLoading);
}
