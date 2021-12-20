import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FantasyPlotComponent } from './fantasy-plot.component';

describe('FantasyPlotComponent', () => {
  let component: FantasyPlotComponent;
  let fixture: ComponentFixture<FantasyPlotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FantasyPlotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FantasyPlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
