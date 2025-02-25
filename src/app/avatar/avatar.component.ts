import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.css'
})
export class AvatarComponent {
    @Input() userData: any;

    avatarBgColor!: string;

  ngOnInit() {
    this.avatarBgColor = this.getRandomColor();
  }

  // Function to generate a random color
  private getRandomColor(): string {
    const colors = ['#FF5733', '#33A1FF', '#FF33A1', '#F39C12', '#8E44AD', '#9e0000', '#006802'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

}
