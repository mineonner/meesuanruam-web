import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuidePracticeComponent } from './guide-practice.component';

describe('GuidePracticeComponent', () => {
  let component: GuidePracticeComponent;
  let fixture: ComponentFixture<GuidePracticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuidePracticeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuidePracticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
