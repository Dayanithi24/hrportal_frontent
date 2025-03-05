import { Component } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserDataService } from '../services/user-data/user-data.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  userData: any;
  subsrciption!: Subscription;
  isProfile!: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private userDataService: UserDataService
  ) {}

  ngOnInit() {
    this.subsrciption = this.userDataService.currentUser.subscribe((data) => {
      this.userData = data;
    });
  }

  loadProfile() {
    this.router.navigate([`home/user/profile/${this.userData.id}`], { state: {userData: this.userData} });
  }

  getProfileImage() {
    if (this.userData?.myFiles?.profile) {
      this.isProfile = true;
    } else this.isProfile = false;
    return localStorage.getItem('profileImage');
  }

  onLogout() {
    Swal.fire({
      title: 'Sure?',
      text: 'Do you want to logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Logout',
      cancelButtonText: 'No, cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.logout();
        Swal.fire({
          title: 'Logged Out Successfully',
          icon: 'success',
        });
        this.router.navigate(['login/']);
      }
    });
  }
}
