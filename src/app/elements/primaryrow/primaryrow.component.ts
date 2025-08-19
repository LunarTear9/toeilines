import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-primary-row',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="row">
      <ng-content></ng-content>           <!-- slot for any child elements -->
    </div>
  `,
  styleUrls: ['./primary-row.component.css']
})
export class PrimaryRowComponent {}
