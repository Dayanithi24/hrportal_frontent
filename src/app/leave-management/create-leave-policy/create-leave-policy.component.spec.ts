import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLeavePolicyComponent } from './create-leave-policy.component';

describe('CreateLeavePolicyComponent', () => {
  let component: CreateLeavePolicyComponent;
  let fixture: ComponentFixture<CreateLeavePolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateLeavePolicyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateLeavePolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
