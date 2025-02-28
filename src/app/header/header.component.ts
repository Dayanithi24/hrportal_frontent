import { Component } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private authService: AuthService, private router: Router) {}
  
  loadProfile() {
    this.router.navigate(['home/user-management/my-profile']);
  }

  getProfileImage() {
    return localStorage.getItem("profileImage");
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
          title: "Logged Out Successfully",
          icon: "success",
        });
        this.router.navigate(['login/'])
      }
    });
  }

}
