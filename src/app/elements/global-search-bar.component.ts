import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchBusService } from '../services/search-bus.service';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  template: `
    <input
      type="search"
      [(ngModel)]="query"
      (ngModelChange)="bus.update(query)"
      placeholder="Search trains, stations…"
      class="search-bar" />
  `,
  styles: [`
    .search-bar {
      width: 400px;
      max-width: 400px;
      padding: .45rem .9rem;
      border: 1px solid #ccc;
      border-radius: 20px;
      font: inherit;
    }
  `],
  imports: [FormsModule]
})
export class GlobalSearchBarComponent {
  query = '';
  readonly bus = inject(SearchBusService);
}
