import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FetchService } from '../fetch/fetch.service';

interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  phoneNumber: string;
  location: string;
  dateOfBirth: string;
  roles: string[];
  designation: string;
  department: string;
  dateOfJoining: string;
  remainingCasualLeaves: number;
  remainingSickLeaves: number;
  remainingWorkFromHome: number;
  totalPermissionHours: number;
  usedPermissionHours: number;
  lossOfPayDays: number;
  myFiles: any;
  managerId: string;
  warningsCount: number;
  leaveApprovalCount: number;
  teamMembers: string[];
}

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  private profileSubject: BehaviorSubject<UserProfile | null>;
  currentUser: Observable<UserProfile | null>;

  constructor(private fetchService: FetchService) {
    const storedUser = localStorage.getItem('user');
    const initialUser: UserProfile | null = storedUser
      ? JSON.parse(storedUser)
      : null;

    this.profileSubject = new BehaviorSubject<UserProfile | null>(initialUser);
    this.currentUser = this.profileSubject.asObservable();
  }

  updateProfile(user: UserProfile) {
    this.profileSubject.next(user);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('userRoles', user.roles.toString());
  }

  getProfile(): UserProfile | null {
    return this.profileSubject.value;
  }

  clearProfile() {
    this.profileSubject.next(null);
    localStorage.removeItem('user');
    localStorage.removeItem('userRoles');
  }
}
