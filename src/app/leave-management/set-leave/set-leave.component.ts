import { Component } from '@angular/core';

@Component({
  selector: 'app-set-leave',
  standalone: false,
  templateUrl: './set-leave.component.html',
  styleUrl: './set-leave.component.css',
})
export class SetLeaveComponent {
  currentYear: number = new Date().getFullYear();

  leaveDays: Map<string, string> = new Map();
  monthNames: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  weeks: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  daysPerMonth: number[] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  showPopup: boolean = false;
  selectedDate: string = '';
  leaveName: string = '';

  openPopup(month: number, day: number) {
    this.selectedDate = this.generateDateKey(month, day);
    this.leaveName = this.leaveDays.get(this.selectedDate) || '';
    this.showPopup = true;
  }

  closePopup() {
    this.selectedDate = '';
    this.showPopup = false;
    this.leaveName = '';
  }

  saveLeave() {
    if (this.leaveName.trim()) {
      for (let date of this.selectedDate.split(','))
        this.leaveDays.set(date, this.leaveName);
    }
    this.closePopup();
  }

  clearLeave() {
    for (let date of this.selectedDate.split(',')) this.leaveDays.delete(date);
    this.closePopup();
  }

  markAllDays(i: number, m: number) {
    const d = new Date();
    d.setMonth(m);
    d.setDate(1);
    const day = d.getDay();
    if (i >= day) d.setDate(i - day + 1);
    else d.setDate(8 - day + i);
    do {
      this.selectedDate += d.toISOString().split('T')[0] + ',';
      d.setDate(d.getDate() + 7);
    } while (d.getMonth() == m);
    this.selectedDate = this.selectedDate.slice(0, -1);
    this.showPopup = true;
  }

  isLeapYear(year: number) {
    if (year % 4 === 0) {
      if (year % 100 === 0) {
        return year % 400 === 0;
      }
      return true;
    }
    return false;
  }

  getStartDay(month: number) {
    const day = new Date(`${this.currentYear}-${month}-01`).getDay();
    return new Array(day);
  }

  getDaysInMonth(month: number, year: number): number[] {
    if (month === 1) {
      if (this.isLeapYear(year)) return new Array(29);
    }
    return new Array(this.daysPerMonth[month]);
  }

  getLeaveName(month: number, day: number): string | null {
    return this.leaveDays.get(this.generateDateKey(month, day)) || null;
  }

  generateDateKey(month: number, day: number): string {
    return `${this.currentYear}-${String(month + 1).padStart(2, '0')}-${String(
      day
    ).padStart(2, '0')}`;
  }

  saveLeaves() {
    const obj = {
      year: this.currentYear,
      leaveDays: Array.from(this.leaveDays.entries())
        .map(([date, name]) => ({ date, name }))
        .sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        ),
    };
  }
}
