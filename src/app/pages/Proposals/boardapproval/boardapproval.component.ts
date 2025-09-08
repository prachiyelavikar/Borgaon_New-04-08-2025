import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';
import { Useractivitylog } from 'src/app/Models/Applicant/useractivitylog';
import { Proposal } from 'src/app/Models/proposal';
import { ApiService } from 'src/app/Service/api.service';
import { DatePipe } from '@angular/common';
import { conformToMask } from 'angular2-text-mask';
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe';
import { ToWords } from 'to-words'
import { SanctionAmountService } from 'src/app/Service/sanction-amount.service';
import { FRecurringDeposit } from 'src/app/Models/PersonalProposal/FrecurringDeposit';



const toWords_kn = new ToWords({
  localeCode: 'kn-IN',
  converterOptions: {
    currency: true,
    ignoreDecimal: false,
    ignoreZeroCurrency: false,
    doNotAddOnly: false,
  }
});

const toWords_mr = new ToWords({
  localeCode: 'mr-IN',
  converterOptions: {
    currency: true,
    ignoreDecimal: false,
    ignoreZeroCurrency: false,
    doNotAddOnly: false,
  }
});


const toWords = new ToWords({
  localeCode: 'en-IN',
  converterOptions: {
    currency: true,
    ignoreDecimal: false,
    ignoreZeroCurrency: false,
    doNotAddOnly: false,
  }
});
@Component({
  selector: 'app-boardapproval',
  templateUrl: './boardapproval.component.html',
  styleUrls: ['./boardapproval.component.css']
})
export class BoardapprovalComponent implements OnInit, OnChanges {

  LoanAmountOption: number;
  amulya_total: number;
  roleId = sessionStorage.getItem("roleId");

  optionList = [
    // {
    //   label: 'Jayanand B Jadhav. (Chairman)',
    //   value: 'A',
    // },
    // {
    //   label: 'Ravindra C. Chougala (General Manager)',
    //   value: 'B',
    // },
    // {
    //   label: 'Mahadev K. Mangavate (Deputy G.M.)',
    //   value: 'C',
    // },
    // {
    //   label: 'Ramesh G. Kumbhar (Deputy G.M.)',
    //   value: 'D',
    // },
    // {
    //   label: 'Suresh K. Mane (Deputy G.M.)',
    //   value: 'E',
    // },
    // {
    //   label: 'Bahaddur A. Gurav (Deputy G.M.)',
    //   value: 'F',
    // },
    // {
    //   label: 'Shivaputra M. Dabb (Deputy G.M.)',
    //   value: 'G',
    // },

    {
      label: 'Test Signature (General Manager)',
      value: 'A',
    },
    // {
    //   label: 'Ravindra C. Chougala (General Manager)',
    //   value: 'B',
    // },
    // {
    //   label: 'Mahadev K. Mangavate (Deputy G.M.)',
    //   value: 'C',
    // },
    // {
    //   label: 'Ramesh G. Kumbhar (Deputy G.M.)',
    //   value: 'D',
    // },
    // {
    //   label: 'Suresh K. Mane (Deputy G.M.)',
    //   value: 'E',
    // },
    // {
    //   label: 'Bahaddur A. Gurav (Deputy G.M.)',
    //   value: 'F',
    // },
    // {
    //   label: 'Shivaputra M. Dabb (Deputy G.M.)',
    //   value: 'G',
    // },


  ];

  selectedValue = { label: '', value: '' };

  @Input() termDepositdata: FRecurringDeposit[] = [];

  isButtonSpinning = false
  @Input() drawerClose: Function;
  @Input() data: Proposal;
  @Output() fsubmit = new EventEmitter<string>();
  @Input() CURRENT_STAGE_ID: number;
  REMARKS: string = ""
  STATUS = 'A'
  installmentFrequencyData: any;
  termdata: any
  isSpinning = false
  fileDataFile1: File = null
  @ViewChild('file1', { static: false }) myInputVariable1: ElementRef;
  logtext = ""
  userId = sessionStorage.getItem("userId")
  fkey1 = ""
  userActivityLogData: Useractivitylog = new Useractivitylog();
  pipe = new DatePipe('en-US');
  converted: any;
  loadingLoanTypes = false
  isSpinning1 = false
  browserLang = 'kn';
  public mask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  autoCorrectedDatePipe = createAutoCorrectedDatePipe('dd/mm/yyyy HH:MM')
  fileData_REPORT_URL2: File = null
  isSpinning3 = false;
  fkey = this.api.documentFkey;
  maxAmount: number = 0;


  constructor(private api: ApiService, private message: NzNotificationService, private datePipe: DatePipe, private sanctionAmountService: SanctionAmountService) { }

  ngOnInit(): void {
    this.fkey1 = this.api.sanctionFkey
    this.browserLang = localStorage.getItem('locale');
    this.api.getAllInstallmentFrequency(0, 0, 'ID', "asc", "AND IS_ACTIVE = '1'").subscribe(data => {
      if (data['code'] == "200") {
        this.installmentFrequencyData = data['data'];
        this.isSpinning1 = false
      }
    }, err => {
      //console.log(err);
    });
    this.api.getAllTermofLoan(1, 20, 'ID', "asc", "").subscribe(data => {
      if (data['code'] == "200") {
        this.termdata = data['data'];
        this.isSpinning1 = false;
        // this.calcYear(this.data.TENURE_OF_LOAN)

      }
    }, err => {
      //console.log(err);
    });

    // this.sanctionAmountService.currentSanctionAmount.subscribe(amount => {
    //   this.maxAmount = amount;
    // });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data) { this.getTermDeposit() }
    if (changes.data) { this.getTermDeposit2() }
  }

  // validateAmount(value: number): boolean {
  //   if (value > this.maxAmount) {
  //     this.data.SANCTION_AMOUNT = this.maxAmount; // Set to max if it exceeds
  //     return false;
  //   }
  //   return true;
  // }

  showMaxAmountError: boolean = false;

  validateAmount(value: number): boolean {
    if (value > this.maxAmount) {
      this.data.SANCTION_AMOUNT = this.maxAmount; // Set to max if it exceeds
      this.showMaxAmountError = true; // Show the error message
      return false;
    }
    this.showMaxAmountError = false; // Hide the error message if valid
    return true;
  }


  sanc(event) {
    if (this.data.TERM_OF_LOAN == 50) {
      this.data.RATE_OF_INTEREST = 60
      this.data.EMI_AMOUNT = 600
      this.data.SANCTION_AMOUNT = 30000;
      this.amulya_total = ~~this.data.EMI_AMOUNT + ~~this.data.RATE_OF_INTEREST;
    }
    if (this.data.TERM_OF_LOAN == 75) {
      this.data.RATE_OF_INTEREST = 60
      this.data.EMI_AMOUNT = 400
      this.data.SANCTION_AMOUNT = 30000;
      this.amulya_total = ~~this.data.EMI_AMOUNT + ~~this.data.RATE_OF_INTEREST;
    }

  }
  rate(event) {
    this.data.SANCTION_AMOUNT = event
    //console.log(this.LoanAmountOption)
    if (this.data.SANCTION_AMOUNT == 5000) {
      this.data.RATE_OF_INTEREST = 10
      this.data.TERM_OF_LOAN = 50
      this.data.EMI_AMOUNT = 100
      this.amulya_total = ~~this.data.EMI_AMOUNT + ~~this.data.RATE_OF_INTEREST;
    }

    if (this.data.SANCTION_AMOUNT == 10000) {
      this.data.RATE_OF_INTEREST = 20
      this.data.TERM_OF_LOAN = 50
      this.data.EMI_AMOUNT = 200
      this.amulya_total = ~~this.data.EMI_AMOUNT + ~~this.data.RATE_OF_INTEREST;
    }

    if (this.data.SANCTION_AMOUNT == 15000) {
      this.data.RATE_OF_INTEREST = 30
      this.data.TERM_OF_LOAN = 50
      this.data.EMI_AMOUNT = 300
      this.amulya_total = ~~this.data.EMI_AMOUNT + ~~this.data.RATE_OF_INTEREST;
    }

    if (this.data.SANCTION_AMOUNT == 20000) {
      this.data.RATE_OF_INTEREST = 40
      this.data.TERM_OF_LOAN = 50
      this.data.EMI_AMOUNT = 400

      this.amulya_total = ~~this.data.EMI_AMOUNT + ~~this.data.RATE_OF_INTEREST;
    }

    if (this.data.SANCTION_AMOUNT == 25000) {
      this.data.RATE_OF_INTEREST = 50
      this.data.TERM_OF_LOAN = 50
      this.data.EMI_AMOUNT = 500

      this.amulya_total = ~~this.data.EMI_AMOUNT + ~~this.data.RATE_OF_INTEREST;
    }

    if (this.data.SANCTION_AMOUNT == 30000) {
      this.data.RATE_OF_INTEREST = 60
      this.data.TERM_OF_LOAN = 50
      this.data.EMI_AMOUNT = 600
      this.amulya_total = ~~this.data.EMI_AMOUNT + ~~this.data.RATE_OF_INTEREST;
    }

    if (this.data.SANCTION_AMOUNT == null || this.data.SANCTION_AMOUNT == 0) {
      this.data.AMOUNT_IN_WORDS = ""

    }
    else {
      this.data.AMOUNT_IN_WORDS = toWords.convert(this.data.SANCTION_AMOUNT, { currency: true });

    }

  }

  reset() {
    this.myInputVariable1.nativeElement.value = null;
    this.fileDataFile1 = null
  }

  onFileSelectedFile1(event) {
    this.fileDataFile1 = <File>event.target.files[0];
  }

  calcInstallments(event) {
    this.data.TYPE_OF_INSTALLMENT = event;
    // if(this.data.TERM_ID)


    if (this.data.TERM_OF_LOAN != undefined && this.data.TERM_OF_LOAN != 0) {
      var terdata = this.termdata.filter((termid) => termid.ID == this.data.TERM_OF_LOAN);
      var name = terdata[0]['NAME']
      var d = name.split('(')
      var year = Number(d[1].substr(0, 1))
      console.log(year);
      if (this.data.TYPE_OF_INSTALLMENT == 2)
        this.INSTALLMENT_COUNT = (year * 12) / 1;
      this.data.EMI_AMOUNT = this.data.SANCTION_AMOUNT / this.INSTALLMENT_COUNT;

      if (this.data.TYPE_OF_INSTALLMENT == 3)
        this.INSTALLMENT_COUNT = (year * 12) / 3;
      this.data.EMI_AMOUNT = this.data.SANCTION_AMOUNT / this.INSTALLMENT_COUNT;

      if (this.data.TYPE_OF_INSTALLMENT == 4)
        this.INSTALLMENT_COUNT = (year * 12) / 6;
      this.data.EMI_AMOUNT = this.data.SANCTION_AMOUNT / this.INSTALLMENT_COUNT;

      if (this.data.TYPE_OF_INSTALLMENT == 5)
        this.INSTALLMENT_COUNT = (year * 12) / 12;
      this.data.EMI_AMOUNT = this.data.SANCTION_AMOUNT / this.INSTALLMENT_COUNT;

      if (this.data.TYPE_OF_INSTALLMENT == 6)
        this.INSTALLMENT_COUNT = (year * 12) / 3;
      this.data.EMI_AMOUNT = this.data.SANCTION_AMOUNT / this.INSTALLMENT_COUNT;

      if (this.data.TYPE_OF_INSTALLMENT == 10)
        this.INSTALLMENT_COUNT = 1;
      this.data.EMI_AMOUNT = this.data.SANCTION_AMOUNT / this.INSTALLMENT_COUNT;

      if (this.data.TYPE_OF_INSTALLMENT == 7)
        this.INSTALLMENT_COUNT = (year * 12) / 6;
      this.data.EMI_AMOUNT = this.data.SANCTION_AMOUNT / this.INSTALLMENT_COUNT;

      if (this.data.TYPE_OF_INSTALLMENT == 8)
        this.INSTALLMENT_COUNT = (year * 12) / 12;
      this.data.EMI_AMOUNT = this.data.SANCTION_AMOUNT / this.INSTALLMENT_COUNT;

      if (this.data.TYPE_OF_INSTALLMENT == 11)
        this.INSTALLMENT_COUNT = (year * 12) / 24;
      this.data.EMI_AMOUNT = this.data.SANCTION_AMOUNT / this.INSTALLMENT_COUNT;

      if (this.data.TYPE_OF_INSTALLMENT == 12)
        this.INSTALLMENT_COUNT = (year * 12) / 36;
      this.data.EMI_AMOUNT = this.data.SANCTION_AMOUNT / this.INSTALLMENT_COUNT;

      this.INSTALLMENT_COUNT = Math.ceil(this.INSTALLMENT_COUNT)
      this.data.EMI_AMOUNT = Math.ceil(this.data.EMI_AMOUNT)
      // console.log(this.INSTALLMENT_COUNT);
      console.log(this.data.EMI_AMOUNT);

    } else {
      this.INSTALLMENT_COUNT = 0
    }


  }
  INSTALLMENT_COUNT = 0
  calcInstallments2(event) {
    this.data.TERM_OF_LOAN = event;


    if (this.data.TERM_OF_LOAN != undefined && this.data.TERM_OF_LOAN != null) {
      var terdata = this.termdata.filter((termid) => termid.ID == this.data.TERM_OF_LOAN);
      var name = terdata[0]['NAME']
      var d = name.split('(')
      let year;
      if (this.data.TERM_OF_LOAN > 5) {
        year = Number(d[1].substr(0, 2));
      } else {
        year = Number(d[1].substr(0, 1));
      }
      // var year = Number(d[1].substr(0, 1))
      // console.log(year);

      if (this.data.TYPE_OF_INSTALLMENT == 2)
        this.INSTALLMENT_COUNT = (year * 12) / 1;
      this.data.EMI_AMOUNT = this.data.SANCTION_AMOUNT / this.INSTALLMENT_COUNT;

      if (this.data.TYPE_OF_INSTALLMENT == 3)
        this.INSTALLMENT_COUNT = (year * 12) / 3;
      this.data.EMI_AMOUNT = this.data.SANCTION_AMOUNT / this.INSTALLMENT_COUNT;

      if (this.data.TYPE_OF_INSTALLMENT == 4)
        this.INSTALLMENT_COUNT = (year * 12) / 6;
      this.data.EMI_AMOUNT = this.data.SANCTION_AMOUNT / this.INSTALLMENT_COUNT;

      if (this.data.TYPE_OF_INSTALLMENT == 5)
        this.INSTALLMENT_COUNT = (year * 12) / 12;
      this.data.EMI_AMOUNT = this.data.SANCTION_AMOUNT / this.INSTALLMENT_COUNT;

      if (this.data.TYPE_OF_INSTALLMENT == 6)
        this.INSTALLMENT_COUNT = (year * 12) / 3;
      this.data.EMI_AMOUNT = this.data.SANCTION_AMOUNT / this.INSTALLMENT_COUNT;

      if (this.data.TYPE_OF_INSTALLMENT == 10)
        this.INSTALLMENT_COUNT = 1;
      this.data.EMI_AMOUNT = this.data.SANCTION_AMOUNT / this.INSTALLMENT_COUNT;

      if (this.data.TYPE_OF_INSTALLMENT == 7)
        this.INSTALLMENT_COUNT = (year * 12) / 6;
      this.data.EMI_AMOUNT = this.data.SANCTION_AMOUNT / this.INSTALLMENT_COUNT;

      if (this.data.TYPE_OF_INSTALLMENT == 8)
        this.INSTALLMENT_COUNT = (year * 12) / 12;
      this.data.EMI_AMOUNT = this.data.SANCTION_AMOUNT / this.INSTALLMENT_COUNT;

      if (this.data.TYPE_OF_INSTALLMENT == 11)
        this.INSTALLMENT_COUNT = (year * 12) / 24;
      this.data.EMI_AMOUNT = this.data.SANCTION_AMOUNT / this.INSTALLMENT_COUNT;

      if (this.data.TYPE_OF_INSTALLMENT == 12)
        this.INSTALLMENT_COUNT = (year * 12) / 36;
      this.data.EMI_AMOUNT = this.data.SANCTION_AMOUNT / this.INSTALLMENT_COUNT;

      this.INSTALLMENT_COUNT = Math.ceil(this.INSTALLMENT_COUNT)
      this.data.EMI_AMOUNT = Math.ceil(this.data.EMI_AMOUNT)
      // console.log(this.INSTALLMENT_COUNT);
      console.log(this.data.EMI_AMOUNT);

    } else {
      this.INSTALLMENT_COUNT = 0
    }


  }
  calcInstallments4(event) {
    // if(this.data.SANCTION_AMOUNT > this.data.SANCTION_AMOUNT3){
    //   this.data.SANCTION_AMOUNT = this.data.SANCTION_AMOUNT3;
    //   console.warn("greater")
    // }

    // this.Amount = event;
    // let words = toWords.convert( this.Amount, { currency: true });
    if (this.data.SANCTION_AMOUNT == null || this.data.SANCTION_AMOUNT == 0) {
      this.data.HAND_WRITTEN_AMT_IN_WORDS2 = ""

    }
    else {
      // this.data.LOAN_AMOUNT_IN_WORDSS = toWords.convert(this.data.SANCTION_AMOUNT, { currency: true });
      if (this.browserLang == 'en') {
        this.data.HAND_WRITTEN_AMT_IN_WORDS2 = toWords.convert(this.data.SANCTION_AMOUNT, { currency: true });
      }
      else if (this.browserLang == 'kn') {
        this.data.HAND_WRITTEN_AMT_IN_WORDS2 = toWords_kn.convert(this.data.SANCTION_AMOUNT, { currency: true });
      }
      else if (this.browserLang == 'mr') {
        this.data.HAND_WRITTEN_AMT_IN_WORDS2 = toWords_mr.convert(this.data.SANCTION_AMOUNT, { currency: true });
      }
      console.log(this.data.HAND_WRITTEN_AMT_IN_WORDS2, " this.data3.LOAN_AMOUNT_IN_WORDS")
    }
    this.claculate();



  }

  calcInstallments1(event) {
    if (this.data.SANCTION_AMOUNT > this.data.SANCTION_AMOUNT3) {
      this.data.SANCTION_AMOUNT = this.data.SANCTION_AMOUNT3;
      console.warn("greater")
    }

    // this.Amount = event;
    // let words = toWords.convert( this.Amount, { currency: true });
    if (this.data.SANCTION_AMOUNT == null || this.data.SANCTION_AMOUNT == 0) {
      this.data.HAND_WRITTEN_AMT_IN_WORDS2 = ""

    }
    else {
      // this.data.LOAN_AMOUNT_IN_WORDSS = toWords.convert(this.data.SANCTION_AMOUNT, { currency: true });
      if (this.browserLang == 'en') {
        this.data.HAND_WRITTEN_AMT_IN_WORDS2 = toWords.convert(this.data.SANCTION_AMOUNT, { currency: true });
      }
      else if (this.browserLang == 'kn') {
        this.data.HAND_WRITTEN_AMT_IN_WORDS2 = toWords_kn.convert(this.data.SANCTION_AMOUNT, { currency: true });
      }
      else if (this.browserLang == 'mr') {
        this.data.HAND_WRITTEN_AMT_IN_WORDS2 = toWords_mr.convert(this.data.SANCTION_AMOUNT, { currency: true });
      }
      console.log(this.data.HAND_WRITTEN_AMT_IN_WORDS2, " this.data3.LOAN_AMOUNT_IN_WORDS")
    }
    this.claculate();



  }

  claculate() {
    if (this.data.RATE_OF_INTEREST && this.data.TERM_OF_LOAN && this.data.TYPE_OF_INSTALLMENT && this.data.SANCTION_AMOUNT) {

      var terdata = this.termdata.filter(
        (termid) => termid.ID == this.data.TERM_OF_LOAN
      );
      var name = terdata[0]["NAME"];
      var d = name.split("(");
      let year;
      if (this.data.TERM_OF_LOAN > 5) {
        year = Number(d[1].substr(0, 2));
      } else {
        year = Number(d[1].substr(0, 1));
      }

      let installmentFrequency = 1

      let principle_amount = Number(this.data.SANCTION_AMOUNT);

      let INSTALLMENT_COUNT = 1


      if (this.data.TYPE_OF_INSTALLMENT == 2) {
        INSTALLMENT_COUNT = (year * 12) / 1;
        installmentFrequency = 12;
      }


      if (this.data.TYPE_OF_INSTALLMENT == 3) {
        INSTALLMENT_COUNT = (year * 12) / 3;
        installmentFrequency = 4;
      }


      if (this.data.TYPE_OF_INSTALLMENT == 4) {
        INSTALLMENT_COUNT = (year * 12) / 6;
        installmentFrequency = 2;
      }


      if (this.data.TYPE_OF_INSTALLMENT == 5) {
        INSTALLMENT_COUNT = (year * 12) / 12;
        installmentFrequency = 1;
      }


      if (this.data.TYPE_OF_INSTALLMENT == 6) {
        INSTALLMENT_COUNT = (year * 12) / 3;
        installmentFrequency = 4;
      }


      if (this.data.TYPE_OF_INSTALLMENT == 10) {
        INSTALLMENT_COUNT = 1;
        installmentFrequency = 1;
      }

      if (this.data.TYPE_OF_INSTALLMENT == 7) {
        INSTALLMENT_COUNT = (year * 12) / 6;
        installmentFrequency = 2;
      }


      if (this.data.TYPE_OF_INSTALLMENT == 8) {
        INSTALLMENT_COUNT = (year * 12) / 12;
        installmentFrequency = 1;
      }


      if (this.data.TYPE_OF_INSTALLMENT == 11) {
        INSTALLMENT_COUNT = (year * 12) / 24;
        installmentFrequency = 1;
      }


      if (this.data.TYPE_OF_INSTALLMENT == 12) {
        INSTALLMENT_COUNT = (year * 12) / 36;
        installmentFrequency = 1;
      }

      if (this.data.LOAN_TYPE_ID == 5 || this.data.LOAN_TYPE_ID == 7) {
        let tenure_of_loan_month = Number(INSTALLMENT_COUNT);
        //console.log("tenure_of_loan_month", tenure_of_loan_month)
        let interest_per_month = (Number(this.data.RATE_OF_INTEREST) / Number(installmentFrequency)) / 100;

        let emi = (principle_amount * interest_per_month * Math.pow((1 + interest_per_month), tenure_of_loan_month)) / (Math.pow((1 + interest_per_month), (tenure_of_loan_month)) - 1);

        //console.log("emi ", emi)
        //console.log("data", this.data)
        this.data.EMI_AMOUNT = Math.round(emi);
      }
      else {
        let emi = this.data.SANCTION_AMOUNT / INSTALLMENT_COUNT;
        this.data.EMI_AMOUNT = Math.round(emi);
      }


    }
  }
  saveData_GM() {
    this.isButtonSpinning = true;
    if (this.data.LOAN_RELEASE_DATE != undefined && this.data.LOAN_RELEASE_DATE != ''
    ) {
      if (this.data.LOAN_RELEASE_DATE[0] >= 0 && this.data.LOAN_RELEASE_DATE[0] <= 9 && this.data.LOAN_RELEASE_DATE[1] >= 0 && this.data.LOAN_RELEASE_DATE[1] <= 9 && this.data.LOAN_RELEASE_DATE[3] >= 0 && this.data.LOAN_RELEASE_DATE[3] <= 9 && this.data.LOAN_RELEASE_DATE[4] >= 0 && this.data.LOAN_RELEASE_DATE[4] <= 9 && this.data.LOAN_RELEASE_DATE[9] >= 0 && this.data.LOAN_RELEASE_DATE[9] <= 9 && this.data.LOAN_RELEASE_DATE[8] >= 0 && this.data.LOAN_RELEASE_DATE[8] <= 9 && this.data.LOAN_RELEASE_DATE[7] >= 0 && this.data.LOAN_RELEASE_DATE[7] <= 9 && this.data.LOAN_RELEASE_DATE[6] >= 0 && this.data.LOAN_RELEASE_DATE[6] <= 9) {

        var conformedPhoneNumber = conformToMask(
          this.data.LOAN_RELEASE_DATE,
          this.mask,
          { guide: false }
        )
        const str = conformedPhoneNumber.conformedValue.split('/');

        const year = Number(str[2]);
        const month = Number(str[1]) - 1;
        const dates = Number(str[0]);

        this.converted = new Date(year, month, dates)
        console.log('Loan Release Date01------------', this.data.LOAN_RELEASE_DATE)


        // if (this.converted <= new Date()) {
        this.data.LOAN_RELEASE_DATE = this.datePipe.transform(this.converted, 'yyyy-MM-dd');

        console.log('Loan Release Date------------', this.data.LOAN_RELEASE_DATE)



      }
    }


    // if (this.data.LOAN_TYPE_ID == 8 || this.data.LOAN_TYPE_ID == 9 || this.data.LOAN_TYPE_ID == 10 || this.data.LOAN_TYPE_ID == 11 || this.data.LOAN_TYPE_ID == 17) {
    //   let nextStageId = 22
    //   this.api.passToMainBranch2(this.data.SIGNATURE, this.data.COMMITTEE_NO, this.data.AMOUNT_IN_WORDS, this.data.TERM_OF_LOAN,
    //     this.data.TYPE_OF_INSTALLMENT, this.data.EMI_AMOUNT, this.data.RESOLUTION_NO, this.data.RATE_OF_INTEREST,
    //     this.data.SANCTION_DATE, this.data.SANCTION_AMOUNT, this.data.ID, this.data.CURRENT_STAGE_ID,
    //     nextStageId, this.REMARKS, Number(this.userId), this.data.PROPOSAL_FILE, this.data.SANCTION_FILE, this.data.MOROTORIUM, this.data.MEETING_NO,this.data.LOAN_RELEASE_DATE, this.data.DISBURSED_AMOUNT, this.data.LOAN_AMOUNT_IN_WORDS, this.data.LOAN_AMOUNT_IN_WORDSS, this.data.INSTALLMENT_COUNT, this.data.HAND_WRITTEN_AMT_IN_WORDS2, this.data.WRITTEN_TOTALAMT_WORDS, this.data.ACCOUNT_NO)
    //     .subscribe(successCode => {
    //       // ////console.log(successCode)

    //       if (successCode['code'] == "200") {
    //         this.isButtonSpinning = false
    //         this.message.success("Proposal has been Sent To Loan Officer", '');
    //         this.close();
    //       }
    //       else {
    //         this.isButtonSpinning = false;
    //         this.message.error("Failed to Send Proposal To Loan Officer", '');
    //       }
    //     })
    // }

    if (this.data.LOAN_TYPE_ID != 8 && this.data.LOAN_TYPE_ID != 9 && this.data.LOAN_TYPE_ID != 10 && this.data.LOAN_TYPE_ID != 11 && this.data.LOAN_TYPE_ID != 17) {
      let nextStageId = 12
      // ////console.log(nextStageId, this.data.ID)
      this.api.passToMainBranch2(this.data.SIGNATURE, this.data.COMMITTEE_NO, this.data.AMOUNT_IN_WORDS, this.data.TERM_OF_LOAN,
        this.data.TYPE_OF_INSTALLMENT, this.data.EMI_AMOUNT, this.data.RESOLUTION_NO, this.data.RATE_OF_INTEREST,
        this.data.SANCTION_DATE, this.data.SANCTION_AMOUNT, this.data.ID, this.data.CURRENT_STAGE_ID,
        nextStageId, this.REMARKS, Number(this.userId), this.data.PROPOSAL_FILE, this.data.SANCTION_FILE, this.data.MOROTORIUM, this.data.MEETING_NO, this.data.LOAN_RELEASE_DATE, this.data.DISBURSED_AMOUNT, this.data.LOAN_AMOUNT_IN_WORDS, this.data.LOAN_AMOUNT_IN_WORDSS, this.data.INSTALLMENT_COUNT, this.data.HAND_WRITTEN_AMT_IN_WORDS2, this.data.WRITTEN_TOTALAMT_WORDS, this.data.ACCOUNT_NO, this.data.REF_NO, this.data.REMARK)
        .subscribe(successCode => {
          // ////console.log(successCode)

          if (successCode['code'] == "200") {
            this.isButtonSpinning = false
            this.message.success("Loan has been Sanctioned, Waiting for Disbursement", '');
            this.close();
          }
          else {
            this.isButtonSpinning = false;
            this.message.error("Failed to Sanction Loan", '');
          }
        })
    }


  }

  onlySave() {

    this.isButtonSpinning = true;
    if (this.data.LOAN_RELEASE_DATE != undefined && this.data.LOAN_RELEASE_DATE != ''
    ) {
      if (this.data.LOAN_RELEASE_DATE[0] >= 0 && this.data.LOAN_RELEASE_DATE[0] <= 9 && this.data.LOAN_RELEASE_DATE[1] >= 0 && this.data.LOAN_RELEASE_DATE[1] <= 9 && this.data.LOAN_RELEASE_DATE[3] >= 0 && this.data.LOAN_RELEASE_DATE[3] <= 9 && this.data.LOAN_RELEASE_DATE[4] >= 0 && this.data.LOAN_RELEASE_DATE[4] <= 9 && this.data.LOAN_RELEASE_DATE[9] >= 0 && this.data.LOAN_RELEASE_DATE[9] <= 9 && this.data.LOAN_RELEASE_DATE[8] >= 0 && this.data.LOAN_RELEASE_DATE[8] <= 9 && this.data.LOAN_RELEASE_DATE[7] >= 0 && this.data.LOAN_RELEASE_DATE[7] <= 9 && this.data.LOAN_RELEASE_DATE[6] >= 0 && this.data.LOAN_RELEASE_DATE[6] <= 9) {

        var conformedPhoneNumber = conformToMask(
          this.data.LOAN_RELEASE_DATE,
          this.mask,
          { guide: false }
        )
        const str = conformedPhoneNumber.conformedValue.split('/');

        const year = Number(str[2]);
        const month = Number(str[1]) - 1;
        const dates = Number(str[0]);

        this.converted = new Date(year, month, dates)
        console.log('Loan Release Date01------------', this.data.LOAN_RELEASE_DATE)


        // if (this.converted <= new Date()) {
        this.data.LOAN_RELEASE_DATE = this.datePipe.transform(this.converted, 'yyyy-MM-dd');

        console.log('Loan Release Date------------', this.data.LOAN_RELEASE_DATE)



      }
    }
    let nextStageId = 15
    // ////console.log(nextStageId, this.data.ID)
    this.api.passToMainBranch2(this.data.SIGNATURE, this.data.COMMITTEE_NO, this.data.AMOUNT_IN_WORDS, this.data.TERM_OF_LOAN,
      this.data.TYPE_OF_INSTALLMENT, this.data.EMI_AMOUNT, this.data.RESOLUTION_NO, this.data.RATE_OF_INTEREST,
      this.data.SANCTION_DATE, this.data.SANCTION_AMOUNT, this.data.ID, this.data.CURRENT_STAGE_ID,
      nextStageId, this.REMARKS, Number(this.userId), this.data.PROPOSAL_FILE, this.data.SANCTION_FILE, this.data.MOROTORIUM, this.data.MEETING_NO, this.data.LOAN_RELEASE_DATE, this.data.DISBURSED_AMOUNT, this.data.LOAN_AMOUNT_IN_WORDS, this.data.LOAN_AMOUNT_IN_WORDSS, this.data.INSTALLMENT_COUNT, this.data.HAND_WRITTEN_AMT_IN_WORDS2, this.data.WRITTEN_TOTALAMT_WORDS, this.data.ACCOUNT_NO, this.data.REF_NO, this.data.REMARK)
      .subscribe(successCode => {
        // ////console.log(successCode)

        if (successCode['code'] == "200") {
          this.isButtonSpinning = false
          this.message.success("Successfully Saved", '');
          this.close();
        }
        else {
          this.isButtonSpinning = false;
          this.message.error("Failed to Sanction Loan", '');
        }
      })













  }

  // saveData_GM() {
  //   this.isButtonSpinning = true;
  //   if (this.data.SANCTION_DATE != undefined && this.data.SANCTION_DATE != ''
  //   ) {
  //     if (this.data.SANCTION_DATE[0] >= 0 && this.data.SANCTION_DATE[0] <= 9 && this.data.SANCTION_DATE[1] >= 0 && this.data.SANCTION_DATE[1] <= 9 && this.data.SANCTION_DATE[3] >= 0 && this.data.SANCTION_DATE[3] <= 9 && this.data.SANCTION_DATE[4] >= 0 && this.data.SANCTION_DATE[4] <= 9 && this.data.SANCTION_DATE[9] >= 0 && this.data.SANCTION_DATE[9] <= 9 && this.data.SANCTION_DATE[8] >= 0 && this.data.SANCTION_DATE[8] <= 9 && this.data.SANCTION_DATE[7] >= 0 && this.data.SANCTION_DATE[7] <= 9 && this.data.SANCTION_DATE[6] >= 0 && this.data.SANCTION_DATE[6] <= 9) {

  //       var conformedPhoneNumber = conformToMask(
  //         this.data.SANCTION_DATE,
  //         this.mask,
  //         { guide: false }
  //       )
  //       const str = conformedPhoneNumber.conformedValue.split('/');

  //       const year = Number(str[2]);
  //       const month = Number(str[1]) - 1;
  //       const dates = Number(str[0]);

  //       this.converted = new Date(year, month, dates)


  //       // if (this.converted <= new Date()) {
  //       this.data.SANCTION_DATE = this.datePipe.transform(this.converted, 'yyyy-MM-dd');
  //     }
  //   }
  //   let nextStageId = 12
  //   // ////console.log(nextStageId, this.data.ID)
  //   this.api.passToMainBranch2(this.data.SIGNATURE, this.data.COMMITTEE_NO, this.data.AMOUNT_IN_WORDS, this.data.TERM_OF_LOAN,
  //     this.data.TYPE_OF_INSTALLMENT, this.data.EMI_AMOUNT, this.data.RESOLUTION_NO, this.data.RATE_OF_INTEREST,
  //     this.data.SANCTION_DATE, this.data.SANCTION_AMOUNT,this.data.ID, this.data.CURRENT_STAGE_ID,
  //     nextStageId, this.REMARKS, Number(this.userId), this.data.PROPOSAL_FILE, this.data.SANCTION_FILE, this.data.MOROTORIUM,this.data.LOAN_RELEASE_DATE,this.data.DISBURSED_AMOUNT,this.data.SANCTION_AMOUNT_IN_WORDS,this.data.LOAN_AMOUNT_IN_WORDSS,this.data.LOAN_AMOUNT_IN_WORDS,this.data.HAND_WRITTEN_AMT_IN_WORDS2)
  //     .subscribe(successCode => {
  //       // ////console.log(successCode)

  //       if (successCode['code'] == "200") {
  //         this.isButtonSpinning = false
  //         this.message.success("Loan has been Sanctioned, Waiting for Disbursement", '');
  //         this.close();
  //       }
  //       else {
  //         this.isButtonSpinning = false;
  //         this.message.error("Failed to Sanction Loan", '');
  //       }
  //     })

  // }


  confirm() {
    this.saveData_GM();
  }

  confirm1() {
    this.save();
  }


  cancel(): void {
  }



  save() {
    //console.log("signature : ", this.data.SIGNATURE);
    if (this.STATUS == 'R') {
      this.data.SANCTION_FILE = ''
      //console.log("Remark : ", this.REMARKS);

      let nextStageId = 6
      if (this.REMARKS != undefined && this.REMARKS != '') {

        this.isButtonSpinning = true
        // ////console.log(nextStageId, this.data.ID)
        this.api.updateStatus(this.data.CURRENT_STAGE_ID, nextStageId, " ", this.data.ID, 0, this.data.REJECTNOTE1)
          .subscribe(successCode => {
            // ////console.log(successCode)


            if (successCode['code'] == "200") {
              this.isButtonSpinning = false;
              if (this.STATUS == 'R') {
                var LOG_ACTION = 'Proposal has rejected by Board '

                var DESCRIPTION = sessionStorage.getItem('userName') + ' has marked proposal' + this.data['LOAN_KEY'] + ' as rejected on behalf of board and given remark -' + this.REMARKS
                var LOG_TYPE = 'I'
                this.api.proposalLogInformation(this.data.ID, this.data.CURRENT_STAGE_ID, 6, LOG_ACTION, Number(this.userId), DESCRIPTION, LOG_TYPE)
                  .subscribe(successCode => {
                    if (successCode['code'] == "200") {
                    }
                  });

                this.close()

              }
              if (this.STATUS == 'F') {
                var LOG_ACTION = 'Proposal resent to refill infomration'

                var DESCRIPTION = sessionStorage.getItem('userName') + ' has sent the proposal' + this.data['LOAN_KEY'] + ' to refill with remark -' + this.REMARKS
                var LOG_TYPE = 'I'
                this.api.proposalLogInformation(this.data.ID, this.data.CURRENT_STAGE_ID, 8, LOG_ACTION, Number(this.userId), DESCRIPTION, LOG_TYPE)
                  .subscribe(successCode => {
                    if (successCode['code'] == "200") {
                    }
                  });
              }
              // this.drawerClose()
              this.logtext = 'FinalApproval  - Proposal Rejected  form - SUCCESS ' + "Stage Id" + nextStageId + JSON.stringify(this.data) + " KEYWORD [U - ApplicantDocument ]";
              this.api.addLog('A', this.logtext, this.api.emailId)
                .subscribe(successCode => {
                  if (successCode['code'] == "200") {
                    // ////console.log(successCode);
                  }
                  else {
                    // ////console.log(successCode);

                  }
                });

              this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
              this.userActivityLogData.ACTIVITY_DETAILS = " FinalApproval  -   Proposal Rejected  " + "Stage Id" + nextStageId + JSON.stringify(this.data)
              this.userActivityLogData.ACTIVITY_TIME = new Date()
              this.api.createUserActivityLog(this.userActivityLogData)
                .subscribe(successCode => {
                  if (successCode['code'] == "200") {
                    // ////console.log(successCode);
                  }
                  else {
                    // ////console.log(successCode);


                  }
                });


            }
            else {

              this.isButtonSpinning = false

              this.logtext = ' FinalApproval  -  Proposal Rejected  form - ERROR - ' + "Stage Id" + nextStageId + "Json" + JSON.stringify(this.data) + " KEYWORD [U - JoinedBranch ]";
              this.api.addLog('A', this.logtext, this.api.emailId)
                .subscribe(successCode => {
                  if (successCode['code'] == "200") {
                    // ////console.log(successCode);
                  }
                  else {
                    // ////console.log(successCode);


                  }
                });
              this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
              this.userActivityLogData.ACTIVITY_DETAILS = " FinalApproval  -  Proposal Rejected  Failed" + "Stage Id" + nextStageId + JSON.stringify(this.data)
              this.userActivityLogData.ACTIVITY_TIME = new Date()
              this.api.createUserActivityLog(this.userActivityLogData)
                .subscribe(successCode => {
                  if (successCode['code'] == "200") {
                    // ////console.log(successCode);
                  }
                  else {
                    // ////console.log(successCode);
                  }
                });
              this.message.error(this.api.translate.instant('common.message.error.failed'), "");

              this.isButtonSpinning = false

            }
          });
      }
      // else {
      // } this.message.error(this.api.translate.instant('common.message.error.remarkempty'), "");
    } else {
      if (this.data.SANCTION_DATE != undefined && this.data.SANCTION_DATE != '' &&
        this.data.RESOLUTION_NO != undefined && this.data.RESOLUTION_NO != 0 &&
        this.data.RATE_OF_INTEREST != undefined &&
        this.data.SANCTION_AMOUNT != undefined && this.data.SANCTION_AMOUNT != 0 &&
        this.data.SIGNATURE != undefined && this.data.SIGNATURE != '' && this.data.REF_NO != undefined && this.data.REF_NO != 0 && this.data.REMARK != undefined && this.data.REMARK != ''
      ) {
        if (this.data.SANCTION_DATE[0] >= 0 && this.data.SANCTION_DATE[0] <= 9 && this.data.SANCTION_DATE[1] >= 0 && this.data.SANCTION_DATE[1] <= 9 && this.data.SANCTION_DATE[3] >= 0 && this.data.SANCTION_DATE[3] <= 9 && this.data.SANCTION_DATE[4] >= 0 && this.data.SANCTION_DATE[4] <= 9 && this.data.SANCTION_DATE[9] >= 0 && this.data.SANCTION_DATE[9] <= 9 && this.data.SANCTION_DATE[8] >= 0 && this.data.SANCTION_DATE[8] <= 9 && this.data.SANCTION_DATE[7] >= 0 && this.data.SANCTION_DATE[7] <= 9 && this.data.SANCTION_DATE[6] >= 0 && this.data.SANCTION_DATE[6] <= 9) {

          var conformedPhoneNumber = conformToMask(
            this.data.SANCTION_DATE,
            this.mask,
            { guide: false }
          )
          const str = conformedPhoneNumber.conformedValue.split('/');

          const year = Number(str[2]);
          const month = Number(str[1]) - 1;
          const dates = Number(str[0]);

          this.converted = new Date(year, month, dates)


          // if (this.converted <= new Date()) {
          this.data.SANCTION_DATE = this.datePipe.transform(this.converted, 'yyyy-MM-dd');
          this.REMARKS = ''
          if (this.fileDataFile1) {
            var fileExt = this.fileDataFile1.name.split('.').pop();
            this.api.onUploadNewMethod(this.fileDataFile1, fileExt, this.api.sanctionFkey)
              .subscribe(successCode => {
                if (successCode['code'] == 200) {
                  let lkey = successCode['data'][0]['L_KEY']
                  this.data.SANCTION_FILE = lkey;
                  this.saveData();
                }
                else {
                  ////console.log(successCode)
                }
              });
          }
          else {

            this.data.SANCTION_FILE = '';   // file नाही म्हणून रिकामं
            this.REMARKS = this.REMARKS || ''; // undefined नको
            this.data.SANCTION_DATE = this.data.SANCTION_DATE || this.datePipe.transform(new Date(), 'yyyy-MM-dd');


            //  file नाही पण तरी save करायचं आहे
            this.saveData();
            this.close();
            // if (this.fileDataFile1 == null)
            //   this.message.error(this.api.translate.instant('basicinfo.m19'), "");
          }
          // } else {

          //   this.message.error('Sanction Date cannot be in the future', '');
          // }
        }
        else {
          this.message.error(this.api.translate.instant('basicinfo.dateerror'), "")
        }
      } else {
        this.message.error(this.api.translate.instant('common.message.error.emptyinfo'), "");
      }


    }


    // if (this.STATUS == 'R') {
    //   this.data.CURRENT_STAGE_ID = 6;
    // }
    // else {
    //   this.data.CURRENT_STAGE_ID = 21;
    // }

    console.log("im in the save function", this.data.SANCTION_AMOUNT)



  }




  save1() {
    if (
      this.data.SANCTION_DATE != undefined && this.data.SANCTION_DATE != '' &&
      this.data.RESOLUTION_NO != undefined && this.data.RESOLUTION_NO != 0 &&
      this.data.RATE_OF_INTEREST != undefined &&
      this.data.SANCTION_AMOUNT != undefined && this.data.SANCTION_AMOUNT != 0 &&
      this.data.SIGNATURE != undefined && this.data.SIGNATURE != '' && this.data.REF_NO != undefined && this.data.REF_NO != 0
    ) {
      // Validate date format manually
      const d = this.data.SANCTION_DATE;
      if (d[0] >= 0 && d[0] <= 9 && d[1] >= 0 && d[1] <= 9 &&
        d[3] >= 0 && d[3] <= 9 && d[4] >= 0 && d[4] <= 9 &&
        d[6] >= 0 && d[6] <= 9 && d[7] >= 0 && d[7] <= 9 &&
        d[8] >= 0 && d[8] <= 9 && d[9] >= 0 && d[9] <= 9) {

        const conformed = conformToMask(this.data.SANCTION_DATE, this.mask, { guide: false });
        const [dd, mm, yyyy] = conformed.conformedValue.split('/');
        this.converted = new Date(+yyyy, +mm - 1, +dd);

        this.data.SANCTION_DATE = this.datePipe.transform(this.converted, 'yyyy-MM-dd');

        if (this.fileDataFile1) {
          const fileExt = this.fileDataFile1.name.split('.').pop();
          this.api.onUploadNewMethod(this.fileDataFile1, fileExt, this.api.sanctionFkey)
            .subscribe(successCode => {
              if (successCode['code'] == 200) {
                const lkey = successCode['data'][0]['L_KEY'];
                this.data.SANCTION_FILE = lkey;
                this.saveOnlyWithoutStageChange();
                // this.saveData(); // Save after upload
                this.close();    // Then close drawer/modal
              } else {
                this.message.error('File upload failed', '');
              }
            });
        } else {
          // this.message.error(this.api.translate.instant('basicinfo.m19'), '');
          // 👇 file नाही पण तरी save करायचं आहे
          this.saveOnlyWithoutStageChange();
          this.close();
        }
      } else {
        this.message.error(this.api.translate.instant('basicinfo.dateerror'), '');
      }
    } else {
      this.message.error(this.api.translate.instant('common.message.error.emptyinfo'), '');
    }

    console.log("Saving data only (no stage change):", this.data);
  }


  // claculate2() {
  //   if (this.data.RATE_OF_INTEREST && this.data.TERM_OF_LOAN && this.data.TYPE_OF_INSTALLMENT && this.data.SANCTION_AMOUNT) {

  //     var terdata = this.termdata.filter(
  //       (termid) => termid.ID == this.data.TERM_OF_LOAN
  //     );
  //     var name = terdata[0]["NAME"];
  //     var d = name.split("(");
  //     let year;
  //     // if (this.data.TERM_OF_LOAN > 5) {
  //     //   year = Number(d[1].substr(0, 2));
  //     // } else {
  //     //   year = Number(d[1].substr(0, 1));
  //     // }

  //     if (this.data.TERM_ID > 5 && this.data.TERM_ID < 9) {
  //       year = Number(d[1].substr(0, 2));
  //     } else if (this.data.TERM_ID == 9){
  //       year = Number(d[1].substr(0, 1));
  //     }
  //     else{
  //       year = Number(d[1].substr(0, 1));
  //     }

  //     let installmentFrequency = 1

  //     let principle_amount = Number(this.data.SANCTION_AMOUNT);



  //     if (this.data.TYPE_OF_INSTALLMENT == 2) {
  //       this.data.INSTALLMENT_COUNT = (year * 12) / 1;
  //       installmentFrequency = 12;
  //     }


  //     if (this.data.TYPE_OF_INSTALLMENT == 3) {
  //       this.data.INSTALLMENT_COUNT = (year * 12) / 3;
  //       installmentFrequency = 4;
  //     }


  //     if (this.data.TYPE_OF_INSTALLMENT == 4) {
  //       this.data.INSTALLMENT_COUNT = (year * 12) / 6;
  //       installmentFrequency = 2;
  //     }


  //     if (this.data.TYPE_OF_INSTALLMENT == 5) {
  //       this.data.INSTALLMENT_COUNT = (year * 12) / 12;
  //       installmentFrequency = 1;
  //     }


  //     if (this.data.TYPE_OF_INSTALLMENT == 6) {
  //       this.data.INSTALLMENT_COUNT = (year * 12) / 3;
  //       installmentFrequency = 4;
  //     }


  //     if (this.data.TYPE_OF_INSTALLMENT == 10) {
  //       this.data.INSTALLMENT_COUNT = 1;
  //       installmentFrequency = 1;
  //     }

  //     if (this.data.TYPE_OF_INSTALLMENT == 7) {
  //       this.data.INSTALLMENT_COUNT = (year * 12) / 6;
  //       installmentFrequency = 2;
  //     }


  //     if (this.data.TYPE_OF_INSTALLMENT == 8) {
  //       this.data.INSTALLMENT_COUNT = (year * 12) / 12;
  //       installmentFrequency = 1;
  //     }


  //     if (this.data.TYPE_OF_INSTALLMENT == 11) {
  //       this.data.INSTALLMENT_COUNT = (year * 12) / 24;
  //       installmentFrequency = 1;
  //     }


  //     if (this.data.TYPE_OF_INSTALLMENT == 12) {
  //       this.data.INSTALLMENT_COUNT = (year * 12) / 36;
  //       installmentFrequency = 1;
  //     }

  //     if (this.data.LOAN_TYPE_ID == 5 || this.data.LOAN_TYPE_ID == 7) {
  //       let tenure_of_loan_month = Number(this.data.INSTALLMENT_COUNT);
  //       //console.log("tenure_of_loan_month", tenure_of_loan_month)
  //       let interest_per_month = (Number(this.data.RATE_OF_INTEREST) / Number(installmentFrequency)) / 100;

  //       let emi = (principle_amount * interest_per_month * Math.pow((1 + interest_per_month), tenure_of_loan_month)) / (Math.pow((1 + interest_per_month), (tenure_of_loan_month)) - 1);

  //       //console.log("emi ", emi)
  //       //console.log("data", this.data)
  //       this.data.EMI_AMOUNT = Math.round(emi);
  //     }
  //     else {
  //       let emi = this.data.SANCTION_AMOUNT / this.data.INSTALLMENT_COUNT;
  //       this.data.EMI_AMOUNT = Math.round(emi);
  //     }


  //   }
  // }


  claculate2() {
    if (this.data.RATE_OF_INTEREST && this.data.TERM_OF_LOAN && this.data.TYPE_OF_INSTALLMENT && this.data.SANCTION_AMOUNT) {

      var terdata = this.termdata.filter(
        (termid) => termid.ID == this.data.TERM_OF_LOAN
      );
      var name = terdata[0]["NAME"];
      var d = name.split("(");
      let year;
      // if (this.data.TERM_OF_LOAN > 5) {
      //   year = Number(d[1].substr(0, 2));
      // } else {
      //   year = Number(d[1].substr(0, 1));
      // }

      if (this.data.TERM_ID > 5 && this.data.TERM_ID < 9) {
        year = Number(d[1].substr(0, 2));
      } else if (this.data.TERM_ID == 9) {
        year = Number(d[1].substr(0, 1));
      }
      else {
        year = Number(d[1].substr(0, 1));
      }

      let installmentFrequency = 1

      let principle_amount = Number(this.data.SANCTION_AMOUNT);



      if (this.data.TYPE_OF_INSTALLMENT == 2) {
        this.data.INSTALLMENT_COUNT = (year * 12) / 1;
        installmentFrequency = 12;
      }


      if (this.data.TYPE_OF_INSTALLMENT == 3) {
        this.data.INSTALLMENT_COUNT = (year * 12) / 3;
        installmentFrequency = 4;
      }


      if (this.data.TYPE_OF_INSTALLMENT == 4) {
        this.data.INSTALLMENT_COUNT = (year * 12) / 6;
        installmentFrequency = 2;
      }


      if (this.data.TYPE_OF_INSTALLMENT == 5) {
        this.data.INSTALLMENT_COUNT = (year * 12) / 12;
        installmentFrequency = 1;
      }


      if (this.data.TYPE_OF_INSTALLMENT == 6) {
        this.data.INSTALLMENT_COUNT = (year * 12) / 3;
        installmentFrequency = 4;
      }


      if (this.data.TYPE_OF_INSTALLMENT == 10) {
        this.data.INSTALLMENT_COUNT = 1;
        installmentFrequency = 1;
      }

      if (this.data.TYPE_OF_INSTALLMENT == 7) {
        this.data.INSTALLMENT_COUNT = (year * 12) / 6;
        installmentFrequency = 2;
      }


      if (this.data.TYPE_OF_INSTALLMENT == 8) {
        this.data.INSTALLMENT_COUNT = (year * 12) / 12;
        installmentFrequency = 1;
      }


      if (this.data.TYPE_OF_INSTALLMENT == 11) {
        this.data.INSTALLMENT_COUNT = (year * 12) / 24;
        installmentFrequency = 1;
      }


      if (this.data.TYPE_OF_INSTALLMENT == 12) {
        this.data.INSTALLMENT_COUNT = (year * 12) / 36;
        installmentFrequency = 1;
      }

      if (this.data.LOAN_TYPE_ID == 5 || this.data.LOAN_TYPE_ID == 7) {
        let tenure_of_loan_month = Number(this.data.INSTALLMENT_COUNT);
        //console.log("tenure_of_loan_month", tenure_of_loan_month)
        let interest_per_month = (Number(this.data.RATE_OF_INTEREST) / Number(installmentFrequency)) / 100;

        let emi = (principle_amount * interest_per_month * Math.pow((1 + interest_per_month), tenure_of_loan_month)) / (Math.pow((1 + interest_per_month), (tenure_of_loan_month)) - 1);

        //console.log("emi ", emi)
        //console.log("data", this.data)
        this.data.EMI_AMOUNT = Math.round(emi);
      }
      else {
        let emi = this.data.SANCTION_AMOUNT / this.data.INSTALLMENT_COUNT;
        this.data.EMI_AMOUNT = Math.round(emi);
      }


    }
  }




  calcInstallments3(event) {
    this.data.TERM_OF_LOAN = event;


    if (this.data.TERM_OF_LOAN != undefined && this.data.TERM_OF_LOAN != 0) {
      var terdata = this.termdata.filter(
        (termid) => termid.ID == this.data.TERM_OF_LOAN
      );
      var name = terdata[0]["NAME"];
      var d = name.split("(");
      let year;
      if (this.data.TERM_OF_LOAN > 5) {
        year = Number(d[1].substr(0, 2));
      } else {
        year = Number(d[1].substr(0, 1));
      }
      //console.log("year", year);

      if (this.data.TYPE_OF_INSTALLMENT == 2)
        this.data.INSTALLMENT_COUNT = (year * 12) / 1;
      this.data.EMI_AMOUNT =
        this.data.SANCTION_AMOUNT / this.data.INSTALLMENT_COUNT;

      if (this.data.TYPE_OF_INSTALLMENT == 3)
        this.data.INSTALLMENT_COUNT = (year * 12) / 3;
      this.data.EMI_AMOUNT =
        this.data.SANCTION_AMOUNT / this.data.INSTALLMENT_COUNT;

      if (this.data.TYPE_OF_INSTALLMENT == 4)
        this.data.INSTALLMENT_COUNT = (year * 12) / 6;
      this.data.EMI_AMOUNT =
        this.data.SANCTION_AMOUNT / this.data.INSTALLMENT_COUNT;

      if (this.data.TYPE_OF_INSTALLMENT == 5)
        this.data.INSTALLMENT_COUNT = (year * 12) / 12;
      this.data.EMI_AMOUNT =
        this.data.SANCTION_AMOUNT / this.data.INSTALLMENT_COUNT;

      if (this.data.TYPE_OF_INSTALLMENT == 6)
        this.data.INSTALLMENT_COUNT = (year * 12) / 3;
      this.data.EMI_AMOUNT =
        this.data.SANCTION_AMOUNT / this.data.INSTALLMENT_COUNT;

      if (this.data.TYPE_OF_INSTALLMENT == 10)
        this.data.INSTALLMENT_COUNT = 1;
      this.data.EMI_AMOUNT =
        this.data.SANCTION_AMOUNT / this.data.INSTALLMENT_COUNT;

      if (this.data.TYPE_OF_INSTALLMENT == 7)
        this.data.INSTALLMENT_COUNT = (year * 12) / 6;
      this.data.EMI_AMOUNT =
        this.data.SANCTION_AMOUNT / this.data.INSTALLMENT_COUNT;

      if (this.data.TYPE_OF_INSTALLMENT == 8)
        this.data.INSTALLMENT_COUNT = (year * 12) / 12;
      this.data.EMI_AMOUNT =
        this.data.SANCTION_AMOUNT / this.data.INSTALLMENT_COUNT;

      if (this.data.TYPE_OF_INSTALLMENT == 11)
        this.data.INSTALLMENT_COUNT = (year * 12) / 24;
      this.data.EMI_AMOUNT =
        this.data.SANCTION_AMOUNT / this.data.INSTALLMENT_COUNT;

      if (this.data.TYPE_OF_INSTALLMENT == 12)
        this.data.INSTALLMENT_COUNT = (year * 12) / 36;
      this.data.EMI_AMOUNT =
        this.data.SANCTION_AMOUNT / this.data.INSTALLMENT_COUNT;

      this.data.INSTALLMENT_COUNT = Math.ceil(this.data.INSTALLMENT_COUNT);
      this.data.EMI_AMOUNT = Math.ceil(this.data.EMI_AMOUNT);
      // //console.log(this.data.INSTALLMENT_COUNT);
      //console.log(this.data.INSTALLMENT_AMOUNT);
    } else {
      this.data.INSTALLMENT_COUNT = 0;
    }
  }


  // save() {
  //   console.log("signature : ",this.data.SIGNATURE);
  //   if (this.STATUS == 'F' || this.STATUS == 'R') {
  //     this.data.SANCTION_FILE = ''
  //     console.log("Remark : ",this.REMARKS);

  //     if (this.STATUS == 'R') {
  //       var nextStageId = 6
  //     } else {
  //       var nextStageId = 8
  //     }
  //     if (this.REMARKS != undefined && this.REMARKS != '') {

  //       this.isButtonSpinning = true
  //       // //console.log(nextStageId, this.data.ID)
  //       this.api.updateStatus(this.data.CURRENT_STAGE_ID, nextStageId, " ", this.data.ID, 0)
  //         .subscribe(successCode => {
  //           // //console.log(successCode)
  //           this.isButtonSpinning = false

  //           if (successCode['code'] == "200") {
  //             if (this.STATUS == 'R') {
  //               var LOG_ACTION = 'Proposal has rejected by Board '

  //               var DESCRIPTION = sessionStorage.getItem('userName') + ' has marked proposal' + this.data['LOAN_KEY'] + ' as rejected on behalf of board and given remark -' + this.REMARKS
  //               var LOG_TYPE = 'I'
  //               this.api.proposalLogInformation(this.data.ID, this.data.CURRENT_STAGE_ID, 6, LOG_ACTION, Number(this.userId), DESCRIPTION, LOG_TYPE)
  //                 .subscribe(successCode => {
  //                   if (successCode['code'] == "200") {
  //                   }
  //                 });
  //                 this.close()
  //             }
  //             if (this.STATUS == 'F') {
  //               var LOG_ACTION = 'Proposal resent to refill infomration'

  //               var DESCRIPTION = sessionStorage.getItem('userName') + ' has sent the proposal' + this.data['LOAN_KEY'] + ' to refill with remark -' + this.REMARKS
  //               var LOG_TYPE = 'I'
  //               this.api.proposalLogInformation(this.data.ID, this.data.CURRENT_STAGE_ID, 8, LOG_ACTION, Number(this.userId), DESCRIPTION, LOG_TYPE)
  //                 .subscribe(successCode => {
  //                   if (successCode['code'] == "200") {
  //                   }
  //                 });

  //             }
  //             // this.drawerClose()
  //             this.logtext = 'FinalApproval  - Proposal Rejected  form - SUCCESS ' + "Stage Id" + nextStageId + JSON.stringify(this.data) + " KEYWORD [U - ApplicantDocument ]";
  //             this.api.addLog('A', this.logtext, this.api.emailId)
  //               .subscribe(successCode => {
  //                 if (successCode['code'] == "200") {
  //                   // //console.log(successCode);
  //                 }
  //                 else {
  //                   // //console.log(successCode);

  //                 }
  //               });

  //             this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
  //             this.userActivityLogData.ACTIVITY_DETAILS = " FinalApproval  -   Proposal Rejected  " + "Stage Id" + nextStageId + JSON.stringify(this.data)
  //             this.userActivityLogData.ACTIVITY_TIME = new Date()
  //             this.api.createUserActivityLog(this.userActivityLogData)
  //               .subscribe(successCode => {
  //                 if (successCode['code'] == "200") {
  //                   // //console.log(successCode);
  //                 }
  //                 else {
  //                   // //console.log(successCode);


  //                 }
  //               });


  //           }
  //           else {

  //             this.isButtonSpinning = false

  //             this.logtext = ' FinalApproval  -  Proposal Rejected  form - ERROR - ' + "Stage Id" + nextStageId + "Json" + JSON.stringify(this.data) + " KEYWORD [U - JoinedBranch ]";
  //             this.api.addLog('A', this.logtext, this.api.emailId)
  //               .subscribe(successCode => {
  //                 if (successCode['code'] == "200") {
  //                   // //console.log(successCode);
  //                 }
  //                 else {
  //                   // //console.log(successCode);


  //                 }
  //               });
  //             this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
  //             this.userActivityLogData.ACTIVITY_DETAILS = " FinalApproval  -  Proposal Rejected  Failed" + "Stage Id" + nextStageId + JSON.stringify(this.data)
  //             this.userActivityLogData.ACTIVITY_TIME = new Date()
  //             this.api.createUserActivityLog(this.userActivityLogData)
  //               .subscribe(successCode => {
  //                 if (successCode['code'] == "200") {
  //                   // //console.log(successCode);
  //                 }
  //                 else {
  //                   // //console.log(successCode);
  //                 }
  //               });
  //             this.message.error(this.api.translate.instant('common.message.error.failed'), "");

  //             this.isButtonSpinning = false

  //           }
  //         });
  //     } else {
  //     } this.message.error(this.api.translate.instant('common.message.error.remarkempty'), "");
  //   } else {
  //     if (this.data.SANCTION_DATE != undefined && this.data.SANCTION_DATE != '' &&
  //       this.data.RESOLUTION_NO != undefined && this.data.RESOLUTION_NO != 0 &&
  //       this.data.RATE_OF_INTEREST != undefined &&
  //       this.data.SANCTION_AMOUNT != undefined && this.data.SANCTION_AMOUNT != 0 &&
  //       this.data.SIGNATURE != undefined && this.data.SIGNATURE != ''
  //     ) {
  //       if (this.data.SANCTION_DATE[0] >= 0 && this.data.SANCTION_DATE[0] <= 9 && this.data.SANCTION_DATE[1] >= 0 && this.data.SANCTION_DATE[1] <= 9 && this.data.SANCTION_DATE[3] >= 0 && this.data.SANCTION_DATE[3] <= 9 && this.data.SANCTION_DATE[4] >= 0 && this.data.SANCTION_DATE[4] <= 9 && this.data.SANCTION_DATE[9] >= 0 && this.data.SANCTION_DATE[9] <= 9 && this.data.SANCTION_DATE[8] >= 0 && this.data.SANCTION_DATE[8] <= 9 && this.data.SANCTION_DATE[7] >= 0 && this.data.SANCTION_DATE[7] <= 9 && this.data.SANCTION_DATE[6] >= 0 && this.data.SANCTION_DATE[6] <= 9) {

  //         var conformedPhoneNumber = conformToMask(
  //           this.data.SANCTION_DATE,
  //           this.mask,
  //           { guide: false }
  //         )
  //         const str = conformedPhoneNumber.conformedValue.split('/');

  //         const year = Number(str[2]);
  //         const month = Number(str[1]) - 1;
  //         const dates = Number(str[0]);

  //         this.converted = new Date(year, month, dates)


  //         // if (this.converted <= new Date()) {
  //           this.data.SANCTION_DATE = this.datePipe.transform(this.converted, 'yyyy-MM-dd');
  //           this.REMARKS = ''
  //           if (this.fileDataFile1) {
  //             var fileExt = this.fileDataFile1.name.split('.').pop();
  //             this.api.onUploadNewMethod(this.fileDataFile1, fileExt, this.api.sanctionFkey)
  //               .subscribe(successCode => {
  //                 if (successCode['code'] == 200) {
  //                   let lkey = successCode['data'][0]['L_KEY']
  //                   this.data.SANCTION_FILE = lkey;
  //                   this.saveData();
  //                 }
  //                 else {
  //                   //console.log(successCode)
  //                 }
  //               });
  //           }
  //           else {
  //             if (this.fileDataFile1 == null)
  //               this.message.error(this.api.translate.instant('basicinfo.m19'), "");
  //           }
  //         // } else {

  //         //   this.message.error('Sanction Date cannot be in the future', '');
  //         // }
  //       }
  //       else {
  //         this.message.error(this.api.translate.instant('basicinfo.dateerror'), "")
  //       }
  //     } else {
  //       this.message.error(this.api.translate.instant('common.message.error.emptyinfo'), "");
  //     }


  //   }

  // }

  saveRefill() {
    let nextStageId = 8
    let BRANCH_OPINION_TEXT = ''
    // ////console.log(nextStageId, this.data.ID)
    this.api.updateStatus(this.data.CURRENT_STAGE_ID, nextStageId, BRANCH_OPINION_TEXT, this.data.ID, 0, this.data.REJECTNOTE1)
      .subscribe(successCode => {
        // ////console.log(successCode)
        this.isButtonSpinning = false

        if (successCode['code'] == "200") {

          this.close()
          // localStorage.setItem('remark',this.BRANCH_OPINION_TEXT)

          // //console.log(sessionStorage.setItem('remark',this.BRANCH_OPINION_TEXT),'')
          var LOG_ACTION = 'Proposal resent to refill infomration'

          var DESCRIPTION = sessionStorage.getItem('userName') + ' has sent the proposal' + this.data['LOAN_KEY'] + ' to refill with remark -' + this.REMARKS
          var LOG_TYPE = 'I'
          this.api.proposalLogInformation(this.data.ID, this.data.CURRENT_STAGE_ID, 8, LOG_ACTION, Number(this.userId), DESCRIPTION, LOG_TYPE)
            .subscribe(successCode => {
              if (successCode['code'] == "200") {
              }
            });

          // this.drawerClose()
          this.logtext = 'SubmitForScrutiny  - Submit For Refill  form - SUCCESS ' + "Stage Id" + nextStageId + JSON.stringify(this.data) + " KEYWORD [U - ApplicantDocument ]";
          this.api.addLog('A', this.logtext, this.api.emailId)
            .subscribe(successCode => {
              if (successCode['code'] == "200") {
                //console.log(successCode, "hieee");
              }
              else {
                // ////console.log(successCode);

              }
            });

          this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
          this.userActivityLogData.ACTIVITY_DETAILS = " SubmitForScrutiny  -   Submit For Refill  " + "Stage Id" + nextStageId + JSON.stringify(this.data)
          this.userActivityLogData.ACTIVITY_TIME = new Date()
          this.api.createUserActivityLog(this.userActivityLogData)
            .subscribe(successCode => {
              if (successCode['code'] == "200") {
                // ////console.log(successCode);
              }
              else {
                // ////console.log(successCode);


              }
            });
          this.message.success(this.api.translate.instant('common.message.success.addinfo'), "");
          this.fsubmit.emit()

        }
        else {

          this.isButtonSpinning = false

          this.logtext = ' SubmitForScrutiny  -  Submit For Refill  form - ERROR - ' + "Stage Id" + nextStageId + "Json" + JSON.stringify(this.data) + " KEYWORD [U - JoinedBranch ]";
          this.api.addLog('A', this.logtext, this.api.emailId)
            .subscribe(successCode => {
              if (successCode['code'] == "200") {
                // ////console.log(successCode);
              }
              else {
                // ////console.log(successCode);


              }
            });
          this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
          this.userActivityLogData.ACTIVITY_DETAILS = " SubmitForScrutiny  -  Submit For Refill  Failed" + "Stage Id" + nextStageId + JSON.stringify(this.data)
          this.userActivityLogData.ACTIVITY_TIME = new Date()
          this.api.createUserActivityLog(this.userActivityLogData)
            .subscribe(successCode => {
              if (successCode['code'] == "200") {
                // ////console.log(successCode);
              }
              else {
                // ////console.log(successCode);
              }
            });
          this.message.error(this.api.translate.instant('common.message.error.failed'), "");

          this.isButtonSpinning = false

        }
      });
  }

  // saveRefill() {
  //   let nextStageId = 8
  //   let BRANCH_OPINION_TEXT=''
  //   // //console.log(nextStageId, this.data.ID)
  //   this.api.updateStatus(this.data.CURRENT_STAGE_ID, nextStageId, BRANCH_OPINION_TEXT, this.data.ID, 0)
  //     .subscribe(successCode => {
  //       // //console.log(successCode)
  //       this.isButtonSpinning = false

  //       if (successCode['code'] == "200") {

  //         this.close()
  //         // localStorage.setItem('remark',this.BRANCH_OPINION_TEXT)

  //         // console.log(sessionStorage.setItem('remark',this.BRANCH_OPINION_TEXT),'')
  //           var LOG_ACTION='Proposal resent to refill infomration'

  //           var DESCRIPTION = sessionStorage.getItem('userName') + ' has sent the proposal' + this.data['LOAN_KEY'] +' to refill with remark -'+this.REMARKS
  //           var LOG_TYPE = 'I'
  //           this.api.proposalLogInformation(this.data.ID, this.data.CURRENT_STAGE_ID,8, LOG_ACTION, Number(this.userId), DESCRIPTION, LOG_TYPE)
  //             .subscribe(successCode => {
  //               if (successCode['code'] == "200") {
  //               }
  //             });

  //         // this.drawerClose()
  //         this.logtext = 'SubmitForScrutiny  - Submit For Refill  form - SUCCESS ' + "Stage Id" + nextStageId + JSON.stringify(this.data) + " KEYWORD [U - ApplicantDocument ]";
  //         this.api.addLog('A', this.logtext, this.api.emailId)
  //           .subscribe(successCode => {
  //             if (successCode['code'] == "200") {
  //               console.log(successCode,"hieee");
  //             }
  //             else {
  //               // //console.log(successCode);

  //             }
  //           });

  //         this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
  //         this.userActivityLogData.ACTIVITY_DETAILS = " SubmitForScrutiny  -   Submit For Refill  " + "Stage Id" + nextStageId + JSON.stringify(this.data)
  //         this.userActivityLogData.ACTIVITY_TIME = new Date()
  //         this.api.createUserActivityLog(this.userActivityLogData)
  //           .subscribe(successCode => {
  //             if (successCode['code'] == "200") {
  //               // //console.log(successCode);
  //             }
  //             else {
  //               // //console.log(successCode);


  //             }
  //           });
  //           this.message.success(this.api.translate.instant('common.message.success.addinfo'), "");
  //           this.fsubmit.emit()

  //       }
  //       else {

  //         this.isButtonSpinning = false

  //         this.logtext = ' SubmitForScrutiny  -  Submit For Refill  form - ERROR - ' + "Stage Id" + nextStageId + "Json" + JSON.stringify(this.data) + " KEYWORD [U - JoinedBranch ]";
  //         this.api.addLog('A', this.logtext, this.api.emailId)
  //           .subscribe(successCode => {
  //             if (successCode['code'] == "200") {
  //               // //console.log(successCode);
  //             }
  //             else {
  //               // //console.log(successCode);


  //             }
  //           });
  //         this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
  //         this.userActivityLogData.ACTIVITY_DETAILS = " SubmitForScrutiny  -  Submit For Refill  Failed" + "Stage Id" + nextStageId + JSON.stringify(this.data)
  //         this.userActivityLogData.ACTIVITY_TIME = new Date()
  //         this.api.createUserActivityLog(this.userActivityLogData)
  //           .subscribe(successCode => {
  //             if (successCode['code'] == "200") {
  //               // //console.log(successCode);
  //             }
  //             else {
  //               // //console.log(successCode);
  //             }
  //           });
  //         this.message.error(this.api.translate.instant('common.message.error.failed'), "");

  //         this.isButtonSpinning = false

  //       }
  //     });
  // }




  // saveData() {
  //   if (this.data.SANCTION_FILE.trim() != '') {
  //     this.isButtonSpinning = true
  //     let nextStageId = 12
  //     // //console.log(nextStageId, this.data.ID)
  //     this.api.passToMainBranch2(this.data.SIGNATURE,this.data.COMMITTEE_NO,this.data.AMOUNT_IN_WORDS,this.data.TERM_OF_LOAN,
  //       this.data.TYPE_OF_INSTALLMENT,this.data.EMI_AMOUNT, this.data.RESOLUTION_NO, this.data.RATE_OF_INTEREST,
  //        this.data.SANCTION_DATE, this.data.SANCTION_AMOUNT, this.data.ID, this.data.CURRENT_STAGE_ID,
  //         nextStageId, this.REMARKS, Number(this.userId), this.data.PROPOSAL_FILE, this.data.SANCTION_FILE,this.data.MOROTORIUM,this.data.LOAN_RELEASE_DATE,this.data.DISBURSED_AMOUNT,this.data.SANCTION_AMOUNT_IN_WORDS,this.data.LOAN_AMOUNT_IN_WORDSS,this.data.LOAN_AMOUNT_IN_WORDS,this.data.HAND_WRITTEN_AMT_IN_WORDS2)
  //       .subscribe(successCode => {
  //         // //console.log(successCode)
  //         this.isButtonSpinning = false
  //         if (successCode['code'] == "200") {
  //           // this.drawerClose()
  //           this.logtext = 'SubmitProposal - Submit Proposal form - SUCCESS ' + "Stage Id" + nextStageId + JSON.stringify(this.data) + " KEYWORD [U - ApplicantDocument ]";
  //           this.api.addLog('A', this.logtext, this.api.emailId)
  //             .subscribe(successCode => {
  //               if (successCode['code'] == "200") {
  //                 // //console.log(successCode);
  //               }
  //               else {
  //                 // //console.log(successCode);

  //               }
  //             });

  //           this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
  //           this.userActivityLogData.ACTIVITY_DETAILS = " SubmitProposal -   Submit Proposal " + "Stage Id" + nextStageId + JSON.stringify(this.data)
  //           this.userActivityLogData.ACTIVITY_TIME = new Date()
  //           this.api.createUserActivityLog(this.userActivityLogData)
  //             .subscribe(successCode => {
  //               if (successCode['code'] == "200") {
  //                 // //console.log(successCode);
  //               }
  //               else {
  //                 // //console.log(successCode);


  //               }
  //             });
  //           this.message.success(this.api.translate.instant('common.message.success.addinfo'), "");
  //           this.close()
  //         }
  //         else {

  //           this.isButtonSpinning = false

  //           this.logtext = ' SubmitProposal -  Submit Proposal form - ERROR - ' + "Stage Id" + nextStageId + "Json" + JSON.stringify(this.data) + " KEYWORD [U - JoinedBranch ]";
  //           this.api.addLog('A', this.logtext, this.api.emailId)
  //             .subscribe(successCode => {
  //               if (successCode['code'] == "200") {
  //                 // //console.log(successCode);
  //               }
  //               else {
  //                 // //console.log(successCode);


  //               }
  //             });
  //           this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
  //           this.userActivityLogData.ACTIVITY_DETAILS = " SubmitProposal -  Submit Proposal Failed" + "Stage Id" + nextStageId + JSON.stringify(this.data)
  //           this.userActivityLogData.ACTIVITY_TIME = new Date()
  //           this.api.createUserActivityLog(this.userActivityLogData)
  //             .subscribe(successCode => {
  //               if (successCode['code'] == "200") {
  //                 // //console.log(successCode);
  //               }
  //               else {
  //                 // //console.log(successCode);
  //               }
  //             });
  //           this.message.error(this.api.translate.instant('common.message.error.failed'), "");

  //           this.isButtonSpinning = false

  //         }
  //       });
  //   } else {
  //     this.message.error(this.api.translate.instant('passtomainbranch.message1'), "");
  //   }
  // }

  // saveData() {
  //   if ((this.data.SANCTION_FILE?.trim() || '') !== '') {
  //     this.isButtonSpinning = true
  //     let nextStageId = 21
  //     // ////console.log(nextStageId, this.data.ID)
  //     this.api.passToMainBranch2(this.data.SIGNATURE, this.data.COMMITTEE_NO, this.data.AMOUNT_IN_WORDS, this.data.TERM_OF_LOAN,
  //       this.data.TYPE_OF_INSTALLMENT, this.data.EMI_AMOUNT, this.data.RESOLUTION_NO, this.data.RATE_OF_INTEREST,
  //       this.data.SANCTION_DATE, this.data.SANCTION_AMOUNT, this.data.ID, this.data.CURRENT_STAGE_ID,
  //       nextStageId, this.REMARKS, Number(this.userId), this.data.PROPOSAL_FILE, this.data.SANCTION_FILE, this.data.MOROTORIUM, this.data.MEETING_NO, this.data.LOAN_RELEASE_DATE, this.data.DISBURSED_AMOUNT, this.data.LOAN_AMOUNT_IN_WORDS, this.data.LOAN_AMOUNT_IN_WORDSS, this.data.INSTALLMENT_COUNT, this.data.HAND_WRITTEN_AMT_IN_WORDS2, this.data.WRITTEN_TOTALAMT_WORDS, this.data.ACCOUNT_NO, this.data.REF_NO, this.data.REMARK)
  //       .subscribe(successCode => {
  //         // ////console.log(successCode)
  //         this.isButtonSpinning = false
  //         if (successCode['code'] == "200") {
  //           // this.drawerClose()
  //           this.logtext = 'SubmitProposal - Submit Proposal form - SUCCESS ' + "Stage Id" + nextStageId + JSON.stringify(this.data) + " KEYWORD [U - ApplicantDocument ]";
  //           this.api.addLog('A', this.logtext, this.api.emailId)
  //             .subscribe(successCode => {
  //               if (successCode['code'] == "200") {
  //                 // ////console.log(successCode);
  //               }
  //               else {
  //                 // ////console.log(successCode);

  //               }
  //             });

  //           this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
  //           this.userActivityLogData.ACTIVITY_DETAILS = " SubmitProposal -   Submit Proposal " + "Stage Id" + nextStageId + JSON.stringify(this.data)
  //           this.userActivityLogData.ACTIVITY_TIME = new Date()
  //           this.api.createUserActivityLog(this.userActivityLogData)
  //             .subscribe(successCode => {
  //               if (successCode['code'] == "200") {
  //                 // ////console.log(successCode);
  //               }
  //               else {
  //                 // ////console.log(successCode);


  //               }
  //             });
  //           this.message.success(this.api.translate.instant('common.message.success.addinfo'), "");
  //           this.close()
  //         }
  //         else {

  //           this.isButtonSpinning = false

  //           this.logtext = ' SubmitProposal -  Submit Proposal form - ERROR - ' + "Stage Id" + nextStageId + "Json" + JSON.stringify(this.data) + " KEYWORD [U - JoinedBranch ]";
  //           this.api.addLog('A', this.logtext, this.api.emailId)
  //             .subscribe(successCode => {
  //               if (successCode['code'] == "200") {
  //                 // ////console.log(successCode);
  //               }
  //               else {
  //                 // ////console.log(successCode);


  //               }
  //             });
  //           this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
  //           this.userActivityLogData.ACTIVITY_DETAILS = " SubmitProposal -  Submit Proposal Failed" + "Stage Id" + nextStageId + JSON.stringify(this.data)
  //           this.userActivityLogData.ACTIVITY_TIME = new Date()
  //           this.api.createUserActivityLog(this.userActivityLogData)
  //             .subscribe(successCode => {
  //               if (successCode['code'] == "200") {
  //                 // ////console.log(successCode);
  //               }
  //               else {
  //                 // ////console.log(successCode);
  //               }
  //             });
  //           this.message.error(this.api.translate.instant('common.message.error.failed'), "");

  //           this.isButtonSpinning = false

  //         }
  //       });
  //   } else {
  //     this.message.error(this.api.translate.instant('passtomainbranch.message1'), "");
  //   }
  // }


  saveData() {
  // File upload use होत नाही म्हणून SANCTION_FILE default रिकामं ठेवा
  this.data.SANCTION_FILE = this.data.SANCTION_FILE || '';

  this.isButtonSpinning = true;
  let nextStageId = 21;

  this.api.passToMainBranch2(
    this.data.SIGNATURE, this.data.COMMITTEE_NO, this.data.AMOUNT_IN_WORDS,
    this.data.TERM_OF_LOAN, this.data.TYPE_OF_INSTALLMENT, this.data.EMI_AMOUNT,
    this.data.RESOLUTION_NO, this.data.RATE_OF_INTEREST, this.data.SANCTION_DATE,
    this.data.SANCTION_AMOUNT, this.data.ID, this.data.CURRENT_STAGE_ID,
    nextStageId, this.REMARKS, Number(this.userId), this.data.PROPOSAL_FILE,
    this.data.SANCTION_FILE, this.data.MOROTORIUM, this.data.MEETING_NO,
    this.data.LOAN_RELEASE_DATE, this.data.DISBURSED_AMOUNT,
    this.data.LOAN_AMOUNT_IN_WORDS, this.data.LOAN_AMOUNT_IN_WORDSS,
    this.data.INSTALLMENT_COUNT, this.data.HAND_WRITTEN_AMT_IN_WORDS2,
    this.data.WRITTEN_TOTALAMT_WORDS, this.data.ACCOUNT_NO, this.data.REF_NO,
    this.data.REMARK
  ).subscribe(successCode => {
    this.isButtonSpinning = false;

    if (successCode['code'] == "200") {
      this.message.success(this.api.translate.instant('common.message.success.addinfo'), "");
      this.close();
    } else {
      this.message.error(this.api.translate.instant('common.message.error.failed'), "");
    }
  });
}



  


  saveOnlyWithoutStageChange() {
    if (this.data.SANCTION_FILE?.trim() != '') {
      this.isButtonSpinning = true;

      let nextStageId = this.data.CURRENT_STAGE_ID; // No Stage change

      this.api.passToMainBranch2(
        this.data.SIGNATURE,
        this.data.COMMITTEE_NO,
        this.data.AMOUNT_IN_WORDS,
        this.data.TERM_OF_LOAN,
        this.data.TYPE_OF_INSTALLMENT,
        this.data.EMI_AMOUNT,
        this.data.RESOLUTION_NO,
        this.data.RATE_OF_INTEREST,
        this.data.SANCTION_DATE,
        this.data.SANCTION_AMOUNT,
        this.data.ID,
        this.data.CURRENT_STAGE_ID,
        nextStageId, // stage same
        this.REMARKS,
        Number(this.userId),
        this.data.PROPOSAL_FILE,
        this.data.SANCTION_FILE,
        this.data.MOROTORIUM,
        this.data.MEETING_NO,
        this.data.LOAN_RELEASE_DATE,
        this.data.DISBURSED_AMOUNT,
        this.data.LOAN_AMOUNT_IN_WORDS,
        this.data.LOAN_AMOUNT_IN_WORDSS,
        this.data.INSTALLMENT_COUNT,
        this.data.HAND_WRITTEN_AMT_IN_WORDS2,
        this.data.WRITTEN_TOTALAMT_WORDS,
        this.data.ACCOUNT_NO,
        this.data.REF_NO,
        this.data.REMARK
      ).subscribe(successCode => {
        this.isButtonSpinning = false;
        if (successCode['code'] == "200") {
          this.message.success('Sanction info saved successfully (no stage change)', "");
          this.close();
        } else {
          this.message.error('Save failed', "");
        }
      });
    } else {
      this.message.error(this.api.translate.instant('passtomainbranch.message1'), "");
    }
  }


  close() {
    this.drawerClose()
  }



  AmounttoWords(event: number) {
    this.data.LOAN_AMOUNT = event;

    // this.Amount = event;
    // let words = toWords.convert( this.Amount, { currency: true });
    if (this.data.LOAN_AMOUNT == null || this.data.LOAN_AMOUNT == 0) {
      this.data.LOAN_AMOUNT_IN_WORDS = "";

    } else {
      if (this.browserLang == 'en') {
        this.data.LOAN_AMOUNT_IN_WORDS = toWords.convert(this.data.LOAN_AMOUNT, { currency: true });
      }
      else if (this.browserLang == 'kn') {
        this.data.LOAN_AMOUNT_IN_WORDS = toWords_kn.convert(this.data.LOAN_AMOUNT, { currency: true });
      }
      else if (this.browserLang == 'mr') {
        this.data.LOAN_AMOUNT_IN_WORDS = toWords_mr.convert(this.data.LOAN_AMOUNT, { currency: true });
      }
      console.log(this.data.LOAN_AMOUNT_IN_WORDS, " this.data3.LOAN_AMOUNT_IN_WORDS")
    }






  }


  getword() {
    this.data.LOAN_AMOUNT_IN_WORDS = this.convertNumberToWords(
      this.data.LOAN_AMOUNT
    );
  }
  convertNumberToWords(num) {
    var a = [
      "",
      "One ",
      "Two ",
      "Three ",
      "Four ",
      "Five ",
      "Six ",
      "Seven ",
      "Eight ",
      "Nine ",
      "Ten ",
      "Eleven ",
      "Twelve ",
      "Thirteen ",
      "Fourteen ",
      "Fifteen ",
      "Sixteen ",
      "Seventeen ",
      "Eighteen ",
      "Nineteen ",
    ];
    var b = [
      "",
      "",
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ];
    var n;
    if ((num = num.toString()).length > 9) return "overflow";
    n = ("000000000" + num)
      .substr(-9)
      .match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return;
    var str = "";
    str +=
      n[1] != 0
        ? (a[Number(n[1])] || b[n[1][0]] + " " + a[n[1][1]]) + "Crore "
        : "";
    str +=
      n[2] != 0
        ? (a[Number(n[2])] || b[n[2][0]] + " " + a[n[2][1]]) + "Lakh "
        : "";
    str +=
      n[3] != 0
        ? (a[Number(n[3])] || b[n[3][0]] + " " + a[n[3][1]]) + "Thousand "
        : "";
    str +=
      n[4] != 0
        ? (a[Number(n[4])] || b[n[4][0]] + " " + a[n[4][1]]) + "Hundred "
        : "";
    str +=
      n[5] != 0
        ? (str != "" ? "and " : "") +
        (a[Number(n[5])] || b[n[5][0]] + " " + a[n[5][1]]) +
        "Only "
        : "";
    return str;
  }




  AmounttoWordss(event: number) {
    this.data.LOAN_AMOUNT2 = event;

    // this.Amount = event;
    // let words = toWords.convert( this.Amount, { currency: true });
    if (this.data.LOAN_AMOUNT2 == null || this.data.LOAN_AMOUNT2 == 0) {
      this.data.LOAN_AMOUNT_IN_WORDSS = "";

    } else {
      if (this.browserLang == 'en') {
        this.data.LOAN_AMOUNT_IN_WORDSS = toWords.convert(this.data.LOAN_AMOUNT2, { currency: true });
      }
      else if (this.browserLang == 'kn') {
        this.data.LOAN_AMOUNT_IN_WORDSS = toWords_kn.convert(this.data.LOAN_AMOUNT2, { currency: true });
      }
      else if (this.browserLang == 'mr') {
        this.data.LOAN_AMOUNT_IN_WORDSS = toWords_mr.convert(this.data.LOAN_AMOUNT2, { currency: true });
      }
      console.log(this.data.LOAN_AMOUNT_IN_WORDSS, " this.data3.LOAN_AMOUNT_IN_WORDSS")
    }






  }


  getwords() {
    this.data.LOAN_AMOUNT_IN_WORDSS = this.convertNumberToWordss(
      this.data.LOAN_AMOUNT2
    );
  }
  convertNumberToWordss(num) {
    var a = [
      "",
      "One ",
      "Two ",
      "Three ",
      "Four ",
      "Five ",
      "Six ",
      "Seven ",
      "Eight ",
      "Nine ",
      "Ten ",
      "Eleven ",
      "Twelve ",
      "Thirteen ",
      "Fourteen ",
      "Fifteen ",
      "Sixteen ",
      "Seventeen ",
      "Eighteen ",
      "Nineteen ",
    ];
    var b = [
      "",
      "",
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ];
    var n;
    if ((num = num.toString()).length > 9) return "overflow";
    n = ("000000000" + num)
      .substr(-9)
      .match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return;
    var str = "";
    str +=
      n[1] != 0
        ? (a[Number(n[1])] || b[n[1][0]] + " " + a[n[1][1]]) + "Crore "
        : "";
    str +=
      n[2] != 0
        ? (a[Number(n[2])] || b[n[2][0]] + " " + a[n[2][1]]) + "Lakh "
        : "";
    str +=
      n[3] != 0
        ? (a[Number(n[3])] || b[n[3][0]] + " " + a[n[3][1]]) + "Thousand "
        : "";
    str +=
      n[4] != 0
        ? (a[Number(n[4])] || b[n[4][0]] + " " + a[n[4][1]]) + "Hundred "
        : "";
    str +=
      n[5] != 0
        ? (str != "" ? "and " : "") +
        (a[Number(n[5])] || b[n[5][0]] + " " + a[n[5][1]]) +
        "Only "
        : "";
    return str;
  }
  confirm2() {
    this.onlySave();
  }

  onFileSelectedFile2(event) {
    this.fileData_REPORT_URL2 = <File>event.target.files[0];
  }

  uploadfile() {
    console.log("im in the newupload method", this.data.REJECTNOTE1)
    this.isSpinning3 = true;
    if (this.fileData_REPORT_URL2) {
      var fileExt = this.fileData_REPORT_URL2.name.split('.').pop();
      var lkey = ""
      this.api.onUploadNewMethod(this.fileData_REPORT_URL2, fileExt, this.fkey)
        .subscribe(successCode => {
          if (successCode['code'] == 200) {
            lkey = successCode['data'][0]['L_KEY']
            this.data.REJECTNOTE1 = lkey
            console.log("im in the newupload method", this.data.REJECTNOTE1)
            this.reject()

          }
          else {
          }
        });
    } else {
      this.data.REJECTNOTE1 = " ";

    }

  }
  reject() {
    if (this.STATUS == 'F' || this.STATUS == 'R') {

      //console.log("Remark : ", this.REMARKS);

      if (this.STATUS == 'R') {
        var nextStageId = 6
      } else {
        var nextStageId = 8
      }
      if (this.REMARKS != undefined && this.REMARKS != '') {

        this.isButtonSpinning = true
        // ////console.log(nextStageId, this.data.ID)
        this.api.updateStatus(this.data.CURRENT_STAGE_ID, nextStageId, " ", this.data.ID, 0, this.data.REJECTNOTE1)
          .subscribe(successCode => {
            // ////console.log(successCode)


            if (successCode['code'] == "200") {
              this.isButtonSpinning = false;
              if (this.STATUS == 'R') {
                var LOG_ACTION = 'Proposal has rejected by Board '

                var DESCRIPTION = sessionStorage.getItem('userName') + ' has marked proposal' + this.data['LOAN_KEY'] + ' as rejected on behalf of board and given remark -' + this.REMARKS
                var LOG_TYPE = 'I'
                this.api.proposalLogInformation(this.data.ID, this.data.CURRENT_STAGE_ID, 6, LOG_ACTION, Number(this.userId), DESCRIPTION, LOG_TYPE)
                  .subscribe(successCode => {
                    if (successCode['code'] == "200") {
                    }
                  });

                this.close()

              }
              if (this.STATUS == 'F') {
                var LOG_ACTION = 'Proposal resent to refill infomration'

                var DESCRIPTION = sessionStorage.getItem('userName') + ' has sent the proposal' + this.data['LOAN_KEY'] + ' to refill with remark -' + this.REMARKS
                var LOG_TYPE = 'I'
                this.api.proposalLogInformation(this.data.ID, this.data.CURRENT_STAGE_ID, 8, LOG_ACTION, Number(this.userId), DESCRIPTION, LOG_TYPE)
                  .subscribe(successCode => {
                    if (successCode['code'] == "200") {
                    }
                  });
              }
              // this.drawerClose()
              this.logtext = 'FinalApproval  - Proposal Rejected  form - SUCCESS ' + "Stage Id" + nextStageId + JSON.stringify(this.data) + " KEYWORD [U - ApplicantDocument ]";
              this.api.addLog('A', this.logtext, this.api.emailId)
                .subscribe(successCode => {
                  if (successCode['code'] == "200") {
                    // ////console.log(successCode);
                  }
                  else {
                    // ////console.log(successCode);

                  }
                });

              this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
              this.userActivityLogData.ACTIVITY_DETAILS = " FinalApproval  -   Proposal Rejected  " + "Stage Id" + nextStageId + JSON.stringify(this.data)
              this.userActivityLogData.ACTIVITY_TIME = new Date()
              this.api.createUserActivityLog(this.userActivityLogData)
                .subscribe(successCode => {
                  if (successCode['code'] == "200") {
                    // ////console.log(successCode);
                  }
                  else {
                    // ////console.log(successCode);


                  }
                });


            }
            else {

              this.isButtonSpinning = false

              this.logtext = ' FinalApproval  -  Proposal Rejected  form - ERROR - ' + "Stage Id" + nextStageId + "Json" + JSON.stringify(this.data) + " KEYWORD [U - JoinedBranch ]";
              this.api.addLog('A', this.logtext, this.api.emailId)
                .subscribe(successCode => {
                  if (successCode['code'] == "200") {
                    // ////console.log(successCode);
                  }
                  else {
                    // ////console.log(successCode);


                  }
                });
              this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
              this.userActivityLogData.ACTIVITY_DETAILS = " FinalApproval  -  Proposal Rejected  Failed" + "Stage Id" + nextStageId + JSON.stringify(this.data)
              this.userActivityLogData.ACTIVITY_TIME = new Date()
              this.api.createUserActivityLog(this.userActivityLogData)
                .subscribe(successCode => {
                  if (successCode['code'] == "200") {
                    // ////console.log(successCode);
                  }
                  else {
                    // ////console.log(successCode);
                  }
                });
              this.message.error(this.api.translate.instant('common.message.error.failed'), "");

              this.isButtonSpinning = false

            }
          });
      }
      // else {
      // } this.message.error(this.api.translate.instant('common.message.error.remarkempty'), "");
    }

  }

  getTermDeposit() {
    this.api.getDepositInformation(this.data.ID, 'T').subscribe(
      successCode => {
        if (successCode['code'] == 200) {
          this.termDepositdata = successCode['data'];
          this.formattedEarliestMaturityDate()
        }
      }
    )
  }
  earliestMaturityDueDate(): Date | null {
    if (this.termDepositdata.length === 0) {
      return null;
    }

    let earliestDueDate: Date | null = null;

    this.termDepositdata.forEach(entry => {
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
  formattedEarliestMaturityDate() {
    const earliestMaturityDate = this.earliestMaturityDueDate();
    if (earliestMaturityDate) {
      this.data.MATURITY_DATE = this.formatDate(earliestMaturityDate);
    } else {
      this.data.MATURITY_DATE = null;
    }
  }


  getTermDeposit2() {
    this.api.getDepositInformation(this.data.ID, 'T').subscribe(
      successCode => {
        if (successCode['code'] == 200) {
          this.termDepositdata = successCode['data']
          if (this.termDepositdata && this.termDepositdata.length > 0) {
            // Set data.SANCTION_AMOUNT to 90% of the first ACC_AMOUNT
            this.data.SANCTION_AMOUNT3 = this.calculate90Percent(this.totalIncome1());
            // this.sanctionAmountService.updateSanctionAmount(this.data.SANCTION_AMOUNT3);
            this.data.SANCTION_AMOUNT = this.data.SANCTION_AMOUNT3

          }
        }
      }
    )

  }

  calculate90Percent(amount: number): number {
    const ninetyPercent = 0.9 * amount;

    // Round to two decimal places
    const roundedValue = Math.round(ninetyPercent * 100) / 100;

    return roundedValue;
  }
  totalIncome1() {
    let total6 = 0;
    console.log("im inthe totalincomedepo", this.termDepositdata)

    // for (const amt of this.termDepositdata) {

    //   total6 += parseFloat(amt.ACC_AMOUNT.toString());

    // }
    for (const amt of this.termDepositdata) {
      if (amt.ACC_AMOUNT != null) {  // Check if ACC_AMOUNT is not null or undefined
        total6 += parseFloat(amt.ACC_AMOUNT.toString()) || 0;  // Convert to string, parse as float, and add to total
      }
    }

    return total6;
  }






}

