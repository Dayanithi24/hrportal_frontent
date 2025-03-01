import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FetchService } from '../services/fetch/fetch.service';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.css',
})
export class AvatarComponent {
  @Input() userData: any;
  avatarBgColor!: string;
  isProfile!: boolean;

  constructor(private fetchService: FetchService) {}

  ngOnInit() {
    this.avatarBgColor = this.getRandomColor();
    if(this.userData?.myFiles?.profile) {
      this.isProfile = true;
    }
  }


  private getRandomColor(): string {
    const colors = [
      '#FF5733',
      '#33A1FF',
      '#FF33A1',
      '#F39C12',
      '#8E44AD',
      '#9e0000',
      '#006802',
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

}
