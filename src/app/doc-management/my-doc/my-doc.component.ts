import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { FetchService } from '../../services/fetch/fetch.service';
import { Observable, of, Subscription, switchMap } from 'rxjs';
import { UserDataService } from '../../services/user-data/user-data.service';

@Component({
  selector: 'app-my-doc',
  standalone: false,
  templateUrl: './my-doc.component.html',
  styleUrl: './my-doc.component.css',
})
export class MyDocComponent {
  subscription!: Subscription;
  userData!: any;
  openedFileUrl: string | null = null;
  myFiles: Map<string, string> = new Map();

  constructor(
    private fetchService: FetchService,
    private userDataService: UserDataService
  ) {}

  ngOnInit() {
    this.subscription = this.userDataService.currentUser.subscribe({
      next: (data) => {
        this.userData = data;
      },
      error: (err) => {
        Swal.fire('Error', err, 'error');
      },
    });
  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      Swal.fire({
        title: 'Sure?',
        text: 'Do you want to upload the file',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, Upload',
        cancelButtonText: 'No, cancel',
      }).then((result) => {
        if (result.isConfirmed) {
          this.fetchService
            .uploadFile(this.userData.id, file)
            .subscribe((id) => {
              if (!this.userData.myFiles?.others) {
                this.userData.myFiles.others = [];
              }
              this.userData.myFiles.others.push(id);
              this.userDataService.updateProfile(this.userData);
              Swal.fire({
                title: 'File Uploaded Successfully',
                icon: 'success',
              });
            });
        }
      });
    }
  }

  getFile(fileId: string): Observable<string> {
    if (this.myFiles.has(fileId)) {
      return of(this.myFiles.get(fileId)!);
    }

    return this.fetchService.getFile(fileId).pipe(
      switchMap((file: Blob) => {
        return new Observable<string>((observer) => {
          const reader = new FileReader();
          reader.onload = () => {
            const result = reader.result as string;
            this.myFiles.set(fileId, result);
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
      console.log(this.myFiles);
    });
  }

  closeDocument() {
    this.openedFileUrl = null;
  }

  deleteDoc(fileId: string) {
    Swal.fire({
      title: 'Sure?',
      text: 'Do you want to Delete the file',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete',
      cancelButtonText: 'No, cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.fetchService.deleteFile(this.userData.id, fileId).subscribe({
          next: () => {
            const index = this.userData.myFiles.others.indexOf(fileId);
            if (index > -1) {
              this.userData.myFiles.others.splice(index, 1);
              this.userDataService.updateProfile(this.userData);
            }
            Swal.fire({
              title: 'File Deleted Successfully',
              icon: 'success',
            });
          },
          error: (err) => {
            Swal.fire('Error', err, 'error');
          },
        });
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
