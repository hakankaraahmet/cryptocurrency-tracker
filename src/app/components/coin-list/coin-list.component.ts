import { Component, OnInit } from '@angular/core';
import { Currency } from 'src/app/models/Currency.model';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-coin-list',
  templateUrl: './coin-list.component.html',
  styleUrls: ['./coin-list.component.scss'],
})
export class CoinListComponent implements OnInit {
  isScrolling = true;
  allCurrencies: Currency[] = [];
  bannerCurrencies: Currency[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.getAllData();
    this.getBannerData();
  }

  getAllData() {
    this.apiService.getCurrencyData('USD').subscribe({
      next: (res) => (this.allCurrencies = Object.values(res)),
      error: (err) => {
        throw new Error(err);
      },
    });
  }

  getBannerData() {
    this.apiService.getTrendingCurrency('USD').subscribe({
      next: (res) => (this.bannerCurrencies = Object.values(res)),
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
