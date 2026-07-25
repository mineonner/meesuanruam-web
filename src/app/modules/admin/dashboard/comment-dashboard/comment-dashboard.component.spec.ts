import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentDashboardComponent } from './comment-dashboard.component';

describe('CommentDashboardComponent', () => {
  let component: CommentDashboardComponent;
  let fixture: ComponentFixture<CommentDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
