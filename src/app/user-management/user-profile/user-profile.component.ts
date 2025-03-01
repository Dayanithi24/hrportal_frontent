import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  standalone: false,
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
    @Output() closeEvent = new EventEmitter<void>();

    onClose() {
      this.closeEvent.emit();
    }
}
