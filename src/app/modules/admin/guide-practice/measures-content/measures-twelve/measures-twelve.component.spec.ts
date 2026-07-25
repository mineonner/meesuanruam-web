import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasuresTwelveComponent } from './measures-twelve.component';

describe('MeasuresTwelveComponent', () => {
  let component: MeasuresTwelveComponent;
  let fixture: ComponentFixture<MeasuresTwelveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeasuresTwelveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeasuresTwelveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
