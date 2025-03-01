import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { FetchService } from '../../services/fetch/fetch.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  standalone: false,
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})

export class CreateUserComponent {
  userData!: FormGroup;
  roless: string[] = ['admin', 'hr', 'manager', 'employee'];
  selectedManager!: string;
  dropdownOpen = false; 
  searchOpen = false;
  @ViewChild('dropdown') dropDown: ElementRef | undefined;
  @ViewChild('managerInput') managerInput: ElementRef | undefined;
  manager = new Subject<String>;
  users: any;

  constructor(
    private formBuilder: FormBuilder,
    private fetchService: FetchService,
    private router: Router
  ) {
    this.manager
    .pipe(
      debounceTime(500),
      distinctUntilChanged()
    )
    .subscribe((name: String) => {
      if(name.length >= 1){
        this.searchOpen = true;
        this.fetchService.searchUserByName(name).subscribe((data: any) => {
          this.users = data;
        })
      }
    });
  }

  ngOnInit() {
    this.userData = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      location: [''],
      phoneNumber: [''],
      gender: [''],
      dateOfBirth: [''],
      roles: [[]],
      dateOfJoining: [''],
      designation: [''],
      department: [''],
      managerId: ['']

    })
  }

  get roles() : FormArray {
    return this.userData.get('roles') as FormArray;
  }

  onCheckboxChange(event: Event) {
    const target = event.target as HTMLInputElement;
    let currentValues = this.roles.value || [];

    if (target.checked) {
      this.roles.setValue([...currentValues, target.value]);
    } else {
      this.roles.setValue(currentValues.filter((v: string) => v !== target.value));
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
        this.userData.reset(); 
      }
    });
  }
  
  onSubmit() {
    if (this.userData.invalid) {
      Swal.fire({
        title: 'Validation Error!',
        text: 'Please fill in all required fields correctly.',
        icon: 'error',
      });
      return;
    }

    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to submit the form?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, submit!',
      cancelButtonText: 'No, cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.fetchService.createUser(this.userData.value).subscribe({
          next: (data) => {
            Swal.fire('Submitted Successfully!!', '','success').then(
              (ok) => {
                if(ok) this.router.navigate(['home']);
              }
            );
          },
          error: (err) => {
            Swal.fire("Error", err, 'error');
          }
        })
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
    this.userData.get('managerId')?.setValue(user.id);
    this.selectedManager = `${user.firstName} ${user.lastName}`;
    this.searchOpen = false;
  }

  onInput(element: any) {
    this.manager.next(element.value);
  }

  @HostListener('click', ['$event'])
  onClick(event: Event) {
      if(event.target !== this.dropDown?.nativeElement && !this.dropDown?.nativeElement.contains(event.target))
        this.dropdownOpen = false;
      if(event.target !== this.managerInput?.nativeElement){
        this.searchOpen= false;
      }
    }

}
