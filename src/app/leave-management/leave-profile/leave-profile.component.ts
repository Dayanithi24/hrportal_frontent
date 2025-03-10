import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { LeaveService } from '../../services/leave/leave.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-leave-profile',
  standalone: false,
  templateUrl: './leave-profile.component.html',
  styleUrl: './leave-profile.component.css',
})
export class LeaveProfileComponent {
  currentPage = 'balance';
  currentLeavePolicy: any;
  isAdmin: boolean = false;

  constructor(
    private authService: AuthService, 
    private leaveService: LeaveService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const roles = this.authService.getUserRole()?.split(',');
    if (roles?.some((role) => ['ADMIN', 'HR'].includes(role))) {
      this.isAdmin = true;
    }
    this.leaveService.getCurrentLeavePolicy().subscribe({
      next: (data) => {
        console.log(data);
        this.currentLeavePolicy = data;
      },
      error: (err) => {
        console.log(err);
      }
    })

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

  requestTimeOff() {
    this.router.navigate(['../request'], {relativeTo: this.route, state: {leavePolicy: this.currentLeavePolicy}})
  }
}
