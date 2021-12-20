import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsHeadlinesComponent } from './news-headlines.component';

describe('NewsHeadlinesComponent', () => {
  let component: NewsHeadlinesComponent;
  let fixture: ComponentFixture<NewsHeadlinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsHeadlinesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsHeadlinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
