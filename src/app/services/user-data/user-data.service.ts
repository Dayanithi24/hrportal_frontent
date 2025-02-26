import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  phoneNumber: string;
  location: string;
  dateOfBirth: string; // Use string for LocalDate
  roles: string[];
  designation: string;
  department: string;
  dateOfJoining: string; // Use string for LocalDate
  remainingCasualLeaves: number;
  remainingSickLeaves: number;
  remainingWorkFromHome: number;
  totalPermissionHours: number;
  usedPermissionHours: number;
  lossOfPayDays: number;
  managerId: string;
  warningsCount: number;
  leaveApprovalCount: number;
  teamMembers: string[];
}

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  
  private profileSubject: BehaviorSubject<UserProfile | null>;
  currentUser: Observable<UserProfile | null>;

  constructor() {
    const storedUser = localStorage.getItem('user');
    const initialUser: UserProfile | null = storedUser ? JSON.parse(storedUser) : null;

    this.profileSubject = new BehaviorSubject<UserProfile | null>(initialUser);
    this.currentUser = this.profileSubject.asObservable();
  }

  updateProfile(user: UserProfile) {
    this.profileSubject.next(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  getProfile(): UserProfile | null {
    return this.profileSubject.value;
  }

  clearProfile() {
    this.profileSubject.next(null);
    localStorage.removeItem('user');
  }
}
