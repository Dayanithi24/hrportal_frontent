import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-leave-policy',
  standalone: false,
  templateUrl: './leave-policy.component.html',
  styleUrl: './leave-policy.component.css'
})
export class LeavePolicyComponent {

  @Input() leavePolicy: any;

}
