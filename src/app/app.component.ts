import { Component } from '@angular/core';
import { HeaderComponent } from "./elements/header/header.component";
import { AppBodyComponent } from "./elements/body/body.component";



@Component({
  selector: 'app-root',
  imports: [HeaderComponent, AppBodyComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'odpt-train-demo';
}
