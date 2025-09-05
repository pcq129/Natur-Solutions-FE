import { Component, OnInit } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { ELanguage } from '../../../core/enums/ELanguage';
import { TitleCasePipe } from '@angular/common';
import { LanguageService } from '../../services/language-service';
import { inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../auth/services/auth-service';
import { LoginService } from '../../../auth/components/login-component/login-service';
import { SnackbarService } from '../../../shared/services/snackbar-service';

@Component({
  selector: 'app-header',
  imports: [MatSelectModule, MatButton, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit {
  private router = inject(Router);
  private languageService = inject(LanguageService);
  private readonly _authService = inject(AuthService);
  private readonly _loginService = inject(LoginService);
  private readonly _snackbar = inject(SnackbarService);

  _currentLanguage = this.languageService.getLocale();
  ELanguage = ELanguage;
  private titleCasePipe = new TitleCasePipe();
  languages = Object.keys(ELanguage).map((key) => ({
    value: ELanguage[key as keyof typeof ELanguage],
    label: this.titleCasePipe.transform(key.toString()),
  }));

  ngOnInit(): void {
    this._authService._isLoggedIn.subscribe({
      next: (res) => {
        console.log(res);
        this.isLoggedIn = res;
      },
    });
  }

  readonly languageOptions: ELanguage[] = Object.values(ELanguage) as ELanguage[];

  // getCurrentLanguageName(): string {
  //   let language = Object.keys(ELanguage).find(
  //     (key) => ELanguage[key as keyof typeof ELanguage] === this._currentLanguage
  //   ) as keyof typeof ELanguage;

  //   return this.titleCasePipe.transform(language);
  // }

  getCurrentLanguage() {
    return this._currentLanguage;
  }

  redirectToHomePage() {
    this.router.navigate(['']);
  }

  logout() {
    this._loginService.logout();
  }

  isLoggedIn = false;
}
