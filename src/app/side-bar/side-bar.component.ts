import { Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [RouterLink,],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {

  isCollapsed: boolean = true;

  @HostListener('mouseenter') onMouseEnter() {
    this.isCollapsed = false; 
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.isCollapsed = true; 
  }
  
}
