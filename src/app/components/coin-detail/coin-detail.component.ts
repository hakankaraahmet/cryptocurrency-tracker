import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { CurrencyService } from 'src/app/service/currency.service';
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
  //Chart
  @ViewChild(BaseChartDirective) coinLineChart!: BaseChartDirective;
  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: `Price Trends`,
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: '#009688',
        pointBackgroundColor: '#009688',
        pointBorderColor: '#009688',
        pointHoverBackgroundColor: '#009688',
        pointHoverBorderColor: '#009688',
      },
    ],
    labels: [],
  };
  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      point: {
        radius: 1,
      },
    },

    plugins: {
      legend: { display: true },
    },
  };
  public lineChartType: ChartType = 'line';

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.coinId = params.get('id')!;
    });
  }

  ngDoCheck() {
    console.log('lineChartData :>> ', this.lineChartData);
  }

  ngOnInit() {
    this.getCoinData();
    this.getGraphData();
  }

  getCoinData() {
    this.apiService.getCurrencyById(this.coinId).subscribe({
      next: (res) => (this.coinData = res),
      error: (err) => {
        throw new Error(err);
      },
    });
  }

  getGraphData(days: number = this.days) {
    this.days = days;
    this.apiService
      .getGrpahicalCurrencyData(this.coinId, this.currency, this.days)
      .subscribe((res: any) => {
        console.log('res :>> ', res);
        setTimeout(() => {
          this.coinLineChart.chart?.update();
        }, 200);
        this.lineChartData.datasets[0].data = res.prices.map((a: any) => {
          return a[1];
        });
        this.lineChartData.labels = res.prices.map((a: any) => {
          let date = new Date(a[0]);
          let time =
            date.getHours() > 12
              ? `${date.getHours() - 12}: ${date.getMinutes()} PM`
              : `${date.getHours()}: ${date.getMinutes()} AM`;
          return this.days === 1 ? time : date.toLocaleDateString();
        });
      });
  }
}
