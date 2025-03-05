import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-leave-profile',
  standalone: false,
  templateUrl: './leave-profile.component.html',
  styleUrl: './leave-profile.component.css',
})
export class LeaveProfileComponent {
  currentPage = 'balance';
  isTimeOff = false;
  isAdmin: boolean = false;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    const roles = this.authService.getUserRole()?.split(',');
    if (roles?.some((role) => ['ADMIN', 'HR'].includes(role))) {
      this.isAdmin = true;
    }
  }

  openBalancePage() {
    this.currentPage = 'balance';
  }

  openRequestPage() {
    this.currentPage = 'request';
  }

  openLeavePolicy() {
    this.currentPage = 'leave-policy';
  }

  openTimeOff() {
    this.isTimeOff = true;
  }

  onClose() {
    this.isTimeOff = false;
  }
}
