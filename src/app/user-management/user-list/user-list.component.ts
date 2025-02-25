import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  standalone: false,
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent {
  pageSizes: Array<number> = [5, 10, 20];
  selectedSize = new FormControl(5);
  dropdownOpen = false;
  @ViewChild('dropdown') dropDown: ElementRef | undefined;

  profiles: Array<{ [key: string]: any }> = [
    {
      name: 'Daya',
      department: 'Engineering',
      reports_to: 'hr_1',
      start_date: '02/09/2024',
      designation: 'Trainee',
      location: 'Cbe',
      src: 'google.png',
    },
    {
      name: 'Raya',
      department: 'Engineering',
      reports_to: 'hr_1',
      start_date: '02/09/2024',
      designation: 'Trainee',
      location: 'Cbe',
    },
    {
      name: 'Raya',
      department: 'Engineering',
      reports_to: 'hr_1',
      start_date: '02/09/2024',
      designation: 'Trainee',
      location: 'Cbe',
    },
    {
      name: 'Raya',
      department: 'Engineering',
      reports_to: 'hr_1',
      start_date: '02/09/2024',
      designation: 'Trainee',
      location: 'Cbe',
    },
    {
      name: 'Raya',
      department: 'Engineering',
      reports_to: 'hr_1',
      start_date: '02/09/2024',
      designation: 'Trainee',
      location: 'Cbe',
    },
  ];

  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  selectSize(size: number) {
    this.selectedSize.setValue(size);
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  @HostListener('click', ['$event'])
  onClick(event: Event) {
    if (
      event.target !== this.dropDown?.nativeElement &&
      !this.dropDown?.nativeElement.contains(event.target)
    )
      this.dropdownOpen = false;
  }

  incrementPage() {

  }
  
  decrementPage() {

  }
}
