import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimaryRowComponent } from './primaryrow.component';

describe('PrimaryRowComponent', () => {
  let component: PrimaryRowComponent;
  let fixture: ComponentFixture<PrimaryRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrimaryRowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrimaryRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
