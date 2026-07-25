import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasuresSevenComponent } from './measures-seven.component';

describe('MeasuresSevenComponent', () => {
  let component: MeasuresSevenComponent;
  let fixture: ComponentFixture<MeasuresSevenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeasuresSevenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeasuresSevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
