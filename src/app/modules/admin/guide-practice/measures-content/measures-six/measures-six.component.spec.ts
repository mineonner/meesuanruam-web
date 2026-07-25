import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasuresSixComponent } from './measures-six.component';

describe('MeasuresSixComponent', () => {
  let component: MeasuresSixComponent;
  let fixture: ComponentFixture<MeasuresSixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeasuresSixComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeasuresSixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
