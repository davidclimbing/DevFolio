import { Injectable } from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";

declare var gtag: Function;

@Injectable({
  providedIn: 'root'
})
export class GtagService {
  is_activated = false;
  gaMeasurementId = "G-91JYDZ0SXE";

  constructor(private router: Router) {
  }

  public initialize() {
    // dynamically add analytics scripts to document head
    try {
      const gtagScript = document.createElement('script');
      gtagScript.async = true;
      gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${this.gaMeasurementId}`;
      document.head.appendChild(gtagScript);

      const gtagConfig: { [k: string]: any } = {send_page_view: false};

      const dataLayerScript = document.createElement('script');
      dataLayerScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${this.gaMeasurementId}', ${JSON.stringify(gtagConfig)});`;
      document.head.appendChild(dataLayerScript);
      this.is_activated = true;
    } catch (e) {
      console.error('Error adding Google Analytics', e);
    }

    this.onRouteChange();
  }

  // track visited routes
  private onRouteChange() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (this.is_activated && typeof gtag === 'function') {
          gtag('config', this.gaMeasurementId, {
            page_path: event.urlAfterRedirects,
          });
        }
      }
    });
  }

  public event(action: string, value?: Object) {
    if (this.is_activated && typeof gtag === 'function') {
      gtag('event', action, value);
    }
  }

  public get(fieldName: string, callback: Function) {
    if (this.is_activated && typeof gtag === 'function') {
      gtag('get', this.gaMeasurementId, fieldName, callback);
    }
  }
}
