import {Injectable, signal, WritableSignal} from '@angular/core';
import { THEME } from '../schemas/ui';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  defaultTheme: string = THEME.DARK;
  themeSignal: WritableSignal<string> = signal(this.defaultTheme);
  themeSubject: BehaviorSubject<string> = new BehaviorSubject<string>(this.defaultTheme);

  constructor() { }

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
    theme ? this.defaultTheme = theme : this.defaultTheme;
    document.body.classList.forEach(cls => {
      if (cls.startsWith('theme')) {
        document.body.classList.remove(cls);
      }
    })

    document.body.classList.add(`theme-${this.defaultTheme}`);
    localStorage.setItem('theme', this.defaultTheme);
  }
}
