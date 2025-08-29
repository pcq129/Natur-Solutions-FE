import { Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { ELanguage } from '../../../core/enums/ELanguage';
import { TitleCasePipe } from '@angular/common';
import { LanguageService } from '../../services/language-service';
import { inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  imports: [MatSelectModule, MatButton],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private router = inject(Router);
  private languageService = inject(LanguageService);

  _currentLanguage = this.languageService.getLocale();
  ELanguage = ELanguage;
  private titleCasePipe = new TitleCasePipe();
  languages = Object.keys(ELanguage).map((key) => ({
    value: ELanguage[key as keyof typeof ELanguage],
    label: this.titleCasePipe.transform(key.toString()),
  }));

  readonly languageOptions: ELanguage[] = Object.values(ELanguage) as ELanguage[];

  // getCurrentLanguageName(): string {
  //   let language = Object.keys(ELanguage).find(
  //     (key) => ELanguage[key as keyof typeof ELanguage] === this._currentLanguage
  //   ) as keyof typeof ELanguage;

  //   return this.titleCasePipe.transform(language);
  // }

  getCurrentLanguage(){
    return this._currentLanguage;
  }

  redirectToHomePage(){
    this.router.navigate(['']);
  }
}
