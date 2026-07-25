import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeeViewComponent } from './mee-view.component';

describe('MeeViewComponent', () => {
  let component: MeeViewComponent;
  let fixture: ComponentFixture<MeeViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeeViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
