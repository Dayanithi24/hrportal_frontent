import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FetchService } from '../../services/fetch/fetch.service';
import { ActivatedRoute, Router } from '@angular/router';
import { routes } from '../../app.routes';
import { AuthService } from '../../services/auth/auth.service';
import Swal from 'sweetalert2';

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
  isLoaded: boolean = false;
  isAdmin: boolean = false;
  isProfile = false;
  dropdownOpen = false;
  selectedUser: any;
  @ViewChild('dropdown') dropDown!: ElementRef;

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

  constructor(
    private fetchService: FetchService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.fetchData();
    const roles = this.authService.getUserRole()?.split(',');
    if (roles?.some((role) => ['ADMIN', 'HR'].includes(role))) {
      this.isAdmin = true;
    }
  }

  fetchData() {
    this.fetchService
      .getUsers(this.page, this.selectedSize.value)
      .subscribe((data: any) => {
        this.responseData = data;
        this.isLoaded = true;
      });
  }

  selectSize(size: number) {
    if (size !== this.selectedSize.value) {
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

  loadProfile(user: any) {
    this.selectedUser = user;
    setTimeout(() => (this.isProfile = true), 100);
  }

  updateUser(user: any) {
    this.router.navigate(['../update-user', user.id], {
      state: { userData: user },
      relativeTo: this.route,
    });
  }

  onClose() {
    this.isProfile = false;
  }

  deleteUser(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete the user?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete!',
      cancelButtonText: 'No, cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.fetchService.deleteUser(id).subscribe({
          next: (data: any) => {
            Swal.fire('Deleted Successfully!!', '', 'success').then((ok) => {
              if (ok) this.fetchData();
            });
          },
          error: (err: string | undefined) => {
            Swal.fire('Error', err, 'error');
          },
        });
      }
    });
  }
}
