import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasuresNineComponent } from './measures-nine.component';

describe('MeasuresNineComponent', () => {
  let component: MeasuresNineComponent;
  let fixture: ComponentFixture<MeasuresNineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeasuresNineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeasuresNineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
