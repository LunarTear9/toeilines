// src/app/models/train.model.ts
export interface Train {
  id:        string;                 // unique vehicle ID
  line:      'Mita' | 'Shinjuku' | 'Asakusa' | 'Oedo';
  station:   string;                 // e.g. "I-13"
  direction: string;                 // optional (northbound / southbound …)
  lat:       number;
  long:      number;
}
export interface TrainTile {
  id: string;
  line: 'Mita' | 'Shinjuku' | 'Asakusa' | 'Oedo';
  number: string;
  delay: number;
  station: string;
  icon: string;
  lat?: number;
  long?: number;
  bearing?: number;
}
