import { Injectable } from '@angular/core';
import { ELanguage } from '../../core/enums';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  getLocale(): string {
    return localStorage.getItem('locale') ?? ELanguage.ENGLISH.valueOf();
  }
}
