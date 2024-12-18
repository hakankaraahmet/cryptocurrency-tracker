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
  currencyName: string = 'USD';
  isDataLoading: boolean = false;
  //Chart
  @ViewChild(BaseChartDirective) coinLineChart!: BaseChartDirective;
  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: `Price Trends`,
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: '#ffc108',
        pointBackgroundColor: '#ffc108',
        pointBorderColor: '#ffc108',
        pointHoverBackgroundColor: '#ffc108',
        pointHoverBorderColor: '#ffc108',
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
    private activatedRoute: ActivatedRoute,
    private currencyService: CurrencyService
  ) {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.coinId = params.get('id')!;
    });
  }
  ngDoCheck() {
    console.log('this.days :>> ', this.days);
  }

  ngOnInit() {
    this.getCoinData();
    this.getGraphData();
    this.currencyService.getCurrency().subscribe((val) => {
      this.currencyName = val;
      this.getCoinData();
      this.getGraphData();
    });
  }

  getCoinData() {
    this.isDataLoading = true;
    this.apiService.getCurrencyById(this.coinId).subscribe({
      next: (res) => ((this.coinData = res), (this.isDataLoading = false)),
      error: (err) => {
        this.isDataLoading = false;
        throw new Error(err);
      },
    });
  }

  getGraphData(days: number = this.days) {
    this.days = days;
    this.apiService
      .getGraphicalCurrencyData(this.coinId, this.currencyName, this.days)
      .subscribe((res: any) => {
        setTimeout(() => {
          this.coinLineChart.chart?.update();
        }, 200);
        this.lineChartData.datasets[0].data = res?.prices.map((a: any) => {
          return a[1];
        });
        this.lineChartData.labels = res?.prices.map((a: any) => {
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
