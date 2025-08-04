import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { NzNotificationService } from "ng-zorro-antd/notification";
import { Color, Label } from 'ng2-charts';
import { CookieService } from 'ngx-cookie-service';
import { Proposalstage } from 'src/app/Models/BasicForms/proposalstage';
import { ApiService } from "src/app/Service/api.service";
@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css'],
  providers: [DatePipe]
})
export class AdmindashboardComponent implements OnInit {
  COUNT_TYPE = 'A'
  public lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.0)',
      borderColor: '#bc0250',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }

  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public lineChartData: ChartDataSets[] = [
    { data: [], label: 'Amount' }
  ];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        }

      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };
  date = new Date();
  countSpins = false
  lineSpins = false
  APPROVED_DOCUMENTS = 0
  DISBURSED_LOAN_AMOUNT = 0
  DISBURSED_PRAPOSALS = 0
  IN_PROCESS_LOAN_AMOUNT = 0
  IN_PROCESS_PRAPOSALS = 0
  LOAN_DISBURSED_APPLICANTS = 0
  LOAN_IN_PROCESS_APPLICANTS = 0
  LOAN_REJECTED_APPLICANTS = 0
  PENDING_DOCUMENTS = 0
  REJECTED_DOCUMENTS = 0
  REJECTED_LOAN_AMOUNT = 0
  REJECTED_PRAPOSALS = 0
  TOTAL_APPLICANTS = 0
  TOTAL_APPLICANT_DOCUMENTS = 0
  TOTAL_BRANCHES = 0
  TOTAL_DOCUMENTS = 0
  TOTAL_LOAN_AMOUNT = 0
  TOTAL_LOAN_TYPES = 0
  TOTAL_PRAPOSALS = 0
  TOTAL_USERS = 0
  lineSpins2 = false
  value1: string = ""
  value2: string = ""
  dateFormat = 'dd/MM/yyyy';
  selectedDate: Date[] = []
  COUNT_TYPE2 = 'A'
  datePipe = new DatePipe("en-US");
  public lineChartColors2: Color[] = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.0)',
      borderColor: '#00bd65',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }

  ];
  public lineChartLegend2 = true;
  public lineChartType2: ChartType = 'line';
  public lineChartData2: ChartDataSets[] = [
    { data: [], label: 'Amount' }
  ];
  public lineChartLabels2: Label[] = [];
  public lineChartOptions2: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        }

      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };

  lineSpins3 = false
  value3: string = ""
  value4: string = ""
  selectedDate3: Date[] = []
  COUNT_TYPE3 = 'A'
  public lineChartColors3: Color[] = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.0)',
      borderColor: '#0066ff',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }

  ];
  public lineChartLegend3 = true;
  public lineChartType3: ChartType = 'line';
  public lineChartData3: ChartDataSets[] = [
    { data: [], label: 'Amount' }
  ];
  public lineChartLabels3: Label[] = [];
  public lineChartOptions3: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        }

      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };
  loantypes = []
  browserLang = ''
  labels1 = []
  labels2 = []
  labels3 = []
  labels4 = []
  branches = []
  users = []
  BRANCH_ID = 'AL'
  USER_ID='AL'
  loadingBranch = false
  loadingUser= false
  loadingproposal= false
  pageIndex2 = 1;
  pageSize2 = 10;
  totalRecords2 = 1;
  loadingRecords2 = false;
  sortValue2: string = "desc";
  sortKey2: string = "id";
  filterQuery: string = "";
  listOfData3 = [];
  proposals = [];
  PROPOSAL_ID = 'AL'
  columns: string[][] = [['LOG_DATETIME', 'Date & Time'], ['DESCRIPTION', 'Log Details']]
  value5: string = ""
  value6: string = ""
  selectedDate4: Date[] = []
  loggedInBranchId: string;
  branchId = sessionStorage.getItem('branchId')
  branchIdCount = Number(sessionStorage.getItem('branchIdCount'))
  isLogedIn = false;
  userId = sessionStorage.getItem('userId')
  roleId = Number(sessionStorage.getItem('roleId'))

  branchData = [];

  constructor(private api: ApiService, private message: NzNotificationService,private cookie: CookieService) { }




  
  ngOnInit(): void {
    this.browserLang = localStorage.getItem('locale');
    this.selectedDate = [new Date(), new Date()]
    this.selectedDate3 = [new Date(), new Date()]
    this.selectedDate4 = [new Date(), new Date()]
    this.onChange(this.date);
    this.onLineChange22(this.selectedDate);
    this.onLineChange33(this.selectedDate3);
    this.getActivityLogs()
    this.countSpins = true
    this.api.getDashboardCounts().subscribe(data => {
      if (data['code'] == 200) {
        this.APPROVED_DOCUMENTS = data['data']['APPROVED_DOCUMENTS']
        this.DISBURSED_LOAN_AMOUNT = data['data']['DISBURSED_LOAN_AMOUNT']
        this.DISBURSED_PRAPOSALS = data['data']['DISBURSED_PRAPOSALS']
        this.IN_PROCESS_LOAN_AMOUNT = data['data']['IN_PROCESS_LOAN_AMOUNT']
        this.IN_PROCESS_PRAPOSALS = data['data']['IN_PROCESS_PRAPOSALS']
        this.LOAN_DISBURSED_APPLICANTS = data['data']['LOAN_DISBURSED_APPLICANTS']
        this.LOAN_IN_PROCESS_APPLICANTS = data['data']['LOAN_IN_PROCESS_APPLICANTS']
        this.LOAN_REJECTED_APPLICANTS = data['data']['LOAN_REJECTED_APPLICANTS']
        this.PENDING_DOCUMENTS = data['data']['PENDING_DOCUMENTS']
        this.REJECTED_DOCUMENTS = data['data']['REJECTED_DOCUMENTS']
        this.REJECTED_LOAN_AMOUNT = data['data']['REJECTED_LOAN_AMOUNT']
        this.REJECTED_PRAPOSALS = data['data']['REJECTED_PRAPOSALS']
        this.TOTAL_APPLICANTS = data['data']['TOTAL_APPLICANTS']
        this.TOTAL_APPLICANT_DOCUMENTS = data['data']['TOTAL_APPLICANT_DOCUMENTS']
        this.TOTAL_BRANCHES = data['data']['TOTAL_BRANCHES']
        this.TOTAL_DOCUMENTS = data['data']['TOTAL_DOCUMENTS']
        this.TOTAL_LOAN_AMOUNT = data['data']['TOTAL_LOAN_AMOUNT']
        this.TOTAL_LOAN_TYPES = data['data']['TOTAL_LOAN_TYPES']
        this.TOTAL_PRAPOSALS = data['data']['TOTAL_PRAPOSALS']
        this.TOTAL_USERS = data['data']['TOTAL_USERS']
      }
      this.countSpins = false
    }, err => {

    });

    this.branches = [];
    this.loadingBranch = true
    this.api.getAllBranches(0, 0, '', '', '').subscribe(data => {
      this.branches = data['data'];
      this.loadingBranch = false
    }, err => {
      //console.log(err);
    });

    this.users = [];
    this.loadingUser = true
    this.api.getAllUsers(0, 0, '', '', '').subscribe(data => {
      this.loadingUser = false
      this.users = data['data'];
    }, err => {
      
    });

    this.proposals = [];
    this.loadingproposal = true
    this.api.getPraposalNumber(0, 0, '', '', '').subscribe(data => {
      this.loadingproposal = false
      this.proposals = data['data'];
    }, err => {
      
    });

    this.api.getAllLoanScheme(0, 0, 'ID', 'asc', '').subscribe(data => {
      if (data['code'] == "200") {
        this.loantypes = data['data'];
        for (var i = 0; i < this.loantypes.length; i++) {
          if (this.browserLang == 'mr') {
            this.lineChartLabels2.push(this.loantypes[i].NAME_MR)

          } else if (this.browserLang == 'en') {
            this.lineChartLabels2.push(this.loantypes[i].NAME_EN);
          } else {
            this.lineChartLabels2.push(this.loantypes[i].NAME_KN);
          }


        }
      }

    }, err => {
    });
  }








//   ngOnInit(): void {



//     // this.branchId = sessionStorage.getItem('branchId'); // सध्याच्या ब्रांचचा ID मिळवा

//     // if (this.branchId) {
//     //   this.loadBranchSpecificData(this.branchId); // Load data based on branchId
//     // } else {
//     //   console.error('Branch ID not found in session storage.');
//     // }

//     // if (this.branchId == '0') {
//     //   this.api.getAllBranches(0, 0, 'ID', "asc", "")
//     //     .subscribe(successCode => {
//     //       if (successCode['code'] == "200") {
//     //         this.branchData = successCode['data'];
//     //       }
//     //     });
//     // }

//   // if (this.branchId) {
//   //   this.loadBranchSpecificData(this.branchId);
//   // } else {
//   //   console.error('Branch ID not found in session storage.');
//   // }



//     this.browserLang = localStorage.getItem('locale');
//     this.selectedDate = [new Date(), new Date()]
//     this.selectedDate3 = [new Date(), new Date()]
//     this.selectedDate4 = [new Date(), new Date()]
//     this.onChange(this.date);
//     this.onLineChange22(this.selectedDate);
//     this.onLineChange33(this.selectedDate3);
//     this.getActivityLogs()
//     this.loadProposalStage()
//     this.countSpins = true
//     // this.api.getDashboardCounts(this.branchId).subscribe(data => {
//     //   if (data['code'] == 200) {
//     //     this.APPROVED_DOCUMENTS = data['data']['APPROVED_DOCUMENTS']
//     //     this.DISBURSED_LOAN_AMOUNT = data['data']['DISBURSED_LOAN_AMOUNT']
//     //     this.DISBURSED_PRAPOSALS = data['data']['DISBURSED_PRAPOSALS']
//     //     this.IN_PROCESS_LOAN_AMOUNT = data['data']['IN_PROCESS_LOAN_AMOUNT']
//     //     this.IN_PROCESS_PRAPOSALS = data['data']['IN_PROCESS_PRAPOSALS']
//     //     this.LOAN_DISBURSED_APPLICANTS = data['data']['LOAN_DISBURSED_APPLICANTS']
//     //     this.LOAN_IN_PROCESS_APPLICANTS = data['data']['LOAN_IN_PROCESS_APPLICANTS']
//     //     this.LOAN_REJECTED_APPLICANTS = data['data']['LOAN_REJECTED_APPLICANTS']
//     //     this.PENDING_DOCUMENTS = data['data']['PENDING_DOCUMENTS']
//     //     this.REJECTED_DOCUMENTS = data['data']['REJECTED_DOCUMENTS']
//     //     this.REJECTED_LOAN_AMOUNT = data['data']['REJECTED_LOAN_AMOUNT']
//     //     this.REJECTED_PRAPOSALS = data['data']['REJECTED_PRAPOSALS']
//     //     this.TOTAL_APPLICANTS = data['data']['TOTAL_APPLICANTS']
//     //     this.TOTAL_APPLICANT_DOCUMENTS = data['data']['TOTAL_APPLICANT_DOCUMENTS']
//     //     this.TOTAL_BRANCHES = data['data']['TOTAL_BRANCHES']
//     //     this.TOTAL_DOCUMENTS = data['data']['TOTAL_DOCUMENTS']
//     //     this.TOTAL_LOAN_AMOUNT = data['data']['TOTAL_LOAN_AMOUNT']
//     //     this.TOTAL_LOAN_TYPES = data['data']['TOTAL_LOAN_TYPES']
//     //     this.TOTAL_PRAPOSALS = data['data']['TOTAL_PRAPOSALS']
//     //     this.TOTAL_USERS = data['data']['TOTAL_USERS']
//     //   }
//     //   this.countSpins = false
//     // }, err => {

//     // });


//     const branchId = sessionStorage.getItem('branchId')

// if (branchId) {
//   this.api.getDashboardCounts(branchId).subscribe(data => {
//     if (data['code'] == 200) {
//       this.APPROVED_DOCUMENTS = data['data']['APPROVED_DOCUMENTS'];
//       this.DISBURSED_LOAN_AMOUNT = data['data']['DISBURSED_LOAN_AMOUNT'];
//       this.DISBURSED_PRAPOSALS = data['data']['DISBURSED_PRAPOSALS'];
//       this.IN_PROCESS_LOAN_AMOUNT = data['data']['IN_PROCESS_LOAN_AMOUNT'];
//       this.IN_PROCESS_PRAPOSALS = data['data']['IN_PROCESS_PRAPOSALS'];
//       this.LOAN_DISBURSED_APPLICANTS = data['data']['LOAN_DISBURSED_APPLICANTS'];
//       this.LOAN_IN_PROCESS_APPLICANTS = data['data']['LOAN_IN_PROCESS_APPLICANTS'];
//       this.LOAN_REJECTED_APPLICANTS = data['data']['LOAN_REJECTED_APPLICANTS'];
//       this.PENDING_DOCUMENTS = data['data']['PENDING_DOCUMENTS'];
//       this.REJECTED_DOCUMENTS = data['data']['REJECTED_DOCUMENTS'];
//       this.REJECTED_LOAN_AMOUNT = data['data']['REJECTED_LOAN_AMOUNT'];
//       this.REJECTED_PRAPOSALS = data['data']['REJECTED_PRAPOSALS'];
//       this.TOTAL_APPLICANTS = data['data']['TOTAL_APPLICANTS'];
//       this.TOTAL_APPLICANT_DOCUMENTS = data['data']['TOTAL_APPLICANT_DOCUMENTS'];
//       this.TOTAL_BRANCHES = data['data']['TOTAL_BRANCHES'];
//       this.TOTAL_DOCUMENTS = data['data']['TOTAL_DOCUMENTS'];
//       this.TOTAL_LOAN_AMOUNT = data['data']['TOTAL_LOAN_AMOUNT'];
//       this.TOTAL_LOAN_TYPES = data['data']['TOTAL_LOAN_TYPES'];
//       this.TOTAL_PRAPOSALS = data['data']['TOTAL_PRAPOSALS'];
//       this.TOTAL_USERS = data['data']['TOTAL_USERS'];
//     }
//     this.countSpins = false;
//   }, err => {
//     console.error('Error:', err);
//     this.countSpins = false;
//   });
// } else {
//   console.log('Branch ID is missing in sessionStorage');
// }



// // this.api.getDashboardCounts(this.branchId).subscribe(
// //   data => {
// //     if (data['code'] == 200) {
// //       const dashboardData = data['data'] || {};
// //       this.APPROVED_DOCUMENTS = dashboardData['APPROVED_DOCUMENTS'] || 0;
// //       this.DISBURSED_LOAN_AMOUNT = dashboardData['DISBURSED_LOAN_AMOUNT'] || 0;
// //       this.DISBURSED_PRAPOSALS = dashboardData['DISBURSED_PRAPOSALS'] || 0;
// //       this.IN_PROCESS_LOAN_AMOUNT = dashboardData['IN_PROCESS_LOAN_AMOUNT'] || 0;
// //       this.IN_PROCESS_PRAPOSALS = dashboardData['IN_PROCESS_PRAPOSALS'] || 0;
// //       this.LOAN_DISBURSED_APPLICANTS = dashboardData['LOAN_DISBURSED_APPLICANTS'] || 0;
// //       this.LOAN_IN_PROCESS_APPLICANTS = dashboardData['LOAN_IN_PROCESS_APPLICANTS'] || 0;
// //       this.LOAN_REJECTED_APPLICANTS = dashboardData['LOAN_REJECTED_APPLICANTS'] || 0;
// //       this.PENDING_DOCUMENTS = dashboardData['PENDING_DOCUMENTS'] || 0;
// //       this.REJECTED_DOCUMENTS = dashboardData['REJECTED_DOCUMENTS'] || 0;
// //       this.REJECTED_LOAN_AMOUNT = dashboardData['REJECTED_LOAN_AMOUNT'] || 0;
// //       this.REJECTED_PRAPOSALS = dashboardData['REJECTED_PRAPOSALS'] || 0;
// //       this.TOTAL_APPLICANTS = dashboardData['TOTAL_APPLICANTS'] || 0;
// //       this.TOTAL_APPLICANT_DOCUMENTS = dashboardData['TOTAL_APPLICANT_DOCUMENTS'] || 0;
// //       this.TOTAL_BRANCHES = dashboardData['TOTAL_BRANCHES'] || 0;
// //       this.TOTAL_DOCUMENTS = dashboardData['TOTAL_DOCUMENTS'] || 0;
// //       this.TOTAL_LOAN_AMOUNT = dashboardData['TOTAL_LOAN_AMOUNT'] || 0;
// //       this.TOTAL_LOAN_TYPES = dashboardData['TOTAL_LOAN_TYPES'] || 0;
// //       this.TOTAL_PRAPOSALS = dashboardData['TOTAL_PRAPOSALS'] || 0;
// //       this.TOTAL_USERS = dashboardData['TOTAL_USERS'] || 0;
// //     }
// //     this.countSpins = false;
// //   },
// //   err => {
// //     console.error("Error fetching data: ", err);
// //     this.countSpins = false;
// //     alert("Failed to load dashboard data. Please try again later.");
// //   }
// // );

//     this.branches = [];
//     this.loadingBranch = true
//     this.api.getAllBranches(0, 0, '', '', '').subscribe(data => {
//       this.branches = data['data'];
//       this.loadingBranch = false
//     }, err => {
//       //console.log(err);
//     });

//     this.users = [];
//     this.loadingUser = true
//     this.api.getAllUsers(0, 0, '', '', '').subscribe(data => {
//       this.loadingUser = false
//       this.users = data['data'];
//     }, err => {
      
//     });

//     this.proposals = [];
//     this.loadingproposal = true
//     this.api.getPraposalNumber(0, 0, '', '', '').subscribe(data => {
//       this.loadingproposal = false
//       this.proposals = data['data'];
//     }, err => {
      
//     });

//     this.api.getAllLoanScheme(0, 0, 'ID', 'asc', '').subscribe(data => {
//       if (data['code'] == "200") {
//         this.loantypes = data['data'];
//         for (var i = 0; i < this.loantypes.length; i++) {
//           if (this.browserLang == 'mr') {
//             this.lineChartLabels2.push(this.loantypes[i].NAME_MR)

//           } else if (this.browserLang == 'en') {
//             this.lineChartLabels2.push(this.loantypes[i].NAME_EN);
//           } else {
//             this.lineChartLabels2.push(this.loantypes[i].NAME_KN);
//           }


//         }
//       }

//     }, err => {
//     });
//   }
  // loadBranchSpecificData(loggedInBranchId: string) {
  //   throw new Error('Method not implemented.');
  // }

  // loadBranchSpecificData(branchId: string): void {
  //   this.countSpins = true;
  //   this.api.getDashboardCounts().subscribe(data => {
  //     if (data['code'] === 200) {
  //       // फक्त सध्याच्या ब्रांचचा डेटा
  //       this.TOTAL_PRAPOSALS = data['data']['TOTAL_PRAPOSALS'];
  //       this.DISBURSED_PRAPOSALS = data['data']['DISBURSED_PRAPOSALS'];
  //       this.IN_PROCESS_PRAPOSALS = data['data']['IN_PROCESS_PRAPOSALS'];
  //       this.REJECTED_PRAPOSALS = data['data']['REJECTED_PRAPOSALS'];
  //     }
  //     this.countSpins = false;
  //   }, err => {
  //     console.error('Error fetching branch-specific data:', err);
  //     this.countSpins = false;
  //   });
  // }



  // loadBranchSpecificData(branchId) {
  //   // Call API to get branch-specific counts or data
  //   this.api.getDashboardCounts(branchId).subscribe(data => {
  //     if (data['code'] == 200) {
  //       // Process the data for the specific branch
  //       this.APPROVED_DOCUMENTS = data['data']['APPROVED_DOCUMENTS'];
  //       // Similarly, assign other counts here
  //     }
  //   }, err => {
  //     console.error('Error fetching branch data: ', err);
  //   });
  // }



  // requestBody
  // ngOnInit(): void {
  //   this.browserLang = localStorage.getItem('locale');
  //   this.selectedDate = [new Date(), new Date()]
  //   this.selectedDate3 = [new Date(), new Date()]
  //   this.selectedDate4 = [new Date(), new Date()]
  //   this.onChange(this.date);
  //   this.onLineChange22(this.selectedDate);
  //   this.onLineChange33(this.selectedDate3);
  //   this.getActivityLogs()
  //   this.countSpins = true
  //   this.branchId = sessionStorage.getItem('branchId'); // sessionStorage मध्ये जतन केलेला branchId मिळवतो


  // //   this.requestBody = {
  // //     branchId: this.loggedInBranchId
  // // };
  //   this.api.getDashboardCounts(this.branchId).subscribe(data => {
  //     if (data['code'] == 200) {
  //       console.log("API Response:", data);

  //       this.APPROVED_DOCUMENTS = data['data']['APPROVED_DOCUMENTS']
  //       this.DISBURSED_LOAN_AMOUNT = data['data']['DISBURSED_LOAN_AMOUNT']
  //       this.DISBURSED_PRAPOSALS = data['data']['DISBURSED_PRAPOSALS']
  //       this.IN_PROCESS_LOAN_AMOUNT = data['data']['IN_PROCESS_LOAN_AMOUNT']
  //       this.IN_PROCESS_PRAPOSALS = data['data']['IN_PROCESS_PRAPOSALS']
  //       this.LOAN_DISBURSED_APPLICANTS = data['data']['LOAN_DISBURSED_APPLICANTS']
  //       this.LOAN_IN_PROCESS_APPLICANTS = data['data']['LOAN_IN_PROCESS_APPLICANTS']
  //       this.LOAN_REJECTED_APPLICANTS = data['data']['LOAN_REJECTED_APPLICANTS']
  //       this.PENDING_DOCUMENTS = data['data']['PENDING_DOCUMENTS']
  //       this.REJECTED_DOCUMENTS = data['data']['REJECTED_DOCUMENTS']
  //       this.REJECTED_LOAN_AMOUNT = data['data']['REJECTED_LOAN_AMOUNT']
  //       this.REJECTED_PRAPOSALS = data['data']['REJECTED_PRAPOSALS']
  //       this.TOTAL_APPLICANTS = data['data']['TOTAL_APPLICANTS']
  //       this.TOTAL_APPLICANT_DOCUMENTS = data['data']['TOTAL_APPLICANT_DOCUMENTS']
  //       this.TOTAL_BRANCHES = data['data']['TOTAL_BRANCHES']
  //       this.TOTAL_DOCUMENTS = data['data']['TOTAL_DOCUMENTS']
  //       this.TOTAL_LOAN_AMOUNT = data['data']['TOTAL_LOAN_AMOUNT']
  //       this.TOTAL_LOAN_TYPES = data['data']['TOTAL_LOAN_TYPES']
  //       this.TOTAL_PRAPOSALS = data['data']['TOTAL_PRAPOSALS']
  //       this.TOTAL_USERS = data['data']['TOTAL_USERS']
  //     }
  //     this.countSpins = false
  //   }, err => {

  //   });

  //   this.branches = [];
  //   this.loadingBranch = true
  //   this.api.getAllBranches(0, 0, '', '', '').subscribe(data => {
  //     this.branches = data['data'];
  //     this.loadingBranch = false
  //   }, err => {
  //     //console.log(err);
  //   });

  //   this.users = [];
  //   this.loadingUser = true
  //   this.api.getAllUsers(0, 0, '', '', '').subscribe(data => {
  //     this.loadingUser = false
  //     this.users = data['data'];
  //   }, err => {
      
  //   });

  //   this.proposals = [];
  //   this.loadingproposal = true
  //   this.api.getPraposalNumber(0, 0, '', '', '').subscribe(data => {
  //     this.loadingproposal = false
  //     this.proposals = data['data'];
  //   }, err => {
      
  //   });

  //   this.api.getAllLoanScheme(0, 0, 'ID', 'asc', '').subscribe(data => {
  //     if (data['code'] == "200") {
  //       this.loantypes = data['data'];
  //       for (var i = 0; i < this.loantypes.length; i++) {
  //         if (this.browserLang == 'mr') {
  //           this.lineChartLabels2.push(this.loantypes[i].NAME_MR)

  //         } else if (this.browserLang == 'en') {
  //           this.lineChartLabels2.push(this.loantypes[i].NAME_EN);
  //         } else {
  //           this.lineChartLabels2.push(this.loantypes[i].NAME_KN);
  //         }


  //       }
  //     }

  //   }, err => {
  //   });
  // }




//   ngOnInit(): void {
//     // Session Storage मधून Branch ID मिळवा
//     this.branchId = sessionStorage.getItem('branchId');
    
//     if (!this.branchId) {
//         console.error("Branch ID not found in session storage.");
//         return;
//     }

//     // API Request तयार करा
//     this.api.getDashboardCounts(this.branchId ).subscribe(
//         data => {
//             if (data['code'] === 200) {
//                 this.TOTAL_USERS = data['data']['TOTAL_USERS'] || 0;
//                 this.TOTAL_DOCUMENTS = data['data']['TOTAL_DOCUMENTS'] || 0;
//                 this.TOTAL_LOAN_TYPES = data['data']['TOTAL_LOAN_TYPES'] || 0;
//                 this.TOTAL_PRAPOSALS = data['data']['TOTAL_PRAPOSALS'] || 0;             
//                 this.IN_PROCESS_PRAPOSALS = data['data']['IN_PROCESS_PRAPOSALS']|| 0;
//                 this.DISBURSED_PRAPOSALS = data['data']['DISBURSED_PRAPOSALS'] || 0;
//                 this.REJECTED_PRAPOSALS = data['data']['REJECTED_PRAPOSALS']|| 0;
// } else {
//                 console.error("Failed to fetch dashboard counts:", data['message']);
//             }
//         },
//         err => {
//             console.error("Error fetching dashboard counts:", err);
//         }
//     );
// }


// requestBody

// ngOnInit(): void {
//   // SessionStorage मधून Branch ID मिळवा
//   this.branchId = sessionStorage.getItem('branchId');
//   if (!this.branchId) {
//       console.error('Branch ID is missing');
//       return;
//   }

//   // Request Body तयार करा
//   this.requestBody = {
//       branchId: this.branchId,
//       pageIndex: this.pageIndex || 1,   // Default pageIndex
//       pageSize: this.pageSize || 10,    // Default pageSize
//       sortKey: this.sortKey || 'ID',    // Default sortKey
//       sortValue: this.sortValue || 'DESC'  // Default sortValue
//   };

//   // API कॉल करा
//   this.api.getDashboardCounts(this.requestBody).subscribe(
//       data => {
//         if (data['code'] === 200) {
//                           this.TOTAL_USERS = data['data']['TOTAL_USERS'] || 0;
//                           this.TOTAL_DOCUMENTS = data['data']['TOTAL_DOCUMENTS'] || 0;
//                           this.TOTAL_LOAN_TYPES = data['data']['TOTAL_LOAN_TYPES'] || 0;
//                           this.TOTAL_PRAPOSALS = data['data']['TOTAL_PRAPOSALS'] || 0;             
//                           this.IN_PROCESS_PRAPOSALS = data['data']['IN_PROCESS_PRAPOSALS']|| 0;
//                           this.DISBURSED_PRAPOSALS = data['data']['DISBURSED_PRAPOSALS'] || 0;
//                           this.REJECTED_PRAPOSALS = data['data']['REJECTED_PRAPOSALS']|| 0;
//           }
//       },
//       error => {
//           console.error("Error fetching data:", error);
//       }
//   );
// }


  loadingProposalStages = false
  proposalStages: Proposalstage[]


  loadProposalStage() {
    this.loadingProposalStages = true;
    let filter = "AND STATUS=1"
    this.api.getAllProposalStages(0, 0, 'SEQUENCE_NUMBER', 'asc', filter).subscribe(localName => {
      this.proposalStages = localName['data'];
      this.loadingProposalStages = false;
    }, err => {
      ////console.log(err);
      this.loadingProposalStages = false;
    });

    if (this.branchId == '0') {
      this.api.getAllBranches(0, 0, 'ID', "asc", "")
        .subscribe(successCode => {
          if (successCode['code'] == "200") {
            this.branchData = successCode['data'];
          }
        });
    }
  }

  
  branchProposalCount: number = 0;


  loadBranchProposalCount() {
    
    this.api.getDashboardCounts().subscribe(data => {
      if (data['code'] == "200") {
        // प्रत्येक ब्रांचसाठी काउंट मिळवून काहीतरी करा
        this.branchProposalCount = data['data'].proposalCount;
      } else {
        // एरर हँडलिंग
      }
    }, err => {
      // एरर हँडलिंग
      console.error(err);
    });
  }

  
// ngOnInit(): void {
//   this.branchId = sessionStorage.getItem('branchId'); // सध्याच्या ब्रांचचा ID मिळवा

//   if (this.branchId) {
//     // this.loadBranchSpecificData(this.branchId); // Load data based on branchId
//   } else {
//     console.error('Branch ID not found in session storage.');
//   }

//   if (this.cookie.get('token') === '' || this.cookie.get('token') === null) {
//     this.isLogedIn = false;
//     // this.isLogedIn=true;
//   }
//   else {
//     if (this.userId || this.roleId != 0) {
//       this.isLogedIn = true;
//       //this.accessPageForRedirect()

//       // this.loadForms()
//     }
//     else {
//       this.api.logoutForSessionValues()
//     }
//   }



//   // Initialize other values
//   this.browserLang = localStorage.getItem('locale');
//   this.selectedDate = [new Date(), new Date()];
//   this.selectedDate3 = [new Date(), new Date()];
//   this.selectedDate4 = [new Date(), new Date()];
//   this.onChange(this.date);
//   this.onLineChange22(this.selectedDate);
//   this.onLineChange33(this.selectedDate3);
//   this.getActivityLogs();
//   this.loadProposalStage();
//   this.countSpins = true;
// }

// loadBranchSpecificData(branchId: string) {
//   // Call API to get branch-specific counts or data
//   this.api.getDashboardCounts(branchId).subscribe(data => {
//     if (data['code'] == 200) {
//       // Process the data for the specific branch
//       this.APPROVED_DOCUMENTS = data['data']['APPROVED_DOCUMENTS'];
//       this.DISBURSED_LOAN_AMOUNT = data['data']['DISBURSED_LOAN_AMOUNT'];
//       this.DISBURSED_PRAPOSALS = data['data']['DISBURSED_PRAPOSALS'];
//       this.IN_PROCESS_LOAN_AMOUNT = data['data']['IN_PROCESS_LOAN_AMOUNT'];
//       this.IN_PROCESS_PRAPOSALS = data['data']['IN_PROCESS_PRAPOSALS'];
//       this.LOAN_DISBURSED_APPLICANTS = data['data']['LOAN_DISBURSED_APPLICANTS'];
//       this.LOAN_IN_PROCESS_APPLICANTS = data['data']['LOAN_IN_PROCESS_APPLICANTS'];
//       this.LOAN_REJECTED_APPLICANTS = data['data']['LOAN_REJECTED_APPLICANTS'];
//       this.PENDING_DOCUMENTS = data['data']['PENDING_DOCUMENTS'];
//       this.REJECTED_DOCUMENTS = data['data']['REJECTED_DOCUMENTS'];
//       this.REJECTED_LOAN_AMOUNT = data['data']['REJECTED_LOAN_AMOUNT'];
//       this.REJECTED_PRAPOSALS = data['data']['REJECTED_PRAPOSALS'];
//       this.TOTAL_APPLICANTS = data['data']['TOTAL_APPLICANTS'];
//       this.TOTAL_APPLICANT_DOCUMENTS = data['data']['TOTAL_APPLICANT_DOCUMENTS'];
//       this.TOTAL_BRANCHES = data['data']['TOTAL_BRANCHES'];
//       this.TOTAL_DOCUMENTS = data['data']['TOTAL_DOCUMENTS'];
//       this.TOTAL_LOAN_AMOUNT = data['data']['TOTAL_LOAN_AMOUNT'];
//       this.TOTAL_LOAN_TYPES = data['data']['TOTAL_LOAN_TYPES'];
//       this.TOTAL_PRAPOSALS = data['data']['TOTAL_PRAPOSALS'];
//       this.TOTAL_USERS = data['data']['TOTAL_USERS'];
//     }
//     this.countSpins = false;
//   }, err => {
//     console.error('Error fetching branch data: ', err);
//   });
// }

// loadingProposalStages = false;
// proposalStages: Proposalstage[];

// loadProposalStage() {
//   this.loadingProposalStages = true;
//   let filter = "AND STATUS=1";
//   this.api.getAllProposalStages(0, 0, 'SEQUENCE_NUMBER', 'asc', filter).subscribe(localName => {
//     this.proposalStages = localName['data'];
//     this.loadingProposalStages = false;
//   }, err => {
//     console.error(err);
//     this.loadingProposalStages = false;
//   });
// }



pageIndex = 1;
loadingRecords = true;
isSpinning: boolean
sortValue: string = "desc";
logtext: string = "";



// search(reset: boolean = false) {
//   // if (reset) {
//   //   this.pageIndex = 1;
//   // }
//   // this.loadingRecords = true;
//   // this.isSpinning = true
//   var sort: string;
//   // try {
//     sort = this.sortValue.startsWith("a") ? "asc" : "desc";

//   //   this.logtext = "Filter Applied - Praposals form" + sort + " " + this.sortKey + " KEYWORD [F - Praposals] ";
//   //   this.api.addLog('A', this.logtext, this.api.emailId)
//   //     .subscribe(successCode => {
//   //       if (successCode['code'] == "200") {
//   //         ////console.log(successCode);
//   //       }
//   //       else {
//   //         ////console.log(successCode);
//   //       }
//   //     });
//   //   this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
//   //   this.userActivityLogData.ACTIVITY_DETAILS = "ApplicantProposal - Sort on " + sort + " " + this.sortKey
//   //   this.userActivityLogData.ACTIVITY_TIME = new Date()
//   //   this.api.createUserActivityLog(this.userActivityLogData)
//   //     .subscribe(successCode => {
//   //       if (successCode['code'] == "200") {
//   //         ////console.log(successCode);
//   //       }
//   //       else {
//   //         ////console.log(successCode);
//   //       }
//   //     });

//   // } catch (error) {
//   //   sort = "";
//   // }
//   // var likeQuery = ""
//   // ////console.log("search text:" + this.searchText);
//   // if (this.searchText != "") {
//   //   likeQuery = " AND (";

//   //   this.columns.forEach(column => {
//   //     likeQuery += " " + column[0] + " like '%" + this.searchText + "%' OR";
//   //   });
//   //   likeQuery = likeQuery.substring(0, likeQuery.length - 2) + ")"
//   // }



//   var filter = ""
//   // if (Number(this.branchId) == 0) {
//   //   if (likeQuery)
//   //     filter = this.filterQuery + likeQuery
//   //   else
//   //     filter = this.filterQuery
//   // }
//   // else {
//   //   if (likeQuery)
//   //      filter = "AND BRANCH_ID=" + this.branchId + this.filterQuery + likeQuery
//   //   else
//   //     filter = "AND BRANCH_ID=" + this.branchId + this.filterQuery
//   // }



//   // this.logtext = "Filter Applied - Praposals form " + likeQuery + " KEYWORD [F - Praposals] ";
//   // this.api.addLog('A', this.logtext, this.api.emailId)
//   //   .subscribe(successCode => {
//   //     if (successCode['code'] == "200") {
//   //       ////console.log(successCode);
//   //     }
//   //     else {
//   //       ////console.log(successCode);
//   //     }
//   //   });

//   // this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
//   // this.userActivityLogData.ACTIVITY_DETAILS = "ApplicantProposal - Search For " + this.searchText + " " + likeQuery
//   // this.userActivityLogData.ACTIVITY_TIME = new Date()
//   // this.api.createUserActivityLog(this.userActivityLogData)
//   //   .subscribe(successCode => {
//   //     if (successCode['code'] == "200") {
//   //       ////console.log(successCode);
//   //     }
//   //     else {
//   //       ////console.log(successCode);
//   //     }
//   //   });

//   ////console.log("filter applied")
//   ////console.log(filter)

//   this.api.getAllPraposals(this.pageIndex, this.pageSize, this.sortKey, sort, filter).subscribe(data => {
//     ////console.log("data")
//     ////console.log(data)
//     this.loadingRecords = false;
//     this.isSpinning = false
//     this.totalRecords = data['count'];
//     this.dataList = data['data'];
//     console.log("dataList in getAllProposal",this.dataList);
//     this.filterClass = "filter-invisible";
//     this.isFilterApplied = "primary"
//   }, err => {
//     ////console.log(err);
//     if (err['ok'] == false)
//       this.message.error(this.api.translate.instant('common.Server_Not_Found'), "");
//   });

//   this.api.getAllPraposals(0, 0, this.sortKey, sort, filter).subscribe(data => {
//     this.dataList1 = data['data'];
//   }, err => {
//     ////console.log(err);
//     if (err['ok'] == false)
//       this.message.error(this.api.translate.instant('common.Server_Not_Found'), "");
//   });
// }

  pageSize = 10;
  totalRecords = 1;
  dataList = [];
  dataList1 = [];
  LOAN_TYPE_ID = "AL"
  // loadingRecords = true;
  // sortValue: string = "desc";
  sortKey: string = "id";
  searchText: string = "";
  // filterQuery: string = "";
  isFilterApplied: string = "default";
  // logtext: string = "";
  isVisible = false
  filterClass: string = "filter-visible";





  onLineChange(event) {
    this.COUNT_TYPE = event
    if (this.date == undefined || this.date == null) {
      this.message.error("Please Select Month", "");
    }
    else {
      this.onChange(this.date);
    }
  }
  onChange(result: Date): void {
    this.lineSpins = true
    var month_names_short = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    var lastDate = new Date(result.getFullYear(), result.getMonth() + 1, 0);
    this.lineChartLabels = []
    this.lineChartData = [
      { data: [], label: this.COUNT_TYPE == 'A' ? 'Amount' : 'Count' }
    ];

    this.api.getLineChartdata((result.getMonth() + 1), result.getFullYear(), this.COUNT_TYPE).subscribe(data => {
      if (data['code'] == 200) {
        for (var i = 0; i < lastDate.getDate(); i++) {
          this.lineChartLabels.push((i + 1) + "-" + month_names_short[result.getMonth()])
          this.lineChartData[0].data.push(data['data'][i]['COUNT']);
        }
      }
      this.lineSpins = false
    }, err => {

    });
  }

  onLineChange2(event) {
    this.COUNT_TYPE2 = event
    this.lineChartData2 = [
      { data: [], label: this.COUNT_TYPE2 == 'A' ? 'Amount' : 'Count' }
    ];
    if (this.COUNT_TYPE2 == 'A') {
      this.lineChartData2[0].data = this.labels1
    } else {
      this.lineChartData2[0].data = this.labels2
    }

  }

  onLineChange22(event) {
    this.selectedDate = event
    this.value1 = this.datePipe.transform(this.selectedDate[0], "yyyy-MM-dd")
    this.value2 = this.datePipe.transform(this.selectedDate[1], "yyyy-MM-dd")
    this.onChange2();

  }

  onChange2(): void {
    this.lineSpins2 = true
    this.lineChartData2 = [
      { data: [], label: this.COUNT_TYPE2 == 'A' ? 'Amount' : 'Count' }
    ];
    this.labels1 = []
    this.labels2 = []
    this.api.loanTypeLineChart(0, 0, 'ID', 'ASC', " AND ( CREATED_ON_DATETIME BETWEEN '" + this.value1 + ":00:00:00" + "' AND '" + this.value2 + ":23:59:59" + "' ) ").subscribe(data => {
      if (data['code'] == 200) {
        for (var i = 0; i < data['data'].length; i++) {
          this.labels1.push(data['data'][i]['TOTAL_AMOUNT']);
          this.labels2.push(data['data'][i]['CNT']);

          if (i == (data['data'].length - 1))
            this.onLineChange2(this.COUNT_TYPE2)
        }
      }
      this.lineSpins2 = false
    }, err => {

    });
  }

  onLineChange3(event) {
    this.COUNT_TYPE3 = event
    this.lineChartData3 = [
      { data: [], label: this.COUNT_TYPE3 == 'A' ? 'Amount' : 'Count' }
    ];
    if (this.COUNT_TYPE3 == 'A') {
      this.lineChartData3[0].data = this.labels3
    } else {
      this.lineChartData3[0].data = this.labels4
    }

  }

  onLineChange33(event) {
    this.selectedDate3 = event
    this.value3 = this.datePipe.transform(this.selectedDate3[0], "yyyy-MM-dd")
    this.value4 = this.datePipe.transform(this.selectedDate3[1], "yyyy-MM-dd")
    this.onChange3();

  }

  onChange3(): void {
    this.lineSpins3 = true
    this.lineChartData3 = [
      { data: [], label: this.COUNT_TYPE3 == 'A' ? 'Amount' : 'Count' }
    ];
    this.labels3 = []
    this.labels4 = []
    this.lineChartLabels3 = []
    this.api.getBranchLineChart(0, 0, 'ID', 'ASC', " AND ( CREATED_ON_DATETIME BETWEEN '" + this.value3 + ":00:00:00" + "' AND '" + this.value4 + ":23:59:59" + "' ) ").subscribe(data => {
      if (data['code'] == 200) {
        for (var i = 0; i < data['data'].length; i++) {
          this.lineChartLabels3.push(data['data'][i]['NAME_MR'])
          this.labels3.push(data['data'][i]['TOTAL_AMOUNT']);
          this.labels4.push(data['data'][i]['CNT']);

          if (i == (data['data'].length - 1))
            this.onLineChange3(this.COUNT_TYPE3)
        }
      }
      this.lineSpins3 = false
    }, err => {

    });
  }
  changeProposal(event){
    this.PROPOSAL_ID =event;
    this.getActivityLogs2() 
  }
  changeBranch(event){
    this.BRANCH_ID =event;
    this.getActivityLogs2() 
  }
  changeUser(event){
    this.USER_ID =event;
    this.getActivityLogs2() 
  }
  onLineChange4(event) {
    this.selectedDate4 = event
    this.value5 = this.datePipe.transform(this.selectedDate4[0], "yyyy-MM-dd")
    this.value6 = this.datePipe.transform(this.selectedDate4[1], "yyyy-MM-dd")
    this.getActivityLogs2() 

  }

  getActivityLogs2() {
    this.filterQuery =''
    if (this.value5 == "" && this.value6 == "") {
      this.filterQuery = ""
    }
    else {
      this.filterQuery = " AND ( CREATED_ON_DATETIME BETWEEN '" + this.value1 + ":00:00:00" + "' AND '" + this.value2 + ":23:59:59" + "' ) "
    }

    if (this.PROPOSAL_ID == 'AL') {
      this.filterQuery = this.filterQuery
    }
    else {
      this.filterQuery += " AND PROPOSAL_ID=" + this.PROPOSAL_ID
    }

    if (this.USER_ID == 'AL') {
      this.filterQuery = this.filterQuery
    }
    else {
      this.filterQuery += " AND USER_ID=" + this.USER_ID
    }
    if (this.BRANCH_ID == 'AL') {
      this.filterQuery = this.filterQuery
    }
    else {
      this.filterQuery += " AND BRANCH_ID=" + this.BRANCH_ID
    }
    this.getActivityLogs() 
  }

  getActivityLogs(reset: boolean = false) {
    this.loadingRecords2 = true;
    this.api.getAllEnquiaryLogInformation(this.pageIndex2, this.pageSize2, this.sortKey2, this.sortValue2, this.filterQuery).subscribe(data => {
      this.totalRecords2 = data['count'];

      this.listOfData3 = data['data'];
      this.loadingRecords2 = false;

    }, err => {
      this.loadingRecords2 = false;
      
    });
  }

  sort(sort: { key: string; value: string }): void {
    this.sortKey2 = sort.key;
    this.sortValue2 = sort.value;
    this.getActivityLogs(true);
  } 
}
