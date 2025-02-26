import { Component } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FetchService } from '../services/fetch/fetch.service';
import { UserDataService } from '../services/user-data/user-data.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isEye: boolean = true;
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(
    private authService: AuthService,
    private fetchService: FetchService,
    private userDataService: UserDataService,
    private router: Router
  ) {}

  // ngOnInit() {
  //   this.authService.logout();
  // }

  changePasswordType() {
    this.isEye = !this.isEye;
  }

  onLogin() {
    this.authService.getAuthToken(this.loginForm.value).subscribe((res) => {
      localStorage.setItem('token', res?.jwt);
        this.fetchService.getUser(res?.userId).subscribe((data: any) => {
          this.userDataService.updateProfile(data);
        });
      this.router.navigate(['/home']);
    })
  }
}
