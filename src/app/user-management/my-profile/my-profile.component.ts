import { Component } from '@angular/core';
import { Observable, Subscription, switchMap } from 'rxjs';
import { UserDataService } from '../../services/user-data/user-data.service';
import { FetchService } from '../../services/fetch/fetch.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-my-profile',
  standalone: false,
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css',
})
export class MyProfileComponent {
  userData: any;
  age!: string;
  duration!: string;
  openedFileUrl: string | null = null;

  constructor(
    private userDataService: UserDataService,
    private fetchService: FetchService
  ) {}

  ngOnInit() {
    this.userData = history.state.userData;
    this.age = this.getTimeDuration(Date.parse(this.userData.dateOfBirth));
    this.duration = this.getTimeDuration(
      Date.parse(this.userData.dateOfJoining)
    );
    this.getProfileImage();
  }
  getTimeDuration(date: any) {
    const time = (Date.now() - date) / (1000 * 3600 * 24) / 365.25;
    const timeSplit = time.toFixed(5).split('.');
    const decimalPart = timeSplit[1];

    return `${timeSplit[0]} Years ${Math.round(
      parseFloat(`0.${decimalPart}`) * 12
    )} Months`;
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
          this.fetchService
            .uploadProfileImage(this.userData.id, file)
            .subscribe((id) => {
              this.userData.myFiles.profile = id;
              this.userDataService.updateProfile(this.userData);
              Swal.fire({
                title: 'Profile Changed Successfully',
                icon: 'success',
              });
            });
        }
      });
    }
  }

  getFile(): Observable<string> {
    return this.fetchService.getFile(this.userData.myFiles.profile).pipe(
      switchMap((file: Blob) => {
        return new Observable<string>((observer) => {
          const reader = new FileReader();
          reader.onload = () => {
            const result = reader.result as string;
            observer.next(result);
            observer.complete();
          };
          reader.readAsDataURL(file);
        });
      })
    );
  }

  getProfileImage() {
    this.getFile().subscribe((fileBase64) => {
      this.openedFileUrl = fileBase64;
    });
  }

  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }
}
