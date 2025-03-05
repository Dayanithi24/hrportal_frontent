import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllDocsComponent } from './all-docs.component';

describe('AllDocsComponent', () => {
  let component: AllDocsComponent;
  let fixture: ComponentFixture<AllDocsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllDocsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
