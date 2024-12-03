import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CurrencyService } from 'src/app/service/currency.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  selectedCurrency: string = 'USD';

  constructor(
    private currencyService: CurrencyService,
    private router: Router
  ) {}

  sendCurrency(event: string) {
    this.currencyService.setCurrency(event);
  }

  goToHomePage() {
    this.router.navigateByUrl('/');
  }
}
