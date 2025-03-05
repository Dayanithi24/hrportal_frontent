import { Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [RouterLink,],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {
  
  isAdmin: boolean = false;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    const roles = this.authService.getUserRole()?.split(',');
    if (roles?.some((role) => ['ADMIN', 'HR'].includes(role))) {
      this.isAdmin = true;
    }
  }
  isCollapsed: boolean = true;

  @HostListener('mouseenter') onMouseEnter() {
    this.isCollapsed = false; 
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.isCollapsed = true; 
  }
  
  
}
