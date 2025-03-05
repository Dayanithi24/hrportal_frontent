import { Component } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserDataService } from '../services/user-data/user-data.service';
import { Observable, Subscription, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FetchService } from '../services/fetch/fetch.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  userData: any;
  subsrciption!: Subscription;
  isProfile!: boolean;
  openedFileUrl: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private userDataService: UserDataService,
    private fetchService: FetchService
  ) {}

  ngOnInit() {
    this.subsrciption = this.userDataService.currentUser.subscribe((data) => {
      this.userData = data;
    });
    this.getProfileImage();
  }

  loadProfile() {
    this.router.navigate([`home/user/profile/${this.userData.id}`], {
      state: { userData: this.userData },
    });
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
    if (this.userData?.myFiles?.profile) {
      this.getFile().subscribe((fileBase64) => {
        this.openedFileUrl = fileBase64;
      });
    }
  }

  onLogout() {
    Swal.fire({
      title: 'Sure?',
      text: 'Do you want to logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Logout',
      cancelButtonText: 'No, cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.logout();
        Swal.fire({
          title: 'Logged Out Successfully',
          icon: 'success',
        });
        this.router.navigate(['login/']);
      }
    });
  }
}
