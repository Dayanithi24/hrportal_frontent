import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserDataService } from '../../services/user-data/user-data.service';

@Component({
  selector: 'app-my-profile',
  standalone: false,
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css'
})
export class MyProfileComponent {
  userData: any;
  subscription!: Subscription;

  constructor(private userDataService: UserDataService) {}

  ngOnInit() {
    this.subscription = this.userDataService.currentUser.subscribe((data) => {
      this.userData = data;
      console.log(this.userData);
    })
  }

  ngOnDestroy() {
    if(this.subscription)
      this.subscription.unsubscribe();
  }
}
