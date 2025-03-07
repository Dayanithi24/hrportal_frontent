import { Component, HostListener } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserDataService } from '../../services/user-data/user-data.service';
import Swal from 'sweetalert2';
import { LeaveService } from '../../services/leave/leave.service';

@Component({
  selector: 'app-create-leave-policy',
  standalone: false,
  templateUrl: './create-leave-policy.component.html',
  styleUrls: ['./create-leave-policy.component.css'],
})
export class CreateLeavePolicyComponent {
  leavePolicyForm: FormGroup;
  userId: string | undefined;

  constructor(
    private fb: FormBuilder,
    private userDataService: UserDataService,
    private leaveService: LeaveService
  ) {
    this.leavePolicyForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      leaves: this.fb.array([]),
    });
    this.userId = userDataService.getUserId();
  }

  ngOnInit() {
    this.addLeavePolicy();
    this.addDetail(0);
    this.leavePolicyForm
      .get('startDate')
      ?.valueChanges.subscribe(() => this.checkDateCondition());
    this.leavePolicyForm
      .get('endDate')
      ?.valueChanges.subscribe(() => this.checkDateCondition());
  }

  get leaves(): FormArray {
    return this.leavePolicyForm.get('leaves') as FormArray;
  }

  getDetails(index: number): FormArray {
    return this.leaves.at(index).get('details') as FormArray;
  }

  checkDateCondition() {
    if (
      !this.leavePolicyForm.get('startDate')?.value &&
      this.leavePolicyForm.get('endDate')?.value
    ) {
      setTimeout(() => this.leavePolicyForm.get('endDate')?.setValue(''), 0);
      Swal.fire('Warning', 'Fill the Starting Date First', 'warning');
      return;
    }
  }

  addLeavePolicy() {
    const leavePolicy = this.fb.group({
      name: ['', Validators.required],
      details: this.fb.array([]),
    });
    this.leaves.push(leavePolicy);
  }

  addDetail(index: number) {
    const details = this.getDetails(index);
    details.push(
      this.fb.group({
        duration: ['', Validators.required],
        noOfDays: [0, [Validators.required, Validators.min(0)]],
      })
    );
  }

  removeDetail(policyIndex: number, detailIndex: number) {
    const details = this.getDetails(policyIndex);
    details.removeAt(detailIndex);
  }

  removeLeavePolicy(index: number) {
    this.leaves.removeAt(index);
  }

  savePolicy() {
    if (this.leavePolicyForm.valid) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to submit the form?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, submit!',
        cancelButtonText: 'No, cancel',
      }).then((result) => {
        if (result.isConfirmed) {
          this.leavePolicyForm.patchValue({
          startDate: new Date(this.leavePolicyForm.get('startDate')?.value).toISOString(),
          endDate: new Date(this.leavePolicyForm.get('endDate')?.value).toISOString(),
        });        
          this.leaveService.createLeavePolicy(this.leavePolicyForm.value, this.userId).subscribe({
            next: (data) => {
              console.log(data);
            },
            error: (err) => {
              console.log(err);
            },
          });
        }
      });
    } else {
      Swal.fire(
        'Error',
        'Form is invalid. Fill all fields and correct errors.',
        'error'
      );
      this.leavePolicyForm.markAllAsTouched();
    }
  }

  @HostListener('keydown', ['$event'])
  onEnter(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  }
}
