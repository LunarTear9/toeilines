import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class GoogleMapsLoaderService {
  private apiLoaded = false;
  private loadingPromise?: Promise<void>;

  load(apiKey: string): Promise<void> {
    if (this.apiLoaded) return Promise.resolve();

    if (!this.loadingPromise) {
      this.loadingPromise = new Promise<void>((resolve, reject) => {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
        script.async = true;
        script.defer = true;

        script.onload = () => {
          this.apiLoaded = true;
          resolve();
        };

        script.onerror = () => reject('Failed to load Google Maps API');

        document.head.appendChild(script);
      });
    }

    return this.loadingPromise;
  }
}
