import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasuresTenComponent } from './measures-ten.component';

describe('MeasuresTenComponent', () => {
  let component: MeasuresTenComponent;
  let fixture: ComponentFixture<MeasuresTenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeasuresTenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeasuresTenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
