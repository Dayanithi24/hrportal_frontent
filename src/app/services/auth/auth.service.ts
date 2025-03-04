import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserDataService } from '../user-data/user-data.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl!: string;

  getUserRole(): string | null {
    return localStorage.getItem('userRoles');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  constructor(
    private http: HttpClient,
    private router: Router,
    private userDataService: UserDataService
  ) {
    this.baseUrl = 'http://127.0.0.1:8080/';
  }

  getAuthToken(obj: any): Observable<any> {
    return this.http.post(`${this.baseUrl}authenticate/`, obj);
  }

  logout() {
    localStorage.removeItem('token');
    this.userDataService.clearProfile();
    this.router.navigate(['/login']);
  }
}
