import { Component } from '@angular/core';
import {GlobalSearchBarComponent} from "../global-search-bar.component";

@Component({
  selector: 'app-header',
  imports: [GlobalSearchBarComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
