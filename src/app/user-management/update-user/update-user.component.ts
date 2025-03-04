import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { FetchService } from '../../services/fetch/fetch.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-user',
  standalone: false,
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css',
})
export class UpdateUserComponent {
  userForm!: FormGroup;
  userData!: any;
  roless: string[] = ['admin', 'hr', 'manager', 'employee'];
  selectedManager!: string;
  dropdownOpen = false;
  searchOpen = false;
  @ViewChild('dropdown') dropDown: ElementRef | undefined;
  @ViewChild('managerInput') managerInput: ElementRef | undefined;
  manager = new Subject<String>();
  users: any;

  constructor(
    private formBuilder: FormBuilder,
    private fetchService: FetchService,
    private router: Router
  ) {
    this.manager
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((name: String) => {
        if (name.length >= 1) {
          this.searchOpen = true;
          this.fetchService.searchUserByName(name).subscribe((data: any) => {
            this.users = data;
          });
        }
      });
  }

  ngOnInit() {
    this.userData = history.state.userData;
    this.userForm = this.formBuilder.group({
      firstName: [this.userData.firstName],
      lastName: [this.userData.lastName],
      email: [this.userData.email],
      location: [this.userData.location],
      phoneNumber: [this.userData.phoneNumber],
      gender: [this.userData.gender],
      dateOfBirth: [this.userData.dateOfBirth],
      roles: [this.userData.roles],
      dateOfJoining: [this.userData.dateOfJoining],
      designation: [this.userData.designation],
      department: [this.userData.department],
      managerId: [this.userData.manager ? this.userData.manager.id : ''],
    });
    this.selectedManager = this.userData.manager
      ? `${this.userData.manager.firstName} ${this.userData.manager.lastName}`
      : '';
  }

  get roles(): FormArray {
    return this.userForm.get('roles') as FormArray;
  }

  onCheckboxChange(event: Event) {
    const target = event.target as HTMLInputElement;
    let currentValues = this.roles.value || [];

    if (target.checked) {
      this.roles.setValue([...currentValues, target.value]);
    } else {
      this.roles.setValue(
        currentValues.filter((v: string) => v !== target.value)
      );
    }
  }

  onReset(event: Event) {
    event.preventDefault();
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to reset the form?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, reset it!',
      cancelButtonText: 'No, cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.selectedManager = '';
        this.userForm.reset();
      }
    });
  }

  onSubmit() {
    if (this.userForm.invalid) {
      Swal.fire({
        title: 'Validation Error!',
        text: 'Please fill in all required fields correctly.',
        icon: 'error',
      });
      return;
    }

    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to update the user?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, update!',
      cancelButtonText: 'No, cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.fetchService
          .updateUser(this.userForm.value, this.userData.id)
          .subscribe({
            next: (data: any) => {
              Swal.fire('Updated Successfully!!', '', 'success').then((ok) => {
                if (ok) this.router.navigate(['home/user']);
              });
            },
            error: (err: string | undefined) => {
              Swal.fire('Error', err, 'error');
            },
          });
      }
    });
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  showDropdown() {
    this.searchOpen = true;
  }

  selectRole(role: string) {
    if (!this.isSelected(role)) {
      let currentValues = this.roles.value || [];
      this.roles.setValue([...currentValues, role]);
    }
  }

  removeRole(role: string) {
    let currentValues = this.roles.value || [];
    this.roles.setValue(currentValues.filter((v: string) => v !== role));
  }

  isSelected(role: string): boolean {
    let currentValues = this.roles.value || [];
    return currentValues.includes(role);
  }

  setManager(user: any) {
    this.userForm.get('managerId')?.setValue(user.id);
    this.selectedManager = `${user.firstName} ${user.lastName}`;
    this.searchOpen = false;
  }

  onInput(element: any) {
    this.manager.next(element.value);
  }

  @HostListener('click', ['$event'])
  onClick(event: Event) {
    if (
      event.target !== this.dropDown?.nativeElement &&
      !this.dropDown?.nativeElement.contains(event.target)
    )
      this.dropdownOpen = false;
    if (event.target !== this.managerInput?.nativeElement) {
      this.searchOpen = false;
    }
  }
}
