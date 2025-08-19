import { Component, ViewChild, OnInit, inject, Input, OnChanges, NgZone } from '@angular/core';
import {
  GoogleMapsModule,
  MapInfoWindow,
  MapMarker
} from '@angular/google-maps';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule, NgFor } from '@angular/common';
import { DARK_STYLE } from "./live-map-dark-style";
import { GoogleMapsLoaderService } from '../../services/google-maps-loader.service';
import { TrainTile } from '../../models/train.model';

interface Station {
  en: string;
  jp: string;
  lat: number;
  long: number;
}

type StationGroup = Record<string, Station>;
type LinePayload = Record<'Mita' | 'Shinjuku' | 'Asakusa' | 'Oedo', StationGroup>;

@Component({
  selector: 'app-train-map',
  standalone: true,
  imports: [GoogleMapsModule, HttpClientModule, CommonModule, NgFor,],
  templateUrl: './train-map.component.html',
  styleUrls: ['./train-map.component.css']
})
export class TrainMapComponent implements OnInit, OnChanges {

  zoom = 12;
  center: google.maps.LatLngLiteral = { lat: 35.6812, lng: 139.7671 };
  options: google.maps.MapOptions = {};
  mapReady = false;
  markers: google.maps.MarkerOptions[] = [];
  @ViewChild(MapInfoWindow) infoWin!: MapInfoWindow;
  selectedInfo = '';

  @Input() trains: any[] = [];
  @Input() selectedTrain?: TrainTile;




  private zone = inject(NgZone);
  private http = inject(HttpClient);
  private mapsLoader = inject(GoogleMapsLoaderService);

  private iconForLine: Record<string, string> = {
    'Mita': 'assets/Icons/Station Icons/I.png',
    'Shinjuku': 'assets/Icons/Station Icons/S.png',
    'Asakusa': 'assets/Icons/Station Icons/A.png',
    'Oedo': 'assets/Icons/Station Icons/E.png',
  };

  async ngOnInit(): Promise<void> {
    await this.mapsLoader.load('API_KEY');
    this.options = {
      mapTypeId: 'roadmap',
      styles: DARK_STYLE,
      disableDefaultUI: true,
      zoomControl: true,
      clickableIcons: false
    };
    this.mapReady = true;
    this.http.get<LinePayload>('assets/stations.json').subscribe({
      next: data => this.buildMarkers(data),
      error: err => console.error('Station JSON load failed:', err)
    });
  }

ngOnChanges(): void {
  if (this.mapReady) {
    this.plotTrainMarkers();


if (this.selectedTrain?.lat != null && this.selectedTrain?.long != null) {
  this.center = {
    lat: this.selectedTrain.lat,
    lng: this.selectedTrain.long
  };
}
  }
}


  private buildMarkers(payload: LinePayload): void {
    for (const [line, stations] of Object.entries(payload)) {
      const icon = this.iconForLine[line];
      Object.values(stations).forEach(st => {
        this.markers.push({
          position: { lat: st.lat, lng: st.long },
          title: `${st.jp} / ${st.en}`,
          icon,
          optimized: false
        });
      });
    }
  }

  private plotTrainMarkers(): void {
    const trainIcon = {
      
      url: 'assets/Icons/train_pin.svg',
      scaledSize: new google.maps.Size(32, 32),
      anchor: new google.maps.Point(16, 16),
    };
    this.markers = this.markers.filter(m => {
      if (typeof m.icon === 'object' && m.icon !== null && 'url' in m.icon) {
        return !(m.icon as { url: string }).url.includes('train_pin.svg');
      }
      return true;
    });
    this.trains
      .filter(t => t.lat != null && t.long != null)
      .forEach(t => {
        this.markers.push({
          position: { lat: t.lat, lng: t.long },
          icon: trainIcon,
          title: `${t.number} · ${t.station} (${t.line})`,
          optimized: false
        });
      });
  }

  openInfo(anchor: MapMarker, title: string): void {
    this.zone.run(() => {
      this.selectedInfo = title;
      this.infoWin.open(anchor);
    });
  }
}
