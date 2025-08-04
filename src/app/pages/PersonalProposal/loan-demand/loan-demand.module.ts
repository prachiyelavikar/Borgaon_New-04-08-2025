import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoanDemandRoutingModule } from './loan-demand-routing.module';
import { LoanDemandComponent } from './loan-demand.component';
// import { DemoNgZorroAntdModule } from '../demongzorroantdmodule/demongzorroantdmodule.module';
// import { IconsProviderModule } from '../icons-provider.module';
import { NzLayoutModule, NzMenuModule } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RdloanComponent } from './loanquestions/rdloan/rdloan.component';
import { PDLoanComponent } from './loanquestions/pd-loan/pd-loan.component';
import { GoldloanThreeMonthsComponent } from './loanquestions/goldloan-three-months/goldloan-three-months.component';
import { GoldloanSixMonthsComponent } from './loanquestions/goldloan-six-months/goldloan-six-months.component';
import { GoldloanTwelveMonthsComponent } from './loanquestions/goldloan-twelve-months/goldloan-twelve-months.component';
import { BusinessGoldloanCcComponent } from './loanquestions/business-goldloan-cc/business-goldloan-cc.component';
import { GoldloanCcComponent } from './loanquestions/goldloan-cc/goldloan-cc.component';
import { DepositeccloanComponent } from './loanquestions/depositeccloan/depositeccloan.component';


@NgModule({
  declarations: [LoanDemandComponent, RdloanComponent, PDLoanComponent, GoldloanThreeMonthsComponent, GoldloanSixMonthsComponent, GoldloanTwelveMonthsComponent, BusinessGoldloanCcComponent, GoldloanCcComponent, DepositeccloanComponent],
  imports: [
    CommonModule,
    LoanDemandRoutingModule,
    // DemoNgZorroAntdModule,
    // IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    FormsModule,
    HttpClientModule,
  ]
})
export class LoanDemandModule { }
