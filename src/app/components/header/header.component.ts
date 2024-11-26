import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  selectedCurrency: string = 'EUR';

  constructor() {}

  sendCurrency(event: string) {
    console.log('event :>> ', event);
  }
}
