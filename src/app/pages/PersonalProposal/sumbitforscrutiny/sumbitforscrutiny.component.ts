import { DatePipe } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { NzNotificationService } from "ng-zorro-antd";
import { Useractivitylog } from "src/app/Models/Applicant/useractivitylog";
import { RemarkList } from "src/app/Models/PersonalProposal/remarklist";
import { Proposal } from "src/app/Models/proposal";
import { ApiService } from "src/app/Service/api.service";

@Component({
  selector: "app-sumbitforscrutiny",
  templateUrl: "./sumbitforscrutiny.component.html",
  styleUrls: ["./sumbitforscrutiny.component.css"],
})
export class SumbitforscrutinyComponent implements OnInit {
  userActivityLogData: Useractivitylog = new Useractivitylog();
  @Input() data: Proposal;
  @Input() drawerClose: Function;
  isButtonSpinning2 = false;
  @Input() selectedIndex: number;
  @Output() demo: EventEmitter<boolean> = new EventEmitter<boolean>();
  isButtonSpinning = false;
  isSpinning = false;
  @Input() PROPOSAL_ID: number;
  @Input() APPLICANT_ID: number;
  @Input() IndivisualInfotabs = [];
  userId = sessionStorage.getItem("userId");
  logtext = "";
  REMARKS = "";
  @Input() isreject = true;
  @Output() fsubmit = new EventEmitter<string>();
  AMT_INFORMATION: string = "";
  roleId = sessionStorage.getItem("roleId");
  AMOUNT: number = 0;
  BRANCH_OPINION_TEXT = "";
  IS_IDENTITY_CARD_OBTAINED: boolean;
  IS_CHECK_OBTAINED: boolean;
  DOCUMENT_TEXT = "";
  imageSrc;
  imageSrc1;
  images = [];
  fileExt: string = "";
  isSpinning1 = false;
  browserLang = "kn";
  @Input() loanType: number;
  showAdditionalFields: boolean = false;
  isSpinning3 = false;
  REJECTNOTE: string = "";
  fkey = this.api.documentFkey;
  rejectButtonClicked: boolean = false;
  isRejectButtonDisabled: boolean = false;
  fileData_REPORT_URL1;
  CURRENT_STAGE_ID: any;
  remark1 = [];
  dataList12 = [];
  remark: RemarkList = new RemarkList();

  isVisible = false;
  isConfirmLoading = false;
  AGM_ID:number

  constructor(
    private api: ApiService,
    private message: NzNotificationService, private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.browserLang = localStorage.getItem("locale");
    // let filter = " AND PROPOSAL_ID=" + this.PROPOSAL_ID + " AND TYPE='B'"
    // this.api.getAllApplicantExtraInformation(0, 0, 'SEQ_NO', "asc", filter).subscribe(data => {
    //   if (data['count'] > 0) {
    //     this.IndivisualInfotabs = data['data'];
    //     this.checkStatus();
    //   }
    //   else {
    //     this.IndivisualInfotabs = [];
    //     this.checkStatus();
    //   }

    // }, err => {
    //   //console.log(err);
    // });
    this.getdata1();
    this.getAGMList()
    this.getUrl(this.data.PROPOSAL_FILE);
  }


  showModal(): void {
    if(!this.REMARKS){
      this.message.error("Please Fill Remark","")
      return;
    }
    this.isVisible = true;
  }

  handleOk(): void {
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 1000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }


  toggleFieldsVisibility() {
    // Toggle the visibility of additional fields
    this.showAdditionalFields = !this.showAdditionalFields;
    this.rejectButtonClicked = false;
    this.isRejectButtonDisabled = true;

    // Optionally, you can perform additional logic here
  }

  checkStatus() {
    this.isreject = true;
    var data = [];
    data = this.IndivisualInfotabs.filter((object) => {
      return object["IS_APPROVED"] == 0;
    });

    if (data.length == 0) {
      this.isreject = true;
    } else {
      this.isreject = false;
    }
  }
  base64ToArrayBuffer(base64) {
    var binary_string = base64.replace(/\\n/g, "");
    binary_string = window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
  }
  getUrl(url) {
    this.isSpinning1 = true;
    if (url == null) {
      this.message.error(
        this.api.translate.instant("approvedocument.message1"),
        ""
      );
      this.isSpinning1 = false;
    } else {
      this.api.getFile(url).subscribe(
        (data) => {
          this.isSpinning1 = false;
          if (data["code"] == 200) {
            const TYPED_ARRAY = new Uint8Array(
              data["data"]["FILE_DATA"]["data"]
            );
            const STRING_CHAR = TYPED_ARRAY.reduce((data, byte) => {
              return data + String.fromCharCode(byte);
            }, "");
            let base64String = btoa(STRING_CHAR);
            this.fileExt = data["data"]["F_EXT"];

            if (data["data"]["F_EXT"] == "pdf") {
              this.imageSrc = this.base64ToArrayBuffer(base64String);
              this.imageSrc1 = "data:application/pdf;base64," + base64String;
            } else {
              this.imageSrc = "data:image/jpeg;base64," + base64String;
              this.images = [this.imageSrc];
            }
          } else {
            // this.message.error(data['message'], "");
            this.imageSrc = "";
          }
        },
        (err) => {
          //console.log(err);
        }
      );
    }
  }
  // save(status) {
  //   // this.isButtonSpinning = true

  //   if (status == "V") {
  //     this.DOCUMENT_TEXT = "";
  //     this.REMARKS = "";
  //     if (
  //       this.BRANCH_OPINION_TEXT != undefined &&
  //       this.BRANCH_OPINION_TEXT.trim() != ""
  //     ) {
  //       // if (  this.AMOUNT != 0 && this.AMOUNT != undefined) {
  //       let nextStageId = 19;
  //       // //console.log(nextStageId, this.data.ID)
  //       this.api
  //         .updateStatus3(
  //           this.IS_CHECK_OBTAINED,
  //           this.IS_IDENTITY_CARD_OBTAINED,
  //           this.BRANCH_OPINION_TEXT,
  //           this.DOCUMENT_TEXT,
  //           this.data.CURRENT_STAGE_ID,
  //           nextStageId,
  //           this.REMARKS,
  //           this.data.ID,
  //           0
  //         )
  //         .subscribe((successCode) => {
  //           this.rejectButtonClicked = true;
  //           // this.api.updateFillAmount2(this.data.CURRENT_STAGE_ID, ' ', 0,this.data.ID,"B",this.REMARKS )
  //           //   .subscribe(successCode => {
  //           // //console.log(successCode)
  //           this.isButtonSpinning = false;

  //           if (successCode["code"] == "200") {
  //             // localStorage.setItem('remark',this.BRANCH_OPINION_TEXT)

  //             // this.drawerClose()
  //             this.logtext =
  //               "SubmitForScrutiny  - Submit For Scrutiny  form - SUCCESS " +
  //               "Stage Id" +
  //               nextStageId +
  //               JSON.stringify(this.data) +
  //               " KEYWORD [U - ApplicantDocument ]";
  //             this.api
  //               .addLog("A", this.logtext, this.api.emailId)
  //               .subscribe((successCode) => {
  //                 if (successCode["code"] == "200") {
  //                   // //console.log(successCode);
  //                 } else {
  //                   // //console.log(successCode);
  //                 }
  //               });

  //             this.userActivityLogData.USER_ID = Number(
  //               sessionStorage.getItem("userId")
  //             );
  //             this.userActivityLogData.ACTIVITY_DETAILS =
  //               " SubmitForScrutiny  -   Submit For Scrutiny  " +
  //               "Stage Id" +
  //               nextStageId +
  //               JSON.stringify(this.data);
  //             this.userActivityLogData.ACTIVITY_TIME = new Date();
  //             this.api
  //               .createUserActivityLog(this.userActivityLogData)
  //               .subscribe((successCode) => {
  //                 if (successCode["code"] == "200") {
  //                   // //console.log(successCode);
  //                 } else {
  //                   // //console.log(successCode);
  //                 }
  //               });
  //             this.message.success(
  //               this.api.translate.instant("common.message.success.addinfo"),
  //               ""
  //             );
  //             this.fsubmit.emit();
  //           } else {
  //             this.isButtonSpinning = false;

  //             this.logtext =
  //               " SubmitForScrutiny  -  Submit For Scrutiny  form - ERROR - " +
  //               "Stage Id" +
  //               nextStageId +
  //               "Json" +
  //               JSON.stringify(this.data) +
  //               " KEYWORD [U - JoinedBranch ]";
  //             this.api
  //               .addLog("A", this.logtext, this.api.emailId)
  //               .subscribe((successCode) => {
  //                 if (successCode["code"] == "200") {
  //                   // //console.log(successCode);
  //                 } else {
  //                   // //console.log(successCode);
  //                 }
  //               });
  //             this.userActivityLogData.USER_ID = Number(
  //               sessionStorage.getItem("userId")
  //             );
  //             this.userActivityLogData.ACTIVITY_DETAILS =
  //               " SubmitForScrutiny  -  Submit For Scrutiny  Failed" +
  //               "Stage Id" +
  //               nextStageId +
  //               JSON.stringify(this.data);
  //             this.userActivityLogData.ACTIVITY_TIME = new Date();
  //             this.api
  //               .createUserActivityLog(this.userActivityLogData)
  //               .subscribe((successCode) => {
  //                 if (successCode["code"] == "200") {
  //                   // //console.log(successCode);
  //                 } else {
  //                   // //console.log(successCode);
  //                 }
  //               });
  //             this.message.error(
  //               this.api.translate.instant("common.message.error.failed"),
  //               ""
  //             );

  //             this.isButtonSpinning = false;
  //           }
  //         });
  //     } else {
  //       this.message.error(
  //         this.api.translate.instant("common.message.error.emptyinfo"),
  //         ""
  //       );
  //     }
  //   } else {
  //     let nextStageId = 8;
  //     // //console.log(nextStageId, this.data.ID)
  //     this.api
  //       .updateStatus(
  //         this.data.CURRENT_STAGE_ID,
  //         nextStageId,
  //         this.BRANCH_OPINION_TEXT,
  //         this.data.ID,
  //         0,
  //         this.data.REJECTNOTE1
  //       )
  //       .subscribe((successCode) => {
  //         // //console.log(successCode)
  //         this.isButtonSpinning = false;
  //         this.isRejectButtonDisabled = true;

  //         if (successCode["code"] == "200") {
  //           // localStorage.setItem('remark',this.BRANCH_OPINION_TEXT)

  //           // console.log(sessionStorage.setItem('remark',this.BRANCH_OPINION_TEXT),'')
  //           var LOG_ACTION = "Proposal resent to refill infomration";

  //           var DESCRIPTION =
  //             sessionStorage.getItem("userName") +
  //             " has sent the proposal" +
  //             this.data["LOAN_KEY"] +
  //             " to refill with remark -" +
  //             this.REMARKS;
  //           var LOG_TYPE = "I";
  //           this.api
  //             .proposalLogInformation(
  //               this.data.ID,
  //               this.data.CURRENT_STAGE_ID,
  //               8,
  //               LOG_ACTION,
  //               Number(this.userId),
  //               DESCRIPTION,
  //               LOG_TYPE
  //             )
  //             .subscribe((successCode) => {
  //               if (successCode["code"] == "200") {
  //               }
  //             });

  //           // this.drawerClose()
  //           this.logtext =
  //             "SubmitForScrutiny  - Submit For Refill  form - SUCCESS " +
  //             "Stage Id" +
  //             nextStageId +
  //             JSON.stringify(this.data) +
  //             " KEYWORD [U - ApplicantDocument ]";
  //           this.api
  //             .addLog("A", this.logtext, this.api.emailId)
  //             .subscribe((successCode) => {
  //               if (successCode["code"] == "200") {
  //                 console.log(successCode, "hieee");
  //               } else {
  //                 // //console.log(successCode);
  //               }
  //             });

  //           this.userActivityLogData.USER_ID = Number(
  //             sessionStorage.getItem("userId")
  //           );
  //           this.userActivityLogData.ACTIVITY_DETAILS =
  //             " SubmitForScrutiny  -   Submit For Refill  " +
  //             "Stage Id" +
  //             nextStageId +
  //             JSON.stringify(this.data);
  //           this.userActivityLogData.ACTIVITY_TIME = new Date();
  //           this.api
  //             .createUserActivityLog(this.userActivityLogData)
  //             .subscribe((successCode) => {
  //               if (successCode["code"] == "200") {
  //                 // //console.log(successCode);
  //               } else {
  //                 // //console.log(successCode);
  //               }
  //             });
  //           this.message.success(
  //             this.api.translate.instant("common.message.success.addinfo"),
  //             ""
  //           );
  //           this.fsubmit.emit();
  //           this.isRejectButtonDisabled = true;
  //         } else {
  //           this.isButtonSpinning = false;

  //           this.logtext =
  //             " SubmitForScrutiny  -  Submit For Refill  form - ERROR - " +
  //             "Stage Id" +
  //             nextStageId +
  //             "Json" +
  //             JSON.stringify(this.data) +
  //             " KEYWORD [U - JoinedBranch ]";
  //           this.api
  //             .addLog("A", this.logtext, this.api.emailId)
  //             .subscribe((successCode) => {
  //               if (successCode["code"] == "200") {
  //                 // //console.log(successCode);
  //               } else {
  //                 // //console.log(successCode);
  //               }
  //             });
  //           this.userActivityLogData.USER_ID = Number(
  //             sessionStorage.getItem("userId")
  //           );
  //           this.userActivityLogData.ACTIVITY_DETAILS =
  //             " SubmitForScrutiny  -  Submit For Refill  Failed" +
  //             "Stage Id" +
  //             nextStageId +
  //             JSON.stringify(this.data);
  //           this.userActivityLogData.ACTIVITY_TIME = new Date();
  //           this.api
  //             .createUserActivityLog(this.userActivityLogData)
  //             .subscribe((successCode) => {
  //               if (successCode["code"] == "200") {
  //                 // //console.log(successCode);
  //               } else {
  //                 // //console.log(successCode);
  //               }
  //             });
  //           this.message.error(
  //             this.api.translate.instant("common.message.error.failed"),
  //             ""
  //           );

  //           this.isButtonSpinning = false;
  //         }
  //       });
  //   }
  // }

  // SumbitForApprovalALO(status){

  //   if (status == "V") {
  //     this.DOCUMENT_TEXT = "";
  //     this.REMARKS = "";
  //     if (
  //       this.BRANCH_OPINION_TEXT != undefined &&
  //       this.BRANCH_OPINION_TEXT.trim() != ""
  //     ) {
  //       // if (  this.AMOUNT != 0 && this.AMOUNT != undefined) {
  //       let nextStageId = 14;
  //       // //console.log(nextStageId, this.data.ID)
  //       this.api
  //         .updateStatus3(
  //           this.IS_CHECK_OBTAINED,
  //           this.IS_IDENTITY_CARD_OBTAINED,
  //           this.BRANCH_OPINION_TEXT,
  //           this.DOCUMENT_TEXT,
  //           this.data.CURRENT_STAGE_ID,
  //           nextStageId,
  //           this.REMARKS,
  //           this.data.ID,
  //           0
  //         )
  //         .subscribe((successCode) => {
  //           this.rejectButtonClicked = true;
  //           // this.api.updateFillAmount2(this.data.CURRENT_STAGE_ID, ' ', 0,this.data.ID,"B",this.REMARKS )
  //           //   .subscribe(successCode => {
  //           // //console.log(successCode)
  //           this.isButtonSpinning = false;

  //           if (successCode["code"] == "200") {
  //             // localStorage.setItem('remark',this.BRANCH_OPINION_TEXT)

  //             // this.drawerClose()
  //             this.logtext =
  //               "SubmitForScrutiny  - Submit For Scrutiny  form - SUCCESS " +
  //               "Stage Id" +
  //               nextStageId +
  //               JSON.stringify(this.data) +
  //               " KEYWORD [U - ApplicantDocument ]";
  //             this.api
  //               .addLog("A", this.logtext, this.api.emailId)
  //               .subscribe((successCode) => {
  //                 if (successCode["code"] == "200") {
  //                   // //console.log(successCode);
  //                 } else {
  //                   // //console.log(successCode);
  //                 }
  //               });

  //             this.userActivityLogData.USER_ID = Number(
  //               sessionStorage.getItem("userId")
  //             );
  //             this.userActivityLogData.ACTIVITY_DETAILS =
  //               " SubmitForScrutiny  -   Submit For Scrutiny  " +
  //               "Stage Id" +
  //               nextStageId +
  //               JSON.stringify(this.data);
  //             this.userActivityLogData.ACTIVITY_TIME = new Date();
  //             this.api
  //               .createUserActivityLog(this.userActivityLogData)
  //               .subscribe((successCode) => {
  //                 if (successCode["code"] == "200") {
  //                   // //console.log(successCode);
  //                 } else {
  //                   // //console.log(successCode);
  //                 }
  //               });
  //             this.message.success(
  //               this.api.translate.instant("common.message.success.addinfo"),
  //               ""
  //             );
  //             this.fsubmit.emit();
  //           } else {
  //             this.isButtonSpinning = false;

  //             this.logtext =
  //               " SubmitForScrutiny  -  Submit For Scrutiny  form - ERROR - " +
  //               "Stage Id" +
  //               nextStageId +
  //               "Json" +
  //               JSON.stringify(this.data) +
  //               " KEYWORD [U - JoinedBranch ]";
  //             this.api
  //               .addLog("A", this.logtext, this.api.emailId)
  //               .subscribe((successCode) => {
  //                 if (successCode["code"] == "200") {
  //                   // //console.log(successCode);
  //                 } else {
  //                   // //console.log(successCode);
  //                 }
  //               });
  //             this.userActivityLogData.USER_ID = Number(
  //               sessionStorage.getItem("userId")
  //             );
  //             this.userActivityLogData.ACTIVITY_DETAILS =
  //               " SubmitForScrutiny  -  Submit For Scrutiny  Failed" +
  //               "Stage Id" +
  //               nextStageId +
  //               JSON.stringify(this.data);
  //             this.userActivityLogData.ACTIVITY_TIME = new Date();
  //             this.api
  //               .createUserActivityLog(this.userActivityLogData)
  //               .subscribe((successCode) => {
  //                 if (successCode["code"] == "200") {
  //                   // //console.log(successCode);
  //                 } else {
  //                   // //console.log(successCode);
  //                 }
  //               });
  //             this.message.error(
  //               this.api.translate.instant("common.message.error.failed"),
  //               ""
  //             );

  //             this.isButtonSpinning = false;
  //           }
  //         });
  //     } else {
  //       this.message.error(
  //         this.api.translate.instant("common.message.error.emptyinfo"),
  //         ""
  //       );
  //     }
  //   } else {
  //     let nextStageId = 19;
  //     // //console.log(nextStageId, this.data.ID)
  //     this.api
  //       .updateStatus(
  //         this.data.CURRENT_STAGE_ID,
  //         nextStageId,
  //         this.BRANCH_OPINION_TEXT,
  //         this.data.ID,
  //         0,
  //         this.data.REJECTNOTE1
  //       )
  //       .subscribe((successCode) => {
  //         // //console.log(successCode)
  //         this.isButtonSpinning = false;
  //         this.isRejectButtonDisabled = true;

  //         if (successCode["code"] == "200") {
  //           // localStorage.setItem('remark',this.BRANCH_OPINION_TEXT)

  //           // console.log(sessionStorage.setItem('remark',this.BRANCH_OPINION_TEXT),'')
  //           var LOG_ACTION = "Proposal resent to refill infomration";

  //           var DESCRIPTION =
  //             sessionStorage.getItem("userName") +
  //             " has sent the proposal" +
  //             this.data["LOAN_KEY"] +
  //             " to refill with remark -" +
  //             this.REMARKS;
  //           var LOG_TYPE = "I";
  //           this.api
  //             .proposalLogInformation(
  //               this.data.ID,
  //               this.data.CURRENT_STAGE_ID,
  //               8,
  //               LOG_ACTION,
  //               Number(this.userId),
  //               DESCRIPTION,
  //               LOG_TYPE
  //             )
  //             .subscribe((successCode) => {
  //               if (successCode["code"] == "200") {
  //               }
  //             });

  //           // this.drawerClose()
  //           this.logtext =
  //             "SubmitForScrutiny  - Submit For Refill  form - SUCCESS " +
  //             "Stage Id" +
  //             nextStageId +
  //             JSON.stringify(this.data) +
  //             " KEYWORD [U - ApplicantDocument ]";
  //           this.api
  //             .addLog("A", this.logtext, this.api.emailId)
  //             .subscribe((successCode) => {
  //               if (successCode["code"] == "200") {
  //                 console.log(successCode, "hieee");
  //               } else {
  //                 // //console.log(successCode);
  //               }
  //             });

  //           this.userActivityLogData.USER_ID = Number(
  //             sessionStorage.getItem("userId")
  //           );
  //           this.userActivityLogData.ACTIVITY_DETAILS =
  //             " SubmitForScrutiny  -   Submit For Refill  " +
  //             "Stage Id" +
  //             nextStageId +
  //             JSON.stringify(this.data);
  //           this.userActivityLogData.ACTIVITY_TIME = new Date();
  //           this.api
  //             .createUserActivityLog(this.userActivityLogData)
  //             .subscribe((successCode) => {
  //               if (successCode["code"] == "200") {
  //                 // //console.log(successCode);
  //               } else {
  //                 // //console.log(successCode);
  //               }
  //             });
  //           this.message.success(
  //             this.api.translate.instant("common.message.success.addinfo"),
  //             ""
  //           );
  //           this.fsubmit.emit();
  //           this.isRejectButtonDisabled = true;
  //         } else {
  //           this.isButtonSpinning = false;

  //           this.logtext =
  //             " SubmitForScrutiny  -  Submit For Refill  form - ERROR - " +
  //             "Stage Id" +
  //             nextStageId +
  //             "Json" +
  //             JSON.stringify(this.data) +
  //             " KEYWORD [U - JoinedBranch ]";
  //           this.api
  //             .addLog("A", this.logtext, this.api.emailId)
  //             .subscribe((successCode) => {
  //               if (successCode["code"] == "200") {
  //                 // //console.log(successCode);
  //               } else {
  //                 // //console.log(successCode);
  //               }
  //             });
  //           this.userActivityLogData.USER_ID = Number(
  //             sessionStorage.getItem("userId")
  //           );
  //           this.userActivityLogData.ACTIVITY_DETAILS =
  //             " SubmitForScrutiny  -  Submit For Refill  Failed" +
  //             "Stage Id" +
  //             nextStageId +
  //             JSON.stringify(this.data);
  //           this.userActivityLogData.ACTIVITY_TIME = new Date();
  //           this.api
  //             .createUserActivityLog(this.userActivityLogData)
  //             .subscribe((successCode) => {
  //               if (successCode["code"] == "200") {
  //                 // //console.log(successCode);
  //               } else {
  //                 // //console.log(successCode);
  //               }
  //             });
  //           this.message.error(
  //             this.api.translate.instant("common.message.error.failed"),
  //             ""
  //           );

  //           this.isButtonSpinning = false;
  //         }
  //       });
  //   }

  // }

  // SumbitForApprovalLO(status){

  //   if (status == "V") {
  //     this.DOCUMENT_TEXT = "";
  //     this.REMARKS = "";
  //     if (
  //       this.BRANCH_OPINION_TEXT != undefined &&
  //       this.BRANCH_OPINION_TEXT.trim() != ""
  //     ) {
  //       // if (  this.AMOUNT != 0 && this.AMOUNT != undefined) {
  //       let nextStageId = 20;
  //       // //console.log(nextStageId, this.data.ID)
  //       this.api
  //         .updateStatus3(
  //           this.IS_CHECK_OBTAINED,
  //           this.IS_IDENTITY_CARD_OBTAINED,
  //           this.BRANCH_OPINION_TEXT,
  //           this.DOCUMENT_TEXT,
  //           this.data.CURRENT_STAGE_ID,
  //           nextStageId,
  //           this.REMARKS,
  //           this.data.ID,
  //           0
  //         )
  //         .subscribe((successCode) => {
  //           this.rejectButtonClicked = true;
  //           // this.api.updateFillAmount2(this.data.CURRENT_STAGE_ID, ' ', 0,this.data.ID,"B",this.REMARKS )
  //           //   .subscribe(successCode => {
  //           // //console.log(successCode)
  //           this.isButtonSpinning = false;

  //           if (successCode["code"] == "200") {
  //             // localStorage.setItem('remark',this.BRANCH_OPINION_TEXT)

  //             // this.drawerClose()
  //             this.logtext =
  //               "SubmitForScrutiny  - Submit For Scrutiny  form - SUCCESS " +
  //               "Stage Id" +
  //               nextStageId +
  //               JSON.stringify(this.data) +
  //               " KEYWORD [U - ApplicantDocument ]";
  //             this.api
  //               .addLog("A", this.logtext, this.api.emailId)
  //               .subscribe((successCode) => {
  //                 if (successCode["code"] == "200") {
  //                   // //console.log(successCode);
  //                 } else {
  //                   // //console.log(successCode);
  //                 }
  //               });

  //             this.userActivityLogData.USER_ID = Number(
  //               sessionStorage.getItem("userId")
  //             );
  //             this.userActivityLogData.ACTIVITY_DETAILS =
  //               " SubmitForScrutiny  -   Submit For Scrutiny  " +
  //               "Stage Id" +
  //               nextStageId +
  //               JSON.stringify(this.data);
  //             this.userActivityLogData.ACTIVITY_TIME = new Date();
  //             this.api
  //               .createUserActivityLog(this.userActivityLogData)
  //               .subscribe((successCode) => {
  //                 if (successCode["code"] == "200") {
  //                   // //console.log(successCode);
  //                 } else {
  //                   // //console.log(successCode);
  //                 }
  //               });
  //             this.message.success(
  //               this.api.translate.instant("common.message.success.addinfo"),
  //               ""
  //             );
  //             this.fsubmit.emit();
  //           } else {
  //             this.isButtonSpinning = false;

  //             this.logtext =
  //               " SubmitForScrutiny  -  Submit For Scrutiny  form - ERROR - " +
  //               "Stage Id" +
  //               nextStageId +
  //               "Json" +
  //               JSON.stringify(this.data) +
  //               " KEYWORD [U - JoinedBranch ]";
  //             this.api
  //               .addLog("A", this.logtext, this.api.emailId)
  //               .subscribe((successCode) => {
  //                 if (successCode["code"] == "200") {
  //                   // //console.log(successCode);
  //                 } else {
  //                   // //console.log(successCode);
  //                 }
  //               });
  //             this.userActivityLogData.USER_ID = Number(
  //               sessionStorage.getItem("userId")
  //             );
  //             this.userActivityLogData.ACTIVITY_DETAILS =
  //               " SubmitForScrutiny  -  Submit For Scrutiny  Failed" +
  //               "Stage Id" +
  //               nextStageId +
  //               JSON.stringify(this.data);
  //             this.userActivityLogData.ACTIVITY_TIME = new Date();
  //             this.api
  //               .createUserActivityLog(this.userActivityLogData)
  //               .subscribe((successCode) => {
  //                 if (successCode["code"] == "200") {
  //                   // //console.log(successCode);
  //                 } else {
  //                   // //console.log(successCode);
  //                 }
  //               });
  //             this.message.error(
  //               this.api.translate.instant("common.message.error.failed"),
  //               ""
  //             );

  //             this.isButtonSpinning = false;
  //           }
  //         });
  //     } else {
  //       this.message.error(
  //         this.api.translate.instant("common.message.error.emptyinfo"),
  //         ""
  //       );
  //     }
  //   } else {
  //     let nextStageId = 14;
  //     // //console.log(nextStageId, this.data.ID)
  //     this.api
  //       .updateStatus(
  //         this.data.CURRENT_STAGE_ID,
  //         nextStageId,
  //         this.BRANCH_OPINION_TEXT,
  //         this.data.ID,
  //         0,
  //         this.data.REJECTNOTE1
  //       )
  //       .subscribe((successCode) => {
  //         // //console.log(successCode)
  //         this.isButtonSpinning = false;
  //         this.isRejectButtonDisabled = true;

  //         if (successCode["code"] == "200") {
  //           // localStorage.setItem('remark',this.BRANCH_OPINION_TEXT)

  //           // console.log(sessionStorage.setItem('remark',this.BRANCH_OPINION_TEXT),'')
  //           var LOG_ACTION = "Proposal resent to refill infomration";

  //           var DESCRIPTION =
  //             sessionStorage.getItem("userName") +
  //             " has sent the proposal" +
  //             this.data["LOAN_KEY"] +
  //             " to refill with remark -" +
  //             this.REMARKS;
  //           var LOG_TYPE = "I";
  //           this.api
  //             .proposalLogInformation(
  //               this.data.ID,
  //               this.data.CURRENT_STAGE_ID,
  //               8,
  //               LOG_ACTION,
  //               Number(this.userId),
  //               DESCRIPTION,
  //               LOG_TYPE
  //             )
  //             .subscribe((successCode) => {
  //               if (successCode["code"] == "200") {
  //               }
  //             });

  //           // this.drawerClose()
  //           this.logtext =
  //             "SubmitForScrutiny  - Submit For Refill  form - SUCCESS " +
  //             "Stage Id" +
  //             nextStageId +
  //             JSON.stringify(this.data) +
  //             " KEYWORD [U - ApplicantDocument ]";
  //           this.api
  //             .addLog("A", this.logtext, this.api.emailId)
  //             .subscribe((successCode) => {
  //               if (successCode["code"] == "200") {
  //                 console.log(successCode, "hieee");
  //               } else {
  //                 // //console.log(successCode);
  //               }
  //             });

  //           this.userActivityLogData.USER_ID = Number(
  //             sessionStorage.getItem("userId")
  //           );
  //           this.userActivityLogData.ACTIVITY_DETAILS =
  //             " SubmitForScrutiny  -   Submit For Refill  " +
  //             "Stage Id" +
  //             nextStageId +
  //             JSON.stringify(this.data);
  //           this.userActivityLogData.ACTIVITY_TIME = new Date();
  //           this.api
  //             .createUserActivityLog(this.userActivityLogData)
  //             .subscribe((successCode) => {
  //               if (successCode["code"] == "200") {
  //                 // //console.log(successCode);
  //               } else {
  //                 // //console.log(successCode);
  //               }
  //             });
  //           this.message.success(
  //             this.api.translate.instant("common.message.success.addinfo"),
  //             ""
  //           );
  //           this.fsubmit.emit();
  //           this.isRejectButtonDisabled = true;
  //         } else {
  //           this.isButtonSpinning = false;

  //           this.logtext =
  //             " SubmitForScrutiny  -  Submit For Refill  form - ERROR - " +
  //             "Stage Id" +
  //             nextStageId +
  //             "Json" +
  //             JSON.stringify(this.data) +
  //             " KEYWORD [U - JoinedBranch ]";
  //           this.api
  //             .addLog("A", this.logtext, this.api.emailId)
  //             .subscribe((successCode) => {
  //               if (successCode["code"] == "200") {
  //                 // //console.log(successCode);
  //               } else {
  //                 // //console.log(successCode);
  //               }
  //             });
  //           this.userActivityLogData.USER_ID = Number(
  //             sessionStorage.getItem("userId")
  //           );
  //           this.userActivityLogData.ACTIVITY_DETAILS =
  //             " SubmitForScrutiny  -  Submit For Refill  Failed" +
  //             "Stage Id" +
  //             nextStageId +
  //             JSON.stringify(this.data);
  //           this.userActivityLogData.ACTIVITY_TIME = new Date();
  //           this.api
  //             .createUserActivityLog(this.userActivityLogData)
  //             .subscribe((successCode) => {
  //               if (successCode["code"] == "200") {
  //                 // //console.log(successCode);
  //               } else {
  //                 // //console.log(successCode);
  //               }
  //             });
  //           this.message.error(
  //             this.api.translate.instant("common.message.error.failed"),
  //             ""
  //           );

  //           this.isButtonSpinning = false;
  //         }
  //       });
  //   }

  // }

  SumbitforApproval() {
   
    if(!this.REMARKS){
      this.message.error("Please Fill Remark","")
      return;
    }

    if (this.roleId == "5" && this.data.CURRENT_STAGE_ID == 8) {
      this.data.CURRENT_STAGE_ID = 9;
    } //BA

    if (this.roleId == "4" && this.data.CURRENT_STAGE_ID == 9) {
      this.data.CURRENT_STAGE_ID = 19;
    } //BM

    if (this.roleId == "12" && this.data.CURRENT_STAGE_ID == 19) {
      this.data.CURRENT_STAGE_ID = 14;
    } //ALO

    if (this.roleId == "14" && this.data.CURRENT_STAGE_ID == 14) {
      if(!this.data.AGM_ID){
        this.message.error(`Please Select ${this.api.translate.instant('remark1.agm')}`,"")
        return;
      }
      this.data.CURRENT_STAGE_ID = 20;
    } //LO
    if (this.roleId == "13" && this.data.CURRENT_STAGE_ID == 20) {
      this.data.CURRENT_STAGE_ID = 16;
    } //HO

  

    this.api.updateProposal1(this.data).subscribe({
      next: (res) => {
        if (res["code"] == 200) {
          this.message.success("Information Submitted Successfully", "");
          

          this.remark.EMP_ID = Number(sessionStorage.getItem("userId"));
          this.remark.TYPE = Number(sessionStorage.getItem("roleId"));
          this.remark.REMARK = this.REMARKS;
          this.remark.DATE = new Date();
      
          this.remark.DATE = this.datePipe.transform(
            this.remark.DATE,
            "yyyy-MM-dd HH:mm:ss"
          );
          // this.remark.DATE =this.datePipe.transform(this.remark.DATE, 'dd/MM/yyyy');
          this.api.createremark(this.remark, this.data.ID).subscribe((data) => {
            if (data["code"] == "200") {
              
              this.fsubmit.emit();
              this.getdata1();
              
            }
          });
        } else {
          this.message.error("Failed", "");
        }
      },
      error: (err) => {
        console.log("Failed", err);
        this.message.error("Failed", "");
      },
    });



    
  }

  SendToRefill() {

    if(!this.REMARKS){
      this.message.error("Please Fill Remark","")
      return;
    }
    if (this.roleId == "4" && this.data.CURRENT_STAGE_ID == 9) {
      this.data.CURRENT_STAGE_ID = 8;
    } //BM

    if (this.roleId == "12" && this.data.CURRENT_STAGE_ID == 19) {
      this.data.CURRENT_STAGE_ID = 9;
    } //ALO

    if (this.roleId == "14" && this.data.CURRENT_STAGE_ID == 14) {
      this.data.CURRENT_STAGE_ID = 19;
    } //LO
    if (this.roleId == "13" && this.data.CURRENT_STAGE_ID == 20) {
      this.data.CURRENT_STAGE_ID = 14;
    } //HO

    this.api.updateProposal1(this.data).subscribe({
      next: (res) => {
        if (res["code"] == 200) {
          this.message.success("Sent To Refill", "");
          this.remark.EMP_ID = Number(sessionStorage.getItem("userId"));
          this.remark.TYPE = Number(sessionStorage.getItem("roleId"));
          this.remark.REMARK = this.REMARKS;
          this.remark.DATE = new Date();
      
          this.remark.DATE = this.datePipe.transform(
            this.remark.DATE,
            "yyyy-MM-dd HH:mm:ss"
          );
          // this.remark.DATE =this.datePipe.transform(this.remark.DATE, 'dd/MM/yyyy');
          this.api.createremark(this.remark, this.data.ID).subscribe((data) => {
            if (data["code"] == "200") {
              
              this.fsubmit.emit();
              this.getdata1();
              
            }
          });
        } else {
          this.message.error("Failed", "");
        }
      },
      error: (err) => {
        console.log("Failed", err);
        this.message.error("Failed", "");
      },
    });
  }

  RejectProposal() {

    

    this.data.CURRENT_STAGE_ID = 6;
    this.api.updateProposal1(this.data).subscribe({
      next: (res) => {
        if (res["code"] == 200) {
          this.message.success("Proposal Has been Rejected", "");
          this.remark.EMP_ID = Number(sessionStorage.getItem("userId"));
          this.remark.TYPE = Number(sessionStorage.getItem("roleId"));
          this.remark.REMARK = this.REMARKS;
          this.remark.DATE = new Date();
      
          this.remark.DATE = this.datePipe.transform(
            this.remark.DATE,
            "yyyy-MM-dd HH:mm:ss"
          );
          // this.remark.DATE =this.datePipe.transform(this.remark.DATE, 'dd/MM/yyyy');
          this.api.createremark(this.remark, this.data.ID).subscribe((data) => {
            if (data["code"] == "200") {
              
              this.fsubmit.emit();
              this.getdata1();
              
            }
          });
        } else {
          this.message.error("Failed to Reject Proposal", "");
        }
      },
      error: (err) => {
        console.log("Failed to Reject", err);
        this.message.error("Failed to Reject Proposal", "");
      },
    });

   
  }

  isFieldsFilled: boolean
  isFieldsVisible: boolean
  
  

  onFileSelectedFile1(event) {
    this.fileData_REPORT_URL1 = <File>event.target.files[0];
  }

  uploadfile() {
    console.log("im in the newupload method", this.data.REJECTNOTE)
    if (this.fileData_REPORT_URL1) {
      var fileExt = this.fileData_REPORT_URL1.name.split('.').pop();
      var lkey = ""
      this.api.onUploadNewMethod(this.fileData_REPORT_URL1, fileExt, this.fkey)
        .subscribe(successCode => {
          if (successCode['code'] == 200) {
            lkey = successCode['data'][0]['L_KEY']
            this.data.REJECTNOTE = lkey
            console.log("im in the newupload method", this.data.REJECTNOTE)
            this.RejectProposal()
          }
          else {
          }
        });
    } else {
      this.data.REJECTNOTE = " ";
    }
  }

  getAGMList(){
    let likeQuery = ` AND ROLE_ID IN (13) `
    this.api.getAllUsers(0, 0, 'ID', null, likeQuery).subscribe(data => {
     
      this.dataList12 = data['data'];

      console.log(this.dataList12)
    }, err => {
      if (err['ok'] == false)
        this.message.error(this.api.translate.instant('common.Server_Not_Found'), "");
    });
  }

  // reject() {
  //   console.log("i m in the reject function");
  //   this.isButtonSpinning = true;
  //   var nextStageId = 6;

  //   if (
  //     this.data.REJECTREMARK != undefined &&
  //     this.data.REJECTREMARK.trim() !== "" &&
  //     this.data.REJECTNOTE != undefined &&
  //     this.data.REJECTNOTE.trim() !== ""
  //   ) {
  //     console.log("in the reject function", this.data.REJECTREMARK);
  //     console.log("in the reject function", this.data.REJECTNOTE);
  //     this.isButtonSpinning = true;
  //     // //console.log(nextStageId, this.data.ID)
  //     this.api
  //       .updateStatus2(
  //         this.data.CURRENT_STAGE_ID,
  //         nextStageId,
  //         this.REMARKS,
  //         this.data.ID,
  //         0,
  //         this.data.PROPOSAL_REPORT,
  //         this.data.REJECTREMARK,
  //         this.data.REJECTNOTE,
  //         this.data.REJECTNOTE1
  //       )
  //       .subscribe((successCode) => {
  //         console.log(successCode);
  //         this.isButtonSpinning = false;

  //         if (successCode["code"] == "200") {
  //           this.reset();

  //           this.logtext =
  //             "LoanDisbursment  - Loan reject  form - SUCCESS " +
  //             "Stage Id" +
  //             nextStageId +
  //             JSON.stringify(this.data) +
  //             " KEYWORD [U - ApplicantDocument ]";
  //           this.api
  //             .addLog("R", this.logtext, this.api.emailId)
  //             .subscribe((successCode) => {
  //               if (successCode["code"] == "200") {
  //                 // //console.log(successCode);
  //               } else {
  //                 // //console.log(successCode);
  //               }
  //             });

  //           this.userActivityLogData.USER_ID = Number(
  //             sessionStorage.getItem("userId")
  //           );
  //           this.userActivityLogData.ACTIVITY_DETAILS =
  //             " LoanDisbursment  -   Loan Reject  " +
  //             "Stage Id" +
  //             nextStageId +
  //             JSON.stringify(this.data);
  //           this.userActivityLogData.ACTIVITY_TIME = new Date();
  //           this.api
  //             .createUserActivityLog(this.userActivityLogData)
  //             .subscribe((successCode) => {
  //               if (successCode["code"] == "200") {
  //                 // //console.log(successCode);
  //               } else {
  //                 // //console.log(successCode);
  //               }
  //             });
  //           // this.drawerCloseLocalBoard();
  //         } else {
  //           this.isButtonSpinning = false;

  //           this.logtext =
  //             " LoanDisbursment  -  Loan Reject  form - ERROR - " +
  //             "Stage Id" +
  //             nextStageId +
  //             "Json" +
  //             JSON.stringify(this.data) +
  //             " KEYWORD [U - JoinedBranch ]";
  //           this.api
  //             .addLog("A", this.logtext, this.api.emailId)
  //             .subscribe((successCode) => {
  //               if (successCode["code"] == "200") {
  //                 // //console.log(successCode);
  //               } else {
  //                 // //console.log(successCode);
  //               }
  //             });
  //           this.userActivityLogData.USER_ID = Number(
  //             sessionStorage.getItem("userId")
  //           );
  //           this.userActivityLogData.ACTIVITY_DETAILS =
  //             " LoanDisbursment  -  Loan Disbursment  Failed" +
  //             "Stage Id" +
  //             nextStageId +
  //             JSON.stringify(this.data);
  //           this.userActivityLogData.ACTIVITY_TIME = new Date();
  //           this.api
  //             .createUserActivityLog(this.userActivityLogData)
  //             .subscribe((successCode) => {
  //               if (successCode["code"] == "200") {
  //                 // //console.log(successCode);
  //               } else {
  //                 // //console.log(successCode);
  //               }
  //             });
  //           this.message.error(
  //             this.api.translate.instant("common.message.error.failed"),
  //             ""
  //           );

  //           this.isButtonSpinning = false;
  //         }
  //       });
  //     this.message.success(
  //       this.api.translate.instant("common.message.success.addinfo"),
  //       ""
  //     );
  //     this.fsubmit.emit();
  //   } else {
  //     this.message.error(
  //       this.api.translate.instant("common.message.error.remarkempty"),
  //       ""
  //     );
  //   }
  //   // } else {
  //   //   this.message.error(this.api.translate.instant('passtomainbranch.message1'), "");
  //   // }
  // }

  // uploadfile() {
  //   this.isSpinning3 = true;
  //   if (this.fileData_REPORT_URL1) {
  //     var fileExt = this.fileData_REPORT_URL1.name.split(".").pop();
  //     var lkey = "";
  //     this.api
  //       .onUploadNewMethod(this.fileData_REPORT_URL1, fileExt, this.fkey)
  //       .subscribe((successCode) => {
  //         if (successCode["code"] == 200) {
  //           lkey = successCode["data"][0]["L_KEY"];
  //           this.data.REJECTNOTE = lkey;
  //           console.log("im in the newupload method", this.data.REJECTNOTE);
  //           // this.reject();
  //         } else {
  //         }
  //       });
  //   } else {
  //     this.data.REJECTNOTE = " ";
  //   }
  // }

  cancel(): void {}

  reset() {
    this.fileData_REPORT_URL1 = null;
    this.data.REJECTREMARK = null;
  }

  getdata1() {
    let filter = " AND PROPOSAL_ID=" + this.PROPOSAL_ID;
    // this.isSpinning = true

    this.api.getAllRemark(0, 0, "ID", "asc", filter).subscribe(
      (data) => {
        // this.isSpinning = false
        this.remark = new RemarkList();
        if (data["count"] > 0) {
          this.remark1 = data["data"];
          console.log(this.remark1, "okdwe");
          //  this.remark.EMP_ID = data[0]['EMP_ID']
          // this.getData2();
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }


  save1(data: Proposal) {


    if (data) {

      data.AGM_ID = Number(this.userId)


      data.CURRENT_STAGE_ID = 6
      this.api.updateProposal1(data).subscribe(data => {

        if (data['code'] == "200") {


          
          this.fsubmit.emit()
          this.getdata1();


        }

      })
    }


    // // this.message.success(this.api.translate.instant('common.message.success.addinfo2'), "")
    // // this.indexChanged.emit(1)
    // // this.logtext = 'Save & New - SalaryLoan form - SUCCESS - ' + JSON.stringify(this.data) + " KEYWORD [C - SalaryLoan ]";


    // this.isButtonSpinning = false;


  }


}
