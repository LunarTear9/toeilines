import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchBusService } from '../../services/search-bus.service';
import { TrainPositionService, TrainPos } from '../../services/train-position.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { EventEmitter, Output } from '@angular/core';
import { TrainTile } from '../../models/train.model';



interface TrainRaw {
  'odpt:trainNumber': string;
  'odpt:railway': string;
  'odpt:delay': number;
  'odpt:toStation'?: string | null;
  'odpt:fromStation': string;
}



@Component({
  selector: 'app-live-trains',
  standalone: true,
  templateUrl: './live-trains.component.html',
  styleUrls: ['./live-trains.component.css'],
  imports: [CommonModule, FormsModule, HttpClientModule],
  animations: [
    trigger('listAnim', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(-8px)' }),
          stagger(50, animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })))
        ], { optional: true }),
        query(':leave', [
          stagger(50, animate('200ms ease-in', style({ opacity: 0, transform: 'translateY(8px)' })))
        ], { optional: true })
      ])
    ]),
    trigger('tileAnim', [
      transition(':increment', [
        animate('250ms ease-in', style({ background: '#fff3cd' })),
        animate('600ms ease-out')
      ])
    ])
  ]
})
export class LiveTrainsComponent implements OnInit {
  
  @Output() trainSelected = new EventEmitter<TrainTile>();
  demoTrains: TrainTile[] = [];
  trains: TrainTile[] = [];
  raw: TrainTile[] = [];
  selectedId = '';
  positions: TrainPos[] = [];

  private bus = inject(SearchBusService);
  private http = inject(HttpClient);
  private positionService = inject(TrainPositionService);
  private readonly destroyRef = inject(DestroyRef);
  private endpoint = 'https://api.pitmtech.com/api/train-information';

  private iconForLine: Record<string, string> = {
    Mita: 'assets/Icons/Station Icons/I.png',
    Shinjuku: 'assets/Icons/Station Icons/S.png',
    Asakusa: 'assets/Icons/Station Icons/A.png',
    Oedo: 'assets/Icons/Station Icons/E.png'
  };

  ngOnInit(): void {
    this.loadFeed();
    setInterval(() => this.loadFeed(), 15000);
    this.positionService.live$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(pos => {
        this.positions = pos;
        this.loadFeed();
      });
    this.bus.query$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(q => this.applyFilter(q));
  }


private loadFeed() {
  this.http.get<TrainRaw[]>(this.endpoint).subscribe({
    next: data => {
      this.raw = data
        .filter(d => this.parseLine(d))
        .map(d => this.toTile(d));
      this.applyFilter(this.bus.current);
    },
    error: err => console.error('train feed failed', err)
  });
}

  private applyFilter(query: string) {
    if (!query) {
      this.trains = this.raw;
    } else {
      this.trains = this.raw.filter(t =>
        t.number.toLowerCase().includes(query) ||
        t.station.toLowerCase().includes(query) ||
        t.line.toLowerCase().includes(query)
      );
    }
    this.demoTrains = [...this.trains].sort(() => Math.random() - 0.5).slice(0, 5);
    if (!this.trains.find(t => t.id === this.selectedId)) {
      this.selectedId = this.trains[0]?.id ?? '';
    }
  }

onSelect(id: string) {
  this.selectedId = id;
  const selected = this.trains.find(t => t.id === id);
  if (selected && selected.lat != null && selected.long != null) {
    this.trainSelected.emit(selected);
  }
}

  private parseLine(d: TrainRaw): TrainTile['line'] | null {
    const m = /Toei\.(\w+)$/.exec(d['odpt:railway']);
    return m ? (m[1] as TrainTile['line']) : null;
  }

  private normalizeTrainNumber(posNumber: string): string {
    const match = posNumber.match(/(\d{3}[A-Z])/);
    return match ? match[1] : posNumber;
  }

  private toTile(raw: TrainRaw): TrainTile {
    const line = this.parseLine(raw)!;
    const stationRaw = raw['odpt:toStation'] || raw['odpt:fromStation'] || '';
    const station = stationRaw.split('.').pop() ?? '—';
    const normalized = raw['odpt:trainNumber'].slice(-4);
    const pos = this.positions.find(p => this.normalizeTrainNumber(p.trainNumber) === normalized);
    return {
      id: raw['odpt:trainNumber'],
      line,
      number: normalized,
      delay: raw['odpt:delay'] ?? 0,
      station,
      icon: this.iconForLine[line],
      lat: pos?.lat,
      long: pos?.long,
      bearing: pos?.bearing
    };
  }

  trackById = (_: number, t: TrainTile) => t.id;
}
