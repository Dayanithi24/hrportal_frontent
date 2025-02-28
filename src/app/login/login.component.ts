import { Component } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FetchService } from '../services/fetch/fetch.service';
import { UserDataService } from '../services/user-data/user-data.service';
import Swal from 'sweetalert2';

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
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
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

  forgetPassword() {
    if(this.loginForm.get('email')?.value == '') Swal.fire("Error", "Enter your email before giving 'Forget Password'", "error");
    else {
      this.fetchService.forgetPassword(this.loginForm.get('email')?.value).subscribe({
        next: (data) => {
          Swal.fire(data, "", "success");
        },
        error: (error) => {
          Swal.fire("Error", error, 'error');
        }
      })
    }
  }

  onLogin() {
    this.authService.getAuthToken(this.loginForm.value).subscribe({
      next: (res) => {
      localStorage.setItem('token', res?.jwt);
        this.fetchService.getUser(res?.userId).subscribe( {
          next: (data: any) => {
            this.userDataService.updateProfile(data);
            Swal.fire(`Welcome ${data.firstName} ${data.lastName}`, "Login successful!!", 'success');
            this.router.navigate(['/home']);
          },
          error: (err) => {
            Swal.fire("Error", err, 'error');
          }
        });
      },
      error: (err) => {
        Swal.fire("Error", err.error.msg, 'error');
      }
    })
  }
}
