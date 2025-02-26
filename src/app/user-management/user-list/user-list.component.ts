import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FetchService } from '../../services/fetch/fetch.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  standalone: false,
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent {
  pageSizes: Array<number> = [5, 10, 20];
  page: number = 0;
  selectedSize = new FormControl(5);
  responseData: any;
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

  constructor(private fetchService: FetchService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.fetchService.getUsers(this.page, this.selectedSize.value)
      .subscribe((data: any) => {
        this.responseData = data;
        console.log(this.responseData);
      });
  }

  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  selectSize(size: number) {
    if(size !== this.selectedSize.value) {
      this.selectedSize.setValue(size);
      this.fetchData();
    }
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
    if (!this.responseData.last) {
      this.page++;
      this.fetchData();
    }
  }

  decrementPage() {
    if (!this.responseData.first) {
      this.page--;
      this.fetchData();
    }
  }

  loadProfile(id: string) {
    this.router.navigate([`../profile/${id}`], {relativeTo: this.route});
  }

}
