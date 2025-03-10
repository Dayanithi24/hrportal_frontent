import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-my-balance',
  standalone: false,
  templateUrl: './my-balance.component.html',
  styleUrl: './my-balance.component.css'
})
export class MyBalanceComponent {

  @Input() leavePolicy: any;
  colors: Array<string> = ['#8282ff', '#dd0052', 'orange', '#008282', '#ff5252'];

}
