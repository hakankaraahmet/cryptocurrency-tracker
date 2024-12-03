import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, shareReplay, tap } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  //caching
  private cacheDuration = 5 * 60 * 1000;
  private getCachedDataWithExpiry(url: string): Observable<any> {
    const now = Date.now();
    const cacheKey = `cache-${url}`;

    // localStorage'dan cache verisini kontrol et
    const cachedData = localStorage.getItem(cacheKey);
    if (cachedData) {
      const cached = JSON.parse(cachedData);

      // Eğer cache süresi dolmadıysa, cache'den veriyi döndür
      if (cached.expiry > now) {
        console.log(`Cache hit for ${url}`);
        return of(cached.data);
      }
    }

    // Cache süresi dolmuş veya veri yoksa, yeni veri al
    console.log(`Cache miss for ${url}`);
    const observable = this.http.get(url).pipe(
      shareReplay(1),
      tap((data) => {
        // Cache'i localStorage'a kaydet (zaman damgası ile)
        localStorage.setItem(
          cacheKey,
          JSON.stringify({
            expiry: now + this.cacheDuration, // Cache süresi
            data: data,
          })
        );
      }),
      catchError((error) => {
        console.error(`API Error: ${url}`, error);
        return of(null);
      })
    );

    return observable;
  }

  getCurrencyData(currency: string): Observable<any> {
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&sparkline=false`;
    return this.getCachedDataWithExpiry(url);
  }

  // Trending Currency
  getTrendingCurrency(currency: string): Observable<any> {
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`;
    return this.getCachedDataWithExpiry(url);
  }

  // Graphical Currency Data
  getGraphicalCurrencyData(
    coinId: string,
    currency: string,
    days: number
  ): Observable<any> {
    const url = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency}&days=${days}`;
    return this.getCachedDataWithExpiry(url);
  }

  // Currency by ID
  getCurrencyById(coinId: string): Observable<any> {
    const url = `https://api.coingecko.com/api/v3/coins/${coinId}`;
    return this.getCachedDataWithExpiry(url);
  }
}
