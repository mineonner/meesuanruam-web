import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuidePracticeEditComponent } from './guide-practice-edit.component';

describe('GuidePracticeEditComponent', () => {
  let component: GuidePracticeEditComponent;
  let fixture: ComponentFixture<GuidePracticeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuidePracticeEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuidePracticeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
