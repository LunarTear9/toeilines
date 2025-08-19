import { Component } from '@angular/core';
import { ClockComponent } from "../clock/clock.component";
import { TrainMapComponent } from '../train-map/train-map.component';
import { PrimaryRowComponent } from '../primaryrow/primaryrow.component';
import { LiveTrainsComponent } from '../live-trains/live-trains.component';
import { TrainTile } from '../../models/train.model';



 
@Component({
  selector: 'app-body',
  imports: [ClockComponent, TrainMapComponent, PrimaryRowComponent, LiveTrainsComponent],
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class AppBodyComponent {
selectedTrain?: TrainTile

}
