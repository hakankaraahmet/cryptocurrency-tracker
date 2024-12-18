import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  isAllDataLoading: boolean = false;
  isBannerDataLoading: boolean = false;

  constructor(
    private apiService: ApiService,
    private currencyService: CurrencyService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getAllData();
    this.getBannerData();
    this.currencyService.getCurrency().subscribe((val) => {
      this.currencyName = val;
      this.getAllData();
      this.getBannerData();
    });
  }

  ngDoCheck() {}

  getAllData() {
    this.isAllDataLoading = true;
    this.apiService.getCurrencyData(this.currencyName).subscribe({
      next: (res) => {
        (this.allCurrencies = Object.values(res)),
          (this.isAllDataLoading = false);
      },
      error: (err) => {
        this.isAllDataLoading = false;
        throw new Error(err);
      },
    });
  }

  getBannerData() {
    this.isBannerDataLoading = true;
    this.apiService.getTrendingCurrency(this.currencyName).subscribe({
      next: (res) => (
        (this.bannerCurrencies = Object.values(res)),
        (this.isBannerDataLoading = false)
      ),
      error: (err) => {
        this.isBannerDataLoading = false;
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

  goToDetailPage(name: string) {
    this.router.navigateByUrl(`coin-detail/${name}`);
  }
}
