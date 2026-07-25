import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasuresOneComponent } from './measures-one.component';

describe('MeasuresOneComponent', () => {
  let component: MeasuresOneComponent;
  let fixture: ComponentFixture<MeasuresOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeasuresOneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeasuresOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
