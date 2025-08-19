// src/app/services/train-information.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap, timer } from 'rxjs';
import { Train } from '../models/train.model';

@Injectable({ providedIn: 'root' })
export class TrainInformationService {

  private http = inject(HttpClient);

  /** emit a fresh array every `intervalMs` milliseconds */
  streamForStation(stationCode: string, intervalMs = 15000): Observable<Train[]> {
    return timer(0, intervalMs).pipe(
      switchMap(() =>
        this.http.get<Train[]>(`/api/live-trains?station=${stationCode}`)
      )
    );
  }
}
