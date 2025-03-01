import { Component } from '@angular/core';

@Component({
  selector: 'app-leave-profile',
  standalone: false,
  templateUrl: './leave-profile.component.html',
  styleUrl: './leave-profile.component.css'
})
export class LeaveProfileComponent {
  isBalancePage = true;
  isTimeOff = false;
  
  openBalancePage() {
    this.isBalancePage = true;
  }

  openRequestPage() {
    this.isBalancePage = false;
  }
  
  openTimeOff() {
    this.isTimeOff = true;
  }
  
  onClose() {
    this.isTimeOff = false;
  }
}
