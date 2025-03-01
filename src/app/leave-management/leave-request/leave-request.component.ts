import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-leave-request',
  standalone: false,
  templateUrl: './leave-request.component.html',
  styleUrl: './leave-request.component.css'
})
export class LeaveRequestComponent {
  leaveForm!: FormGroup;
  @Output() closeEvent = new EventEmitter();

  onClose() {
    this.closeEvent.emit();
  }
}
