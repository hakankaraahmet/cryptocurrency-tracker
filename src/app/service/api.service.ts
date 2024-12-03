import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getCurrencyData(currency: string) {
    return this.http.get<any>(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&sparkline=false&x_cg_demo_api_key=CG-wnJVY9SvcyjMxqfY5G3fMrWQ`
    );
  }
  getTrendingCurrency(currency: string) {
    return this.http.get<any>(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h&x_cg_demo_api_key=CG-wnJVY9SvcyjMxqfY5G3fMrWQ`
    );
  }
  getGraphicalCurrencyData(coinId: string, currency: string, days: number) {
    return this.http.get<any>(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency}&days=${days}&x_cg_demo_api_key=CG-wnJVY9SvcyjMxqfY5G3fMrWQ`
    );
  }
  getCurrencyById(coinId: string) {
    return this.http.get<any>(
      `https://api.coingecko.com/api/v3/coins/${coinId}?x_cg_demo_api_key=CG-wnJVY9SvcyjMxqfY5G3fMrWQ`
    );
  }
}
