import { Component } from '@angular/core';
import { FetchService } from '../../services/fetch/fetch.service';
import { ActivatedRoute, Router } from '@angular/router';
import { state } from '@angular/animations';

@Component({
  selector: 'app-all-docs',
  standalone: false,
  templateUrl: './all-docs.component.html',
  styleUrl: './all-docs.component.css'
})
export class AllDocsComponent {

  users!: any;

  constructor(
    private fetchService: FetchService, 
    private router: Router,
    private route: ActivatedRoute
  ) {}
  
  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.fetchService.getAllUsers().subscribe((data) => {
      this.users = data;
    })
  }

  getUserName(index: number) {
    return this.users[index].firstName + " " + this.users[index].lastName;
  }

  loadDoc(user: any) {
    this.router.navigate([`../${user.id}`], { state: {userData : user} ,relativeTo: this.route});
  }
}
