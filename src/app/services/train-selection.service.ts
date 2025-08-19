import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TrainSelectionService {
  private _sel$ = new BehaviorSubject<string>('');   // trainNumber
  sel$ = this._sel$.asObservable();
  update(id: string) { this._sel$.next(id); }
}