import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-leave-request',
  standalone: false,
  templateUrl: './leave-request.component.html',
  styleUrl: './leave-request.component.css',
})
export class LeaveRequestComponent {
  leaveForm!: FormGroup;
  isSameDate = false;
  today!: string;
  @Output() closeEvent = new EventEmitter();

  constructor(private formBuider: FormBuilder) {
    this.leaveForm = this.formBuider.group({
      leaveType: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      duration: [''],
      session: [''],
      startDuration: [''],
      endDuration: [''],
      supportText: [''],
    });
  }

  ngOnInit() {
    this.today = new Date().toISOString().split('T')[0];
    this.leaveForm
      .get('startDate')
      ?.valueChanges.subscribe(() => this.checkDateCondition());
    this.leaveForm
      .get('endDate')
      ?.valueChanges.subscribe(() => this.checkDateCondition());
  }

  checkDateCondition() {
    const startDate = this.leaveForm.get('startDate')?.value;
    const endDate = this.leaveForm.get('endDate')?.value;

    if (!startDate && endDate) {
      setTimeout(() => this.leaveForm.get('endDate')?.setValue(''), 0);
      Swal.fire('Warning', 'Fill the Starting Date First', 'warning');
      return;
    }

    this.isSameDate = startDate === endDate;

    if (this.isSameDate) {
      this.leaveForm.get('duration')?.setValidators([Validators.required]);

      this.leaveForm.get('session')?.clearValidators();
      this.leaveForm.get('startDuration')?.reset();
      this.leaveForm.get('endDuration')?.reset();
      this.leaveForm.get('startDuration')?.clearValidators();
      this.leaveForm.get('endDuration')?.clearValidators();
    } else {
      this.leaveForm.get('startDuration')?.setValidators([Validators.required]);
      this.leaveForm.get('endDuration')?.setValidators([Validators.required]);

      this.leaveForm.get('duration')?.reset();
      this.leaveForm.get('session')?.reset();
      this.leaveForm.get('duration')?.clearValidators();
      this.leaveForm.get('session')?.clearValidators();
    }

    this.leaveForm.get('duration')?.updateValueAndValidity();
    this.leaveForm.get('session')?.updateValueAndValidity();
    this.leaveForm.get('startDuration')?.updateValueAndValidity();
    this.leaveForm.get('endDuration')?.updateValueAndValidity();
  }

  isHalfDay() {
    if (this.leaveForm.get('duration')?.value === 'Half Day') {
      this.leaveForm.get('session')?.setValidators([Validators.required]);
    } else {
      this.leaveForm.get('session')?.reset();
      this.leaveForm.get('session')?.clearValidators();
    }

    this.leaveForm.get('session')?.updateValueAndValidity();
  }

  onClose() {
    this.closeEvent.emit();
  }

  onSubmit() {
    if (this.leaveForm.invalid) {
      Swal.fire('Error', 'Please fill all required fields', 'error');
      return;
    }
  }
}
