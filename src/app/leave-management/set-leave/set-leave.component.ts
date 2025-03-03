import { Component } from '@angular/core';

@Component({
  selector: 'app-set-leave',
  standalone: false,
  templateUrl: './set-leave.component.html',
  styleUrl: './set-leave.component.css'
})
export class SetLeaveComponent {
  currentYear: number = new Date().getFullYear();

  leaveDays: Map<string, string> = new Map(); 
  monthNames: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  weeks: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  daysPerMonth: number[] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  isLeapYear(year: number) {
    if( year % 4 === 0 ){
       if( year % 100 === 0 ) {
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
    if(month === 1){
      if(this.isLeapYear(year)) return new Array(29);
    }
    return new Array(this.daysPerMonth[month]);
  }

  saveLeaves() {
    console.log('Selected Leave Days:', Array.from(this.leaveDays));
    // Call API to save data in MongoDB
  }

}
