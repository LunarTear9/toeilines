import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveTrainsComponent } from './live-trains.component';

describe('LiveTrainsComponent', () => {
  let component: LiveTrainsComponent;
  let fixture: ComponentFixture<LiveTrainsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LiveTrainsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiveTrainsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
