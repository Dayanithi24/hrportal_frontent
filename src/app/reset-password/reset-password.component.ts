import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FetchService } from '../services/fetch/fetch.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent {
  isEye: boolean = true;
  token: string = '';
  isValidToken: boolean = false;
  errorMessage: string = '';

  passwordForm: FormGroup = new FormGroup({
    newPassword: new FormControl(''),
    confirmPassword: new FormControl(''),
  });

  constructor(
    private route: ActivatedRoute,
    private fetchService: FetchService,
    private router: Router
  ) {}

  ngOnInit() {
    this.token = this.route.snapshot.queryParams['token'];
    if (this.token) {
      this.validateToken();
    } else {
      this.errorMessage = 'Invalid reset link.';
    }
  }

  changePasswordType() {
    this.isEye = !this.isEye;
  }

  validateToken() {
    this.fetchService.validateResetToken(this.token).subscribe({
      next: (res: any) => {
        this.isValidToken = res.valid;
      },
      error: (err) => {
        this.isValidToken = false;
        this.errorMessage = err.error.message || 'Invalid or expired token.';
      },
    });
  }

  changePassword() {
    if (
      this.passwordForm.get('newPassword')?.value ===
      this.passwordForm.get('confirmPassword')?.value
    ) {
      this.fetchService
        .resetToken(this.token, this.passwordForm.get('newPassword')?.value)
        .subscribe((data) => {
          if (data)
            Swal.fire('Success', data, 'success').then((ok) => {
              if (ok) {
                this.router.navigate(['/login']);
              }
            });
        });
    } else {
      Swal.fire('Error', 'Password Mismatch', 'error');
    }
  }
}
