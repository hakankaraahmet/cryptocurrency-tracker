import { Component, OnInit } from '@angular/core';
import { Currency } from 'src/app/models/Currency.model';
import { ApiService } from 'src/app/service/api.service';
import { CurrencyService } from 'src/app/service/currency.service';

@Component({
  selector: 'app-coin-list',
  templateUrl: './coin-list.component.html',
  styleUrls: ['./coin-list.component.scss'],
})
export class CoinListComponent implements OnInit {
  isScrolling = true;
  allCurrencies: Currency[] = [];
  bannerCurrencies: any = [];
  currencyName: string = 'USD';

  constructor(
    private apiService: ApiService,
    private currencyService: CurrencyService
  ) {}

  ngOnInit() {
    // this.getAllData();
    // this.getBannerData();
    // this.currencyService.getCurrency().subscribe((val) => {
    //   this.currencyName = val;
    //   this.getAllData();
    //   this.getBannerData();
    // });
  }

  ngDoCheck() {}

  getAllData() {
    //Alert loading eklenecek
    this.apiService.getCurrencyData(this.currencyName).subscribe({
      next: (res) => (this.allCurrencies = Object.values(res)),
      error: (err) => {
        throw new Error(err);
      },
    });
  }

  getBannerData() {
    //Alert loading eklenecek
    this.apiService.getTrendingCurrency(this.currencyName).subscribe({
      next: (res) => (
        console.log('this.currency :>> ', this.currencyName),
        (this.bannerCurrencies = Object.values(res))
      ),
      error: (err) => {
        throw new Error(err);
      },
    });
  }

  trackByCurrency(index: number, currency: Currency): string {
    return currency.id;
  }

  stopScroll() {
    this.isScrolling = false;
  }

  startScroll() {
    this.isScrolling = true;
  }
}
