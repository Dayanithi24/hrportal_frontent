import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  standalone: false,
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent {
  avatarBgColor!: string;
  @Input() userData: any;
  @Output() closeEvent = new EventEmitter<void>();

  ngOnInit() {
    this.avatarBgColor = this.getRandomColor();
  }

  getTimeDuration(date: any) {
    date = Date.parse(date);
    const time = (Date.now() - date) / (1000 * 3600 * 24) / 365.25;
    const timeSplit = time.toFixed(5).split('.');
    const decimalPart = timeSplit[1];

    return `${timeSplit[0]} Years ${Math.round(
      parseFloat(`0.${decimalPart}`) * 12
    )} Months`;
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

  onClose() {
    this.closeEvent.emit();
  }
}
