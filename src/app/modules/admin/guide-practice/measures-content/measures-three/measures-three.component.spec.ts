import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasuresThreeComponent } from './measures-three.component';

describe('MeasuresThreeComponent', () => {
  let component: MeasuresThreeComponent;
  let fixture: ComponentFixture<MeasuresThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeasuresThreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeasuresThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
