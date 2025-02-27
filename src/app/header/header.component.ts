import { Component } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';

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
    console.log('hi');
    this.router.navigate(['home/user-management/my-profile']);
  }

  getProfileImage() {
    return localStorage.getItem("profileImage");
  }

  onLogout() {
    this.authService.logout();
  }

}
