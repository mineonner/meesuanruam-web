import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasuresElevenComponent } from './measures-eleven.component';

describe('MeasuresElevenComponent', () => {
  let component: MeasuresElevenComponent;
  let fixture: ComponentFixture<MeasuresElevenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeasuresElevenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeasuresElevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
