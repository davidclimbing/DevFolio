import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {NgClass, NgIf} from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    NgClass,
    NgIf
  ],
  templateUrl: './header.component.html',
  standalone: true,
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isCollapsed: boolean = false;
  toggleVerticalMenu: boolean = false;

  currentDevice: string | null = null;
  displayNameMap = new Map([
    [Breakpoints.XSmall, 'xs'],
    [Breakpoints.Small, 'sm'],
    [Breakpoints.Medium, 'md'],
    [Breakpoints.Large, 'lg'],
    [Breakpoints.XLarge, 'xl'],
  ]);

  get isMobile() {
    return this.currentDevice === 'xs' || this.currentDevice === 'sm';
  }

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .subscribe(result => {
        for (const query of Object.keys(result.breakpoints)) {
          if (result.breakpoints[query]) {
            this.currentDevice = this.displayNameMap.get(query);
          }
        }
      });
  }

  toggleVerticalMenuBar() {
    this.toggleVerticalMenu = !this.toggleVerticalMenu;
    this.isCollapsed = !this.isCollapsed;
  }
}
