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

  bannerCurrencies: any = [
    {
      image:
        'https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400',
      name: 'Bitcoin',
      symbol: 'btc',
      market_cap_change_percentage_24h: -1.45511,
      current_price: 95091,
    },
    {
      image:
        'https://coin-images.coingecko.com/coins/images/279/large/ethereum.png?1696501628',
      name: 'Ethereum',
      symbol: 'eth',
      market_cap_change_percentage_24h: -1.0299,
      current_price: 3569.49,
    },
    {
      image:
        'https://coin-images.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png?1696501442',
      name: 'XRP',
      symbol: 'xrp',
      market_cap_change_percentage_24h: -1.00169,
      current_price: 1.48,
    },
    {
      image:
        'https://coin-images.coingecko.com/coins/images/4128/large/solana.png?1718769756',
      name: 'Solana',
      symbol: 'sol',
      market_cap_change_percentage_24h: -2.05259,
      current_price: 235.28,
    },
    {
      image:
        'https://coin-images.coingecko.com/coins/images/825/large/bnb-icon2_2x.png?1696501970',
      name: 'BNB',
      symbol: 'bnb',
      market_cap_change_percentage_24h: 2.0286,
      current_price: 651.97,
    },
    {
      image:
        'https://coin-images.coingecko.com/coins/images/5/large/dogecoin.png?1696501409',
      name: 'Dogecoin',
      symbol: 'doge',
      market_cap_change_percentage_24h: -0.95247,
      current_price: 0.39877,
    },
    {
      image:
        'https://coin-images.coingecko.com/coins/images/975/large/cardano.png?1696502090',
      name: 'Cardano',
      symbol: 'ada',
      market_cap_change_percentage_24h: -2.30135,
      current_price: 1.001,
    },
    {
      image:
        'https://coin-images.coingecko.com/coins/images/877/large/chainlink-new-logo.png?1696502009',
      name: 'Chainlink',
      symbol: 'link',
      market_cap_change_percentage_24h: -1.79705,
      current_price: 17.84,
    },
    {
      image:
        'https://coin-images.coingecko.com/coins/images/12171/large/polkadot.png?1696512008',
      name: 'Polkadot',
      symbol: 'dot',
      market_cap_change_percentage_24h: 1.26192,
      current_price: 8.52,
    },
    {
      image:
        'https://coin-images.coingecko.com/coins/images/100/large/Stellar_symbol_black_RGB.png?1696501482',
      name: 'Stellar',
      symbol: 'xlm',
      market_cap_change_percentage_24h: -4.62561,
      current_price: 0.478823,
    },
  ];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.getAllData();
    this.getBannerData();
  }

  ngDoCheck() {
    console.log('this.allCurrencies :>> ', this.allCurrencies);
  }

  getAllData() {
    //Alert loading eklenecek
    this.apiService.getCurrencyData('USD').subscribe({
      next: (res) => (this.allCurrencies = Object.values(res)),
      error: (err) => {
        throw new Error(err);
      },
    });
  }

  getBannerData() {
    //Alert loading eklenecek
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
