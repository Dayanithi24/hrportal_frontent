import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-leave-policy',
  standalone: false,
  templateUrl: './create-leave-policy.component.html',
  styleUrl: './create-leave-policy.component.css',
})
export class CreateLeavePolicyComponent {
  leavePolicy!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.leavePolicy = this.formBuilder.group({
      casualLeavePerMonth: [''],
      casualLeavePerYear: [''],
      minimumDaysToGetCasualLeave: [''],
      lossOfPayPerMonth: [''],
      lossOfPayPerYear: [''],
      sickLeavePerMonth: [''],
      sickLeavePerYear: [''],
      workFromHomePerMonth: [''],
      workFromHomePerWeek: [''],
      warningsBeforeEscalation: [''],
      createdBy: [''],
      startDate: [''],
      endDate: [''],
    });
  }
}
