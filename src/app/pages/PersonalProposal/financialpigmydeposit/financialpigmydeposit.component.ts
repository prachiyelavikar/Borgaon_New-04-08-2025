import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';
import { FRecurringDeposit } from 'src/app/Models/PersonalProposal/FrecurringDeposit';
import { Addressinfo } from 'src/app/Models/PersonalProposal/addressinfo';
import { Extraapplicantinfo } from 'src/app/Models/extraapplicantinfo';
import { ApiService } from 'src/app/Service/api.service';
import { createAutoCorrectedDatePipe } from 'text-mask-addons';

@Component({
  selector: 'app-financialpigmydeposit',
  templateUrl: './financialpigmydeposit.component.html',
  styleUrls: ['./financialpigmydeposit.component.css']
})
export class FinancialpigmydepositComponent implements OnInit {

  @Input() drawerClose8: Function;
  @Input() data5: FRecurringDeposit = new FRecurringDeposit();
  @Input() addressinfoCurrent: Addressinfo;
  pageIndex = 1;

  @Input() PROPOSAL_ID


  @Input() CURRENT_STAGE_ID: number;
  @Input() extraApplicantInformation: Extraapplicantinfo;
  @Output() demo : EventEmitter<boolean> =
  new EventEmitter<boolean>();

  saveCount: number = 0;

  pageSize = 100;
  sortValue: string = "asc";
  sortKey: string = "ID";
  searchText: string = "";
  likeQuery: string = "";
  isSpinning = false;
  bagayat: any;
  jirayat: any;
  logtext: string = ""

  public mask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  pipe = new DatePipe('en-US');
  autoCorrectedDatePipe = createAutoCorrectedDatePipe('dd/mm/yyyy HH:MM')
  roleId = sessionStorage.getItem("roleId");
  constructor(private api: ApiService, private message: NzNotificationService , private datePipe:DatePipe) { }

  ngOnInit(): void {
  }

  close(): void {
    this.drawerClose8();

    this.logtext = 'CLOSED - Extra Info form';
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
 
  setValues() {
    this.data5.ACC_AMOUNT = this.data5.ACC_AMOUNT;
    this.data5.ACC_NO = this.data5.ACC_NO;
    this.data5.PIGMY_AMOUNT1 = this.data5.PIGMY_AMOUNT1;
    
    // this.data4.MATURITY_DUE = this.data4.MATURITY_DUE;
    // this.data.END_DATE = '';
  }

  save(): void {

    if (this.data5.ACC_AMOUNT != undefined && this.data5.ACC_NO != undefined && this.data5.PIGMY_AMOUNT1 != undefined){
    if (this.data5.ID) {
      this.data5.DEPOSIT_TYPE = 'P'
      this.api.updateDepositInformation(this.data5).subscribe(
        successCode => {
          if (successCode['code'] == 200) {
            this.saveCount = 0;
            this.getPigmyAcc();
            this.drawerClose8();
          }
        },
        error => {
          this.saveCount = 0;
        }
      );
    }
    else {
      this.saveCount++;
      if (this.saveCount == 1) {
        this.data5.DEPOSIT_TYPE = 'P'
        this.api.createDepositInformation(this.data5).subscribe(
          successCode => {
            if (successCode['code'] == 200) {
              this.getPigmyAcc();
              this.drawerClose8();
            }
          },
          error => {
            this.saveCount = 0;
          });
      }
    }
  }else{
    this.message.error(this.api.translate.instant('common.message.error.emptyinfo'), "");
  }



 

    
  }


  getPigmyAcc() {
    this.api.getDepositInformation(this.PROPOSAL_ID, 'P').subscribe(
      successCode => {
        if (successCode['code'] == 200) {
          this.data5 = successCode['data'][0]
        }
      }
    )
  }

   
    // save(addNew: boolean): void {
    //   if (this.data4.ACC_AMOUNT != undefined && this.data4.ACC_NO != undefined ){   
    //     if (this.data4.ACC_AMOUNT == 0 || this.data4.ACC_AMOUNT.toString().trim() == "") {
    //       this.message.error("Not Ok",'');
    //     } else {
    //       if (this.data4.ACC_NO.toString().trim() == "") {
    //         this.message.error('Not Ok', "");
    //       } else {
    //         if (this.data4.ACC_NO) {
            
    //           this.demo.emit(false);
    //           this.setValues();
    //           console.log(this.setValues)
    //           if (!addNew)
    //           this.close();
  
    //         } else {
    //           this.message.error(this.api.translate.instant('workorders.message3'), "");
    //         }
    //       }
    //     }
    //   }
    //   else {
    //     this.message.error(this.api.translate.instant('common.message.error.emptyinfo'), "");
    //   }
    // }

  isValidPincode(pincode) {
    const expression = /^[1-9][0-9]{5}/;
    return expression.test(String(pincode).toLowerCase())
  }
  

  setValues2() {
    this.addressinfoCurrent.BUILDING = '';
    this.addressinfoCurrent.DISTRICT = '';
    this.addressinfoCurrent.HOUSE_NO = '';
    this.addressinfoCurrent.LANDMARK = '';
    this.addressinfoCurrent.VILLAGE = '';
    this.addressinfoCurrent.STATE = '';
    this.addressinfoCurrent.TALUKA = '';
    this.addressinfoCurrent.PINCODE = "";
  }

}
