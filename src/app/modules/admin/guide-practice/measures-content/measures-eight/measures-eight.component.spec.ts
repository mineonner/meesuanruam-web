import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasuresEightComponent } from './measures-eight.component';

describe('MeasuresEightComponent', () => {
  let component: MeasuresEightComponent;
  let fixture: ComponentFixture<MeasuresEightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeasuresEightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeasuresEightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
