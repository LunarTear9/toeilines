// src/app/services/train-position.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { timer, switchMap, shareReplay } from 'rxjs';

export interface TrainPos {
  trainNumber: string;
  line: 'Asakusa' | 'Mita' | 'Shinjuku' | 'Oedo';
  lat: number;
  long: number;
  bearing: number;
}

@Injectable({ providedIn: 'root' })
export class TrainPositionService {
  private http = inject(HttpClient);
  private endpoint = 'https://api.pitmtech.com/api/train-positions';

  /** hot observable that updates every 15 s */
  live$ = timer(0, 30000).pipe(
    switchMap(() => this.http.get<TrainPos[]>(this.endpoint)),
    shareReplay(1)
  );
}
function normalizeTrainNumber(posNumber: string): string {
  // Extract the last 4 characters before the trailing number (optional)
  const match = posNumber.match(/(\d{3}[A-Z])/);
  return match ? match[1] : posNumber;
}
