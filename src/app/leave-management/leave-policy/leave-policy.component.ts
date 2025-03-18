import { Component, Input } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-leave-policy',
  standalone: false,
  templateUrl: './leave-policy.component.html',
  styleUrl: './leave-policy.component.css'
})
export class LeavePolicyComponent {
  isAdmin: boolean = false;
  @Input() leavePolicy: any;

  constructor(private authService: AuthService) {}
  ngOnInit() {
    const roles = this.authService.getUserRole()?.split(',');
    if (roles?.some((role) => ['ADMIN', 'HR'].includes(role))) {
      this.isAdmin = true;
    }
  }

}
