// src/app/services/search-bus.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, debounceTime, distinctUntilChanged } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class SearchBusService {
  private readonly _query$ = new BehaviorSubject<string>('');

  /** stream other comps subscribe to */
  query$ = this._query$
    .asObservable()
    .pipe(debounceTime(150), distinctUntilChanged());

  /** the latest value (getter) */
  get current(): string {
    return this._query$.value;
  }

  update(v: string) {
    this._query$.next(v.trim().toLowerCase());
  }
}