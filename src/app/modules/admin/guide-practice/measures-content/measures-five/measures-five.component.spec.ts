import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasuresFiveComponent } from './measures-five.component';

describe('MeasuresFiveComponent', () => {
  let component: MeasuresFiveComponent;
  let fixture: ComponentFixture<MeasuresFiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeasuresFiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeasuresFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
