import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserDataService } from '../../services/user-data/user-data.service';
import { FetchService } from '../../services/fetch/fetch.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-my-profile',
  standalone: false,
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css'
})
export class MyProfileComponent {
  userData: any;
  subscription!: Subscription;

  constructor(private userDataService: UserDataService, private fetchService: FetchService) {}

  ngOnInit() {
    this.subscription = this.userDataService.currentUser.subscribe((data) => {
      this.userData = data;
      console.log(this.userData);
    })
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      Swal.fire({
        title: 'Sure?',
        text: 'Once changed the previous profile image will be deleted',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, Change',
        cancelButtonText: 'No, cancel',
      }).then((result) => {
        if (result.isConfirmed) {
          this.fetchService.uploadProfileImage(this.userData.id, file).subscribe((id) => {
            this.userData.myFiles.profile = id;
            this.userDataService.updateProfile(this.userData);
            Swal.fire({
              title: "Profile Changed Successfully",
              icon: "success",
            });
          });
        }
      });
    }
  }

  getProfileImage() {
    return localStorage.getItem("profileImage");
  }

  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  ngOnDestroy() {
    if(this.subscription)
      this.subscription.unsubscribe();
  }
}
