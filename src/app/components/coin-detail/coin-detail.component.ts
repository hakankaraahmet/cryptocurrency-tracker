import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-coin-detail',
  templateUrl: './coin-detail.component.html',
  styleUrls: ['./coin-detail.component.scss'],
})
export class CoinDetailComponent implements OnInit {
  coinData!: any;
  coinId!: string;
  days: number = 1;
  currency: string = 'USD'; // Alert currency durumlari duzenlenecek
  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.coinId = params.get('id')!;
    });
  }

  ngOnInit() {
    this.getCoinData();
  }

  getCoinData() {
    this.apiService.getCurrencyById(this.coinId).subscribe({
      next: (res) => (this.coinData = res),
      error: (err) => {
        throw new Error(err);
      },
    });
  }
}
