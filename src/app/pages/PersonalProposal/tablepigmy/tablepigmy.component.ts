import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NzModalRef, NzModalService, NzNotificationService } from 'ng-zorro-antd';
import { FCurrentDeposit } from 'src/app/Models/PersonalProposal/Fcurrentdeposit';
import { FRecurringDeposit } from 'src/app/Models/PersonalProposal/FrecurringDeposit';
import { Financialinformation } from 'src/app/Models/PersonalProposal/financialinformation';
import { Incomeyear } from 'src/app/Models/PersonalProposal/incomeyear';
import { Loaninformation } from 'src/app/Models/PersonalProposal/loaninformation';
import { Extraapplicantinfo } from 'src/app/Models/extraapplicantinfo';
import { SavingaccdetailsComponent } from '../savingaccdetails/savingaccdetails.component';
import { FinancialtermdepositComponent } from '../financialtermdeposit/financialtermdeposit.component';
import { FinancialcurrentdepositComponent } from '../financialcurrentdeposit/financialcurrentdeposit.component';
import { FinancialrecurringdepositComponent } from '../financialrecurringdeposit/financialrecurringdeposit.component';
import { DepositeloanComponent } from '../loan-demand/loanquestions/depositeloan/depositeloan.component';
import { ApiService } from 'src/app/Service/api.service';
import { FinancialpigmydepositComponent } from '../financialpigmydeposit/financialpigmydeposit.component';

@Component({
  selector: 'app-tablepigmy',
  templateUrl: './tablepigmy.component.html',
  styleUrls: ['./tablepigmy.component.css']
})


export class TablepigmyComponent implements OnInit {
  index = -1;
  @Input() loanType: number;
  // @Input() data3: FRecurringDeposit = new FRecurringDeposit();
  @Input() data3: FRecurringDeposit
  @Input() data5 : FRecurringDeposit
  saveCount: number = 0
  @Input() FINANCIAL_INFORMATION_ID

  @Output() demo: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  @Input() data: Financialinformation;
  @Output() PROPOSAL_ID: number
  @Input() financial
  @Input() dataa: Loaninformation;

  @Input() APPLICANT_ID: number
  @Input() oldIndex: number
  @Output() indexChanged: EventEmitter<number> = new EventEmitter();

  @Input() termDepositdata: FRecurringDeposit[] = [];
  // pigmyAccdata: FRecurringDeposit[] = [];
  pageSize = 100;
  loadingRecords2 = false;
  totalRecords: number;
  pageIndex = 1;
  sortValue: string = "desc";
  sortKey: string = "ID";

  isButtonSpinning = false
  date = new Date();
  data1: FRecurringDeposit = new FRecurringDeposit();
  data2: FCurrentDeposit = new FCurrentDeposit();
  // data3:FTermDeposit= new FTermDeposit();

  INCOME_AMOUNT_YEAR
  isButtonVerifySpinning = false
  incomeYears: Incomeyear[]
  value = 0
  @Input() LOAN_KEY: Number;
  @Input() CURRENT_STAGE_ID: number;
  
  year1 = ""
  year2 = ""
  year3 = ""




  CLIENT_ID
  // FINANCIAL_INFORMATION_ID 
  DEPOSIT_TYPE
  // IS_HAVE_DEPOSIT
  ACC_NO: number
  ACC_AMOUNT: number
  MATURITY_DUE
  roleId = sessionStorage.getItem("roleId")
  drawerVisible3: boolean
  drawerVisible4: boolean
  drawerVisible8: boolean


  dataList2: any[] = [];
  dataList22 = [];
  dataList = [];
  dataList5 = [];

  // pigmyAccdata: FRecurringDeposit[] = [];
  currentDepositdata: FRecurringDeposit[] = [];
  @Input() pigmyAccdata: FRecurringDeposit[] = [];
  savingAccdata: FRecurringDeposit[] = [];
  // @Input() pigmyAccdata: FRecurringDeposit[] = [];

  FinanceData: Financialinformation = new Financialinformation();
  drawerVisible2: boolean;
  drawerData1: FRecurringDeposit = new FRecurringDeposit();
  drawerData5: FRecurringDeposit = new FRecurringDeposit();
  drawerTitle2: string;
  drawerData2: FRecurringDeposit = new FRecurringDeposit()
  drawerData6: FRecurringDeposit = new FRecurringDeposit();
  drawerData7: Financialinformation = new Financialinformation();
  drawerData8: FRecurringDeposit = new FRecurringDeposit();
  drawerTitle3: string;
  drawerTitle4: string;
  drawerTitle8: string;
  logtext: string = ""
  loadingRecords4 = false;
  // @Input() extraApplicantInformation: Extraapplicantinfo;


  // year2 = this.lastYear + "-" + this.date.getFullYear()
  // year3 = this.latyear1 + "-" + this.lastYear
  i = 2
  oldType = ""
  oldYear = ""
  incomeSourceId: number = 0
  otherincomeSourceId: number = 0
  otherincomeSourceId2: number = 0
  isSpinning = false
  i1
  // dataList:any[] = [];
  // dataList1: any[] = []
  financial1
  extraApplicantInformation: Extraapplicantinfo = new Extraapplicantinfo()
  dataCode = 0
  proposalType = Number(sessionStorage.getItem("PRAPOSAL_TYPE"))
  isSaved = Number(sessionStorage.getItem("IS_SAVED"))
  total = [];
  total1 = [];
  confirmModal?: NzModalRef;

  @ViewChild(SavingaccdetailsComponent) savingAccInfo: SavingaccdetailsComponent;
  @ViewChild(FinancialtermdepositComponent) termAccinfo: FinancialtermdepositComponent;
  @ViewChild(FinancialcurrentdepositComponent) currentAccInfo: FinancialcurrentdepositComponent;
  @ViewChild(FinancialrecurringdepositComponent) recurringAccInfo: FinancialrecurringdepositComponent;
  @ViewChild(FinancialpigmydepositComponent) pigmyAccInfo: FinancialpigmydepositComponent;
  @ViewChild(DepositeloanComponent) depositLoan: DepositeloanComponent;


  deletePigmyAcc(data: any): void {
    this.confirmModal = this.modal.confirm({
      nzTitle: this.api.translate.instant('common.confirmModal.nzTitle'),
      nzContent: this.api.translate.instant('common.confirmModal.nzContent'),
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          data.ARCHIVE_FLAG = "P";

          this.api.updateDepositInformation(data).subscribe(
            successCode => {
              if (successCode['code'] == 200) {
                this.getPigmyAcc();
                setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
                this.drawerClose8();
                this.message.success(this.api.translate.instant('common.message.success.addinfo'), "");
              }
              else {
                this.message.error(this.api.translate.instant('common.message.success.deleteinfo'), "");
              }
            }
          )

        }).catch(() => { })//console.log('माहिती बदल करण्यात अयशस्वी!'))
    });
  }

  Pedit(data: FRecurringDeposit, i: number): void {
    this.pigmyAccInfo.saveCount = 0;
    this.index = i;
    this.drawerTitle8 = this.api.translate.instant('cash-credit-loan-other.title8');
    this.drawerData8 = Object.assign({}, data);
    this.drawerVisible8 = true;

    this.logtext = 'EDIT - CashCreditOther form KEYWORD [E - CashCreditOther] ';
    this.api.addLog('A', this.logtext, this.api.emailId)
      .subscribe(successCode => {
        if (successCode['code'] == "200") {
          ////console.log(successCode);
        }
        else {
          ////console.log(successCode);
        }
      });
  }

  saveWorkdata25(): void {
    if (this.index > -1) {
      this.pigmyAccdata[this.index] = Object.assign({}, this.drawerData8);
    } else {
      this.pigmyAccdata.push(Object.assign({}, this.drawerData8));
    }
    this.pigmyAccdata = [...this.pigmyAccdata];
    this.index = -1;
  }

  getPigmyAcc() {
    this.api.getDepositInformation(this.PROPOSAL_ID, 'P').subscribe(
      successCode => {
        if (successCode['code'] == 200) {
          this.pigmyAccdata = successCode['data']
        }
      }
    )
  }

  drawerClose8(): void {
    // this.loadData();
    this.getPigmyAcc();
    this.drawerVisible8 = false;
  }
  get closeCallback8() {
    return this.drawerClose8.bind(this);
  }

  // drawerTitle8: string;
  // drawerVisible8: boolean;


  constructor(private api: ApiService, private message: NzNotificationService, private modal: NzModalService,) { }

  ngOnInit(): void {


  }

  
  close(): void {
    this.drawerClose3();

    this.logtext = 'CLOSED - Extra Info form';
    this.api.addLog('A', this.logtext, this.api.emailId)
      .subscribe(successCode => {
        if (successCode['code'] == "200") {
          ////console.log(successCode);
        }
        else {
          ////console.log(successCode);
        }
      });


  }
  getSessionValues() {
    this.proposalType = Number(sessionStorage.getItem("PRAPOSAL_TYPE"))
    this.isSaved = Number(sessionStorage.getItem("IS_SAVED"))
  }

  sort(sort: { key: string; value: string }): void {
    this.sortKey = sort.key;
    this.sortValue = sort.value;

  }
  get closeCallback3() {
    return this.drawerClose3.bind(this);
  }

  
  



  loadData() {
    // this.isSpinning = true
    // this.api.getFinancialInformation(this.PROPOSAL_ID, "B", this.APPLICANT_ID).subscribe(data => {
    //   if (data['code'] == 200 && data['data'].length > 0) {

    //     this.FinanceData=data['data'][0]
    //     this.isSpinning = false
    //     //console.log(this.FinanceData,"finanacial")
    //     //console.log(data)

    //     if (this.proposalType == 1) {
    //       let filter = "AND PROPOSAL_ID=" + this.PROPOSAL_ID + " AND TYPE='B'"
    //       this.api.getAllIncomeInformation(0, 0, "ID", 'desc', filter)
    //         .subscribe(data => {
    //           ////console.log("income info in financial")
    //           ////console.log(data)
    //           if (data['code'] == 200 && data['data'].length > 0) {
    //             this.incomeSourceId = data['data'][0]['INCOME_SOURCE_ID']
    //             this.otherincomeSourceId = data['data'][0]['OTHER_INCOME_SOURCE_ID']
    //             // this.otherincomeSourceId2 = data['data'][0]['OTHER_INCOME_SOURCE_ID2']
    //           }
    //         }, err => {
    //           ////console.log(err);
    //         });
    //     }

    //     this.dataCode = data['code']
    //     this.data = Object.assign({}, data['data'][0]);


    //     // if (this.data.DAILY_PIGMY_AMOUNT == 0)
    //     //   this.data.DAILY_PIGMY_AMOUNT = undefined

    //     // if (this.data.PIGMY_BALANCE == 0)
    //     //   this.data.PIGMY_BALANCE = undefined



    //     // this.data.LAST_3_YEAR_INFORMATION = data['data'][0]['LAST_3_YEAR_INFORMATION']
    //     // this.year1 = this.data.LAST_3_YEAR_INFORMATION[0]['FINANCIAL_YEAR']
    //     // this.year2 = this.data.LAST_3_YEAR_INFORMATION[1]['FINANCIAL_YEAR']
    //     // this.year3 = this.data.LAST_3_YEAR_INFORMATION[2]['FINANCIAL_YEAR']
    //     // this.calculate(0)
    //     // this.calculate(1)
    //     // this.calculate(2)
    //     // this.calculateTotal(0)
    //     // this.calculateTotal(1)
    //     // this.calculateTotal(2)
    //   }
    // }, err => {
    //   ////console.log(err);
    // });

    this.api.getFinancialInformation(this.PROPOSAL_ID, "B", this.APPLICANT_ID).subscribe(data => {

      if (data['code'] == 200 && data['data'].length > 0) {
        this.FinanceData = data['data'][0]


        this.getTermDeposit();
        this.getPigmyAcc();
        // this.getRecurringDeposit();




        // this.dataList1 = this.FinanceData['TERM_DEPOSIT']
        // this.dataList = this.FinanceData['RECURING_DEPOSIT']
        // this.dataList22 = this.FinanceData['CURRENT_DEPOSIT']
        this.isSpinning = false
        //console.log(this.FinanceData, "finanacial")
        //console.log(data)

        if (this.proposalType == 1) {
          let filter = "AND PROPOSAL_ID=" + this.PROPOSAL_ID + " AND TYPE='B'"
          this.api.getAllIncomeInformation(0, 0, "ID", 'desc', filter)
            .subscribe(data => {
              ////console.log("income info in financial")
              ////console.log(data)
              if (data['code'] == 200 && data['data'].length > 0) {
                this.incomeSourceId = data['data'][0]['INCOME_SOURCE_ID']
                this.otherincomeSourceId = data['data'][0]['OTHER_INCOME_SOURCE_ID']
                // this.otherincomeSourceId2 = data['data'][0]['OTHER_INCOME_SOURCE_ID2']
              }
            }, err => {
              ////console.log(err);
            });
        }

        this.dataCode = data['code']
        this.data = Object.assign({}, data['data'][0]);


        
      }
    }, err => {
      ////console.log(err);
    });
  }



  drawerClose3(): void {
    // this.getData5();
    this.getTermDeposit();
    this.drawerVisible3 = false;
  }





  edit4(data: FRecurringDeposit, i: number): void {
    console.log(data)

    this.termAccinfo.saveCount = 0;
    this.index = i;
    this.drawerTitle3 = this.api.translate.instant('cash-credit-loan-other.drawerTitle13');
    this.drawerData1 = Object.assign({}, data);
    // this.termAccinfo.data3 = data
    this.pigmyAccInfo.data5 = data
    this.PROPOSAL_ID = data.PROPOSAL_ID;
    // data.ID = this.data3.ID 
    this.drawerVisible3 = true;
    
    this.termAccinfo.print()
    console.log("im inthe edit option", data)

    this.logtext = 'EDIT - CashCreditOther form KEYWORD [E - CashCreditOther] ';
    this.api.addLog('A', this.logtext, this.api.emailId)
      .subscribe(successCode => {
        if (successCode['code'] == "200") {
          ////console.log(successCode);
        }
        else {
          ////console.log(successCode);
        }
      });
  }

  getTermDeposit() {
    this.api.getDepositInformation(this.PROPOSAL_ID, 'T').subscribe(
      successCode => {
        if (successCode['code'] == 200) {
          this.pigmyAccdata = successCode['data']
        }
      }
    )
  }

  add3(): void {
    this.drawerTitle8 = this.api.translate.instant('cash-credit-loan-other.title1');
    this.drawerData1 = new FRecurringDeposit();
    this.termAccinfo.saveCount = 0;
    this.drawerVisible3 = true;
    this.drawerVisible8 = true;
    this.drawerData1.PROPOSAL_ID = this.PROPOSAL_ID

    this.logtext = 'ADD - CashCreditOther form KEYWORD [A - CashCreditOther] ';
    this.api.addLog('A', this.logtext, this.api.emailId)
      .subscribe(successCode => {
        if (successCode['code'] == "200") {
          ////console.log(successCode);
        }
        else {
          ////console.log(successCode);
        }
      });

  }
  delete3(data: FRecurringDeposit): void {

    console.log(data, "indelete");
    this.confirmModal = this.modal.confirm({
      nzTitle: this.api.translate.instant('common.confirmModal.nzTitle'),
      nzContent: this.api.translate.instant('common.confirmModal.nzContent'),
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          data.ARCHIVE_FLAG = "P";
          this.PROPOSAL_ID = data.PROPOSAL_ID;
          console.log(data.PROPOSAL_ID)


          this.api.updateDepositInformation(data).subscribe(
            successCode => {
              if (successCode['code'] == 200) {
                this.getTermDeposit();
                setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
                this.drawerClose3();
                this.message.success(this.api.translate.instant('common.message.success.addinfo'), "");
              }
              else {
                this.message.error(this.api.translate.instant('common.message.success.deleteinfo'), "");
              }
            }
          )

          console.log('data delete from table of Financial Tab Question 1 ------------------------------------------- ', this.data)

        }).catch(() => { })//console.log('माहिती बदल करण्यात अयशस्वी!'))
    });

  }

  // saveWorkdata1(): void {
  //   if (this.index > -1) {
  //     this.pigmyAccdata[this.index] = Object.assign({}, this.drawerData1);
  //   } else {
  //     this.pigmyAccdata.push(Object.assign({}, this.drawerData1));
  //   }
  //   this.pigmyAccdata = [...this.pigmyAccdata];
  //   this.index = -1;
  // }

  // saveWorkdata(): void {
  //   if (this.index > -1) {
  //     this.pigmyAccdata[this.index] = Object.assign({}, this.drawerData5);
  //   } else {
  //     this.pigmyAccdata.push(Object.assign({}, this.drawerData5));
  //   }
  //   this.pigmyAccdata = [...this.pigmyAccdata];
  //   this.index = -1;
  // }


  // totalIncome1() {
  //   let total6 = 0;
  

  //   for (const amt of this.pigmyAccdata) {

  //     total6 += parseFloat(amt.ACC_AMOUNT.toString());

  //   }

  //   return total6;
  // }

  totalIncome1() {
    let total6 = 0;
    // console.log("im inthe totalincomedepo",this.pigmyAccdata)

    // for (const amt of this.pigmyAccdata) {

    //   total6 += parseFloat(amt.ACC_AMOUNT.toString());

    // }
    for (const amt of this.pigmyAccdata) {


      total6 += (amt.ACC_AMOUNT || 0);

    }

    return Number(total6.toFixed(2));
  }

  // averageInterest() {
  //   if (this.pigmyAccdata.length === 0) {
  //     return 0; // Handle the case when the array is empty to avoid division by zero
  //   }

  //   let totalInterest = 0;

  //   for (const entry of this.pigmyAccdata) {
  //     if (entry && entry.INTEREST_RATE !== null && entry.INTEREST_RATE !== undefined) {
  //       totalInterest += parseFloat(entry.INTEREST_RATE.toString());
  //     }
  //   }

  //   // for (const entry of this.pigmyAccdata) {
  //   //   // Assuming that the property name is 'interest', modify it if your property is named differently
  //   //   totalInterest += parseFloat(entry.INTEREST_RATE.toString());
  //   // }

  //   // Calculate the average by dividing the total interest by the number of entries
  //   const average = totalInterest / this.pigmyAccdata.length;

  //   return average;
  // }

  // averageInterest() {
  //   if (this.pigmyAccdata.length === 0) {
  //     return 0; // Handle the case when the array is empty to avoid division by zero
  //   }
  
  //   let totalInterest = 0;
  //   let validEntriesCount = 0;
  
  //   for (const entry of this.pigmyAccdata) {
  //     const interestRate = parseFloat(entry.INTEREST_RATE.toString());
  //     if (interestRate > 0) { // Only consider entries with interest greater than zero
  //       totalInterest += interestRate;
  //       validEntriesCount++;
  //     }
  //   }
  
  //   // If no valid entries are found, return 0 to avoid division by zero
  //   if (validEntriesCount === 0) {
  //     return 0;
  //   }
  
  //   // Calculate the average by dividing the total interest by the number of valid entries
  //   const average = totalInterest / validEntriesCount;
  
  //   return average;
  // }

  // averageInterest() {
  //   if (this.pigmyAccdata.length === 0) {
  //     return 0; // Handle the case when the array is empty to avoid division by zero
  //   }
  
  //   let totalInterest = 0;
  //   let validEntriesCount = 0;
  
  //   for (const entry of this.pigmyAccdata) {
  //     // Check if INTEREST_RATE is not null and can be converted to a number
  //     if (entry.INTEREST_RATE != null) {
  //       const interestRate = parseFloat(entry.INTEREST_RATE.toString());
  //       if (interestRate > 0) { // Only consider entries with interest greater than zero
  //         totalInterest += interestRate;
  //         validEntriesCount++;
  //       }
  //     }
  //   }
  
  //   // If no valid entries are found, return 0 to avoid division by zero
  //   if (validEntriesCount === 0) {
  //     return 0;
  //   }
  
  //   // Calculate the average by dividing the total interest by the number of valid entries
  //   const average = totalInterest / validEntriesCount;
  
  //   return average;
  // }

  highestInterest() {
    if (this.pigmyAccdata.length === 0) {
      return 0; // Return 0 if the array is empty
    }
  
    let maxInterest = 0;
  
    for (const entry of this.pigmyAccdata) {
      // Check if INTEREST_RATE is not null and can be converted to a number
      if (entry.INTEREST_RATE != null) {
        const interestRate = parseFloat(entry.INTEREST_RATE.toString());
        if (interestRate > maxInterest) { 
          maxInterest = interestRate; // Update maxInterest if a higher value is found
        }
      }
    }
  
    return maxInterest;
  }

  totalCountOfReceiptNo() {
    // Initialize a variable to store the total count
    let totalCount = 0;

    for (const entry of this.pigmyAccdata) {
      // Assuming that the property name is 'receipt.no', modify it if your property is named differently
      // Check if the entry has a receipt number before incrementing the count
      if (entry['RECEIPT_NO']) {
        totalCount++;
      }
    }

    return totalCount;
  }


  //  earliestMaturityDueDate(): Date | null {
  //   if (this.pigmyAccdata.length === 0) {
  //     return null; // Handle the case when the array is empty
  //   }

  //   // Reset the earliest maturity date
  //   let earliestDueDate: Date | null = null;

  //   // Iterate through pigmyAccdata and update the earliest maturity date
  //   this.pigmyAccdata.forEach(entry => {
  //     const maturityDate = new Date(entry['MATURITY_DUE']);
  //     maturityDate.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to zero for accurate comparison

  //     if (!earliestDueDate || maturityDate < earliestDueDate) {
  //       earliestDueDate = maturityDate;
  //     }
  //   });

  //   return earliestDueDate;
  // }


  getDaysRemaining(): number | null {
    const earliestMaturityDate = this.earliestMaturityDueDate();

    if (!earliestMaturityDate) {
      return null;
    }

    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    const MS_PER_DAY = 24 * 60 * 60 * 1000;
    const daysRemaining = Math.floor((earliestMaturityDate.getTime() - currentDate.getTime()) / MS_PER_DAY);

    return daysRemaining;
  }

  // earliestMaturityDueDate(): Date | null {
  //   if (this.pigmyAccdata.length === 0) {
  //     return null;
  //   }
  
  //   let earliestDueDate: Date | null = null;
  
  //   this.pigmyAccdata.forEach(entry => {
  //     const maturityDateString = entry['MATURITY_DUE'];
  //     const [day, month, year] = maturityDateString.split('/').map(Number);
  
  //     // Check if the parsed values are valid numbers
  //     if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
  //       // Note: Month in JavaScript Date is 0-indexed, so subtract 1 from the parsed month
  //       const maturityDate = new Date(year, month - 1, day);
  //       maturityDate.setHours(0, 0, 0, 0);
  
  //       if (!earliestDueDate || maturityDate < earliestDueDate) {
  //         earliestDueDate = maturityDate;
  //       }
  //     }
  //   });
  
  //   return earliestDueDate;
  // }

  earliestMaturityDueDate(): Date | null {
    if (this.pigmyAccdata.length === 0) {
      return null;
    }
  
    let earliestDueDate: Date | null = null;
  
    this.pigmyAccdata.forEach(entry => {
      const maturityDateString = entry['MATURITY_DUE'] || '';
      
      const [day, month, year] = maturityDateString.split('/').map(Number);
  
        if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {  // Check if the parsed values are valid numbers
          const maturityDate = new Date(year, month - 1, day);
          maturityDate.setHours(0, 0, 0, 0);
  
          if (!earliestDueDate || maturityDate < earliestDueDate) {
            earliestDueDate = maturityDate;
          }
        }
    
    });
  
    return earliestDueDate;
  }
  

  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
  
    return `${day}/${month}/${year}`;
  }
  formattedEarliestMaturityDate(): string | null {
    const earliestMaturityDate = this.earliestMaturityDueDate();
    if (earliestMaturityDate) {
      return this.formatDate(earliestMaturityDate);
    } else {
      return null;
    }
  }


  deleteRecurringDeposit(data: FRecurringDeposit): void {
    this.confirmModal = this.modal.confirm({
      nzTitle: this.api.translate.instant('common.confirmModal.nzTitle'),
      nzContent: this.api.translate.instant('common.confirmModal.nzContent'),
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          data.ARCHIVE_FLAG = "P";
          this.PROPOSAL_ID = data.PROPOSAL_ID;
          console.log(data.PROPOSAL_ID)

          this.api.updateDepositInformation(data).subscribe(
            successCode => {
              if (successCode['code'] == 200) {
                this.getPigmyAcc();
                // this.getRecurringDeposit();
                setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
                this.drawerClose8();
                this.message.success(this.api.translate.instant('common.message.success.addinfo'), "");
              }
              else {
                this.message.error(this.api.translate.instant('common.message.success.deleteinfo'), "");
              }
            }
          )

        }).catch(() => { })//console.log('माहिती बदल करण्यात अयशस्वी!'))
    });

  }

 

  // getRecurringDeposit() {
  //   this.api.getDepositInformation(this.PROPOSAL_ID, 'P').subscribe(
  //     successCode => {
  //       if (successCode['code'] == 200) {
  //         this.pigmyAccdata = successCode['data']
  //       }
  //     }
  //   )
  // }

  // drawerClose4(): void {
  //   this.getCurrentDeposit();
  //   // this.getData5();
  //   this.drawerVisible4 = false;
  // }
  get closeCallback5() {
    return this.drawerClose8.bind(this);
  }

  

  edit3(data: FRecurringDeposit, i: number): void {
    this.recurringAccInfo.saveCount = 0;
    this.index = i;
    this.drawerTitle8 = this.api.translate.instant('cash-credit-loan-other.drawerTitle1');
    this.drawerData5 = Object.assign({}, data);
    this.recurringAccInfo.data = data
    this.recurringAccInfo.print()
    this.PROPOSAL_ID = data.PROPOSAL_ID;
    this.drawerVisible8 = true;

    this.logtext = 'EDIT - CashCreditOther form KEYWORD [E - CashCreditOther] ';
    this.api.addLog('A', this.logtext, this.api.emailId)
      .subscribe(successCode => {
        if (successCode['code'] == "200") {
          //console.log(successCode);
        }
        else {
          //console.log(successCode);
        }
      });
  }

  

}
