import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { LeaveService } from '../../services/leave/leave.service';
import { UserDataService } from '../../services/user-data/user-data.service';
import Swal from 'sweetalert2';
import { FetchService } from '../../services/fetch/fetch.service';
import { Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-my-requests',
  standalone: false,
  templateUrl: './my-requests.component.html',
  styleUrl: './my-requests.component.css',
})
export class MyRequestsComponent {
  openedFileUrl: any;
  dropdownOpen: boolean = false;
  myRequests!: any;
  myTeamRequests!: any;
  @ViewChild('dropDown') dropDown!: ElementRef;

  constructor(
    private leaveService: LeaveService,
    private userDataService: UserDataService,
    private fetchService: FetchService
  ) {}

  ngOnInit() {
    this.loadData();
  }
  
  loadData() {
    const id = this.userDataService.getUserId();
    this.leaveService.getMyLeaveRequests(id).subscribe({
      next: (data) => {
        this.myRequests = data;
        this.myRequests.forEach((request: any) => {
          this.fetchService.getUser(request.approverId).subscribe((data) => {
            request.approver = data;
          });
        });
      },
      error: (err) => {
        Swal.fire('Error', '', 'error');
      },
    });
    this.leaveService.getMyTeamLeaveRequests(id).subscribe({
      next: (data) => {
        this.myTeamRequests = data;
        this.myTeamRequests.forEach((request: any) => {
          this.fetchService.getUser(request.requesterId).subscribe((data) => {
            request.requestor = data;
          });
        });
      },
      error: (err) => {
        Swal.fire('Error', '', 'error');
      },
    });
  }

  toggleDropDown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  getLocalDate(date: string) {
    return new Date(date).toLocaleString();
  }

  getFile(fileId: string): Observable<string> {
    return this.fetchService.getFile(fileId).pipe(
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

  openDocument(fileId: string) {
    this.getFile(fileId).subscribe((fileBase64) => {
      this.openedFileUrl = fileBase64;
    });
  }

  closeDocument() {
    this.openedFileUrl = null;
  }

  cancelRequest(id: string, userId: string) {}

  rejectRequest(id: string) {
    Swal.fire({
      title: 'Sure?',
      text: 'Do you want to Reject?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Reject',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.leaveService.rejectLeaveRequest(id).subscribe({
          next: (data: any) => {
            Swal.fire('Rejected Successfully!!', '', 'success').then((ok) => {
              this.loadData();
            });
          },
          error: (err: string | undefined) => {
            Swal.fire('Error', err, 'error');
          },
        });
      }
    });
  }

  approveRequest(id: string) {
    Swal.fire({
      title: 'Sure?',
      text: 'Do you want to approve?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Approve',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.leaveService.approveLeaveRequest(id).subscribe({
          next: (data: any) => {
            Swal.fire('Approved Successfully!!', '', 'success').then((ok) => {
              this.loadData();
            });
          },
          error: (err: string | undefined) => {
            Swal.fire('Error', err, 'error');
          },
        });
      }
    });
  }

  @HostListener('click', ['$event'])
  onClick(event: Event) {
    console.log(event.target);
    if (
      event.target !== this.dropDown?.nativeElement &&
      !this.dropDown?.nativeElement.contains(event.target)
    )
      this.dropdownOpen = false;
  }
}
