import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private mainUrl: string = environment.mainUrl;
  private apiKey: string = environment.apiKey;

  constructor(private http: HttpClient) {}

  getCurrencyData(currency: string) {
    return this.http.get<any>(
      `${this.mainUrl}coins/markets?vs_currency=${currency}&order=market_cap_desc&sparkline=false&x_cg_demo_api_key=${this.apiKey}`
    );
  }
  getTrendingCurrency(currency: string) {
    return this.http.get<any>(
      `${this.mainUrl}coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h&x_cg_demo_api_key=${this.apiKey}`
    );
  }
  getGraphicalCurrencyData(coinId: string, currency: string, days: number) {
    return this.http.get<any>(
      `${this.mainUrl}coins/${coinId}/market_chart?vs_currency=${currency}&days=${days}&x_cg_demo_api_key=${this.apiKey}`
    );
  }
  getCurrencyById(coinId: string) {
    return this.http.get<any>(
      `${this.mainUrl}coins/${coinId}?x_cg_demo_api_key=${this.apiKey}`
    );
  }
}
