import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from '../shared/shared/shared.module';
import { CoinListComponent } from './coin-list/coin-list.component';
import { CoinDetailComponent } from './coin-detail/coin-detail.component';

@NgModule({
  imports: [SharedModule],
  declarations: [HeaderComponent, CoinListComponent, CoinDetailComponent],
  exports: [HeaderComponent],
})
export class ComponentsModule {}
