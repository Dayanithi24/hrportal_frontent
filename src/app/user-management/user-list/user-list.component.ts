import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FetchService } from '../../services/fetch/fetch.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  standalone: false,
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent {
  pageSizes: Array<number> = [5, 10, 20];
  page: number = 0;
  selectedSize = new FormControl(5);
  responseData: any;
  isLoaded: boolean = false;
  isProfile = false;
  dropdownOpen = false;
  @ViewChild('dropdown') dropDown: ElementRef | undefined;

  // profileImageMap = new Map<string, string>();

  profiles: Array<{ [key: string]: any }> = [
    {
      name: 'Daya',
      department: 'Engineering',
      reports_to: 'hr_1',
      start_date: '02/09/2024',
      designation: 'Trainee',
      location: 'Cbe',
      src: 'google.png',
    },
    {
      name: 'Raya',
      department: 'Engineering',
      reports_to: 'hr_1',
      start_date: '02/09/2024',
      designation: 'Trainee',
      location: 'Cbe',
    },
    {
      name: 'Raya',
      department: 'Engineering',
      reports_to: 'hr_1',
      start_date: '02/09/2024',
      designation: 'Trainee',
      location: 'Cbe',
    },
    {
      name: 'Raya',
      department: 'Engineering',
      reports_to: 'hr_1',
      start_date: '02/09/2024',
      designation: 'Trainee',
      location: 'Cbe',
    },
    {
      name: 'Raya',
      department: 'Engineering',
      reports_to: 'hr_1',
      start_date: '02/09/2024',
      designation: 'Trainee',
      location: 'Cbe',
    },
  ];

  constructor(
    private fetchService: FetchService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.fetchService
      .getUsers(this.page, this.selectedSize.value)
      .subscribe((data: any) => {
        this.responseData = data;
        this.isLoaded = true;
        console.log(this.responseData);
        // this.loadProfileImages();
      });
  }

  // loadProfileImages() {
  //   this.responseData.content.forEach((user: any) => {
  //     const imageId = user?.myFiles?.profile;

  //     if (imageId && !this.profileImageMap.has(imageId)) {
  //       this.fetchService.getProfileImage(imageId).subscribe((image: Blob) => {
  //         const reader = new FileReader();
  //         reader.onloadend = () => {
  //           this.profileImageMap.set(imageId, reader.result as string);
  //         };
  //         reader.readAsDataURL(image);
  //       });
  //     }
  //   });
  // }

  // getProfileImage(user: any) {
  //   return this.profileImageMap.get(user?.myFiles?.profile);
  // }

  selectSize(size: number) {
    if (size !== this.selectedSize.value) {
      this.selectedSize.setValue(size);
      this.fetchData();
    }
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  @HostListener('click', ['$event'])
  onClick(event: Event) {
    if (
      event.target !== this.dropDown?.nativeElement &&
      !this.dropDown?.nativeElement.contains(event.target)
    )
      this.dropdownOpen = false;
  }

  incrementPage() {
    if (!this.responseData.last) {
      this.page++;
      this.fetchData();
    }
  }

  decrementPage() {
    if (!this.responseData.first) {
      this.page--;
      this.fetchData();
    }
  }

  loadProfile(id: string) {
    this.isProfile = true;
  }

  onClose(){
    this.isProfile = false;
  }
}
