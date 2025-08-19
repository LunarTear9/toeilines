import { Component, OnInit, inject } from '@angular/core';
import { DatePipe, DecimalPipe, NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-clock',
  standalone: true,                       // 👈 add this if it isn't already
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css'],   // 👈 plural: styleUrls
  imports: [
    NgIf,            // *ngIf directive
    DatePipe,        // date pipe
    DecimalPipe,     // number / decimal pipe
    HttpClientModule // makes HttpClient injection work in a stand-alone cmp
  ],
})
export class ClockComponent implements OnInit {
  currentTime = new Date();
  temperature: number | null = null;
  precipitation: number | null = null;

  private http = inject(HttpClient);

  constructor() {
    /* tick the clock every second */
    setInterval(() => (this.currentTime = new Date()), 1_000);
  }

  ngOnInit(): void {
    this.fetchWeather();
    setInterval(() => this.fetchWeather(), 10 * 60 * 1_000); // every 10 min
  }

  private fetchWeather(): void {
    const url =
      'https://api.open-meteo.com/v1/forecast?latitude=35.6895&longitude=139.6917&current=temperature_2m,precipitation';

    this.http.get<any>(url).subscribe({
      next: data => {
        /* null-coalescing keeps template happy if the field is missing */
        this.temperature    = data?.current?.temperature_2m ?? null;
        this.precipitation  = data?.current?.precipitation  ?? null;
      },
      error: err => console.error('Weather fetch failed:', err),
    });
  }
}
