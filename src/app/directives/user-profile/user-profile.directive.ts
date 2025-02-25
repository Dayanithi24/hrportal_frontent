import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appUserProfile]',
  standalone: true
})
export class UserProfileDirective {

  constructor(private eleRef: ElementRef) { }

}
