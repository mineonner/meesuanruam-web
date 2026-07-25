import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasuresTwoComponent } from './measures-two.component';

describe('MeasuresTwoComponent', () => {
  let component: MeasuresTwoComponent;
  let fixture: ComponentFixture<MeasuresTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeasuresTwoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeasuresTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
