import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveProfileComponent } from './leave-profile.component';

describe('LeaveProfileComponent', () => {
  let component: LeaveProfileComponent;
  let fixture: ComponentFixture<LeaveProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaveProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaveProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
