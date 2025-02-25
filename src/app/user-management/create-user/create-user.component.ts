import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-user',
  standalone: false,
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})

export class CreateUserComponent {
  userData!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

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

}
