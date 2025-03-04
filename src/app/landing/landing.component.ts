import { Component, HostListener } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { RouterOutlet } from '@angular/router';
import { FetchService } from '../services/fetch/fetch.service';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [HeaderComponent, SideBarComponent, RouterOutlet],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
})
export class LandingComponent {
  isScrolling: boolean = false;

  @HostListener('scroll')
  onScroll() {
    this.isScrolling = true;

    setTimeout(() => {
      this.isScrolling = false;
    }, 100);
  }
}
