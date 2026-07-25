import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasuresFourComponent } from './measures-four.component';

describe('MeasuresFourComponent', () => {
  let component: MeasuresFourComponent;
  let fixture: ComponentFixture<MeasuresFourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeasuresFourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeasuresFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
