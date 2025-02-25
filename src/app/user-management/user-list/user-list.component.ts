import { Component } from '@angular/core';

@Component({
  selector: 'app-user-list',
  standalone: false,
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
    profiles: Array<{ [key: string]: any }> = [
      {
      name: 'Daya',
      department: 'Engineering',
      job_title: 'Trainee',
      reports_to: 'hr_1',
      start_date: '02/09/2024',
    },
      {
      name: 'Daya',
      department: 'Engineering',
      job_title: 'Trainee',
      reports_to: 'hr_1',
      start_date: '02/09/2024',
    },
  ]

  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }
}
