import {Injectable, signal, WritableSignal} from '@angular/core';
import { THEME } from '../schemas/ui';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  defaultTheme: string = THEME.DARK;
  localTheme: string | null = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;
  themeSignal: WritableSignal<string> = signal(this.localTheme || THEME.DARK);

  constructor() {
    this.defaultTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : this.defaultTheme;
  }

  themeInitialize() {
    document.body.classList.forEach(cls => {
      if (cls.startsWith('theme')) {
        document.body.classList.remove(cls);
      }
    })

    document.body.classList.add(`theme-${this.defaultTheme}`);
    localStorage.setItem('theme', this.defaultTheme);
  }

  setTheme(theme: string) {
    this.themeSignal.update(() => theme ? theme : this.defaultTheme);
    document.body.classList.forEach(cls => {
      if (cls.startsWith('theme')) {
        document.body.classList.remove(cls);
      }
    })

    document.body.classList.add(`theme-${this.themeSignal()}`);
    localStorage.setItem('theme', this.themeSignal());
  }
}
