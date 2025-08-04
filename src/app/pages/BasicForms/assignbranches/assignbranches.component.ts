import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/Models/Commonmodule/user';
import { ApiService } from 'src/app/Service/api.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Branchmaster } from 'src/app/Models/BasicForms/branchmaster';
import { Useractivitylog } from 'src/app/Models/Applicant/useractivitylog';
import { AssignBranchmaster } from 'src/app/Models/BasicForms/assignbranch';
import { Filter } from './filter';

@Component({
  selector: 'app-assignbranches',
  templateUrl: './assignbranches.component.html',
  styleUrls: ['./assignbranches.component.css']
})
export class AssignbranchesComponent implements OnInit {
  @Input() drawerClose: Function;
  @Input() data: AssignBranchmaster;
  @Input() data2: []
  user_details: User = new User();
  isSpinning = false
  logtext: string = "";
  branchData = [];
  loanProduts = [];
  users: User[];
  users1: User[];
  userData: User = new User()
  userVisible: boolean
  browserLang = ''
  loanData: any = [];
  assistantUserData = []
  userTitle: string = ""
  userActivityLogData: Useractivitylog = new Useractivitylog();
  selectedbranch: any = []
  selectedloan: any = []
  loanamountrange: any = { MIN: null, MAX: null };
  selectedAssistants: any = []

  filterData: Filter = new Filter();

  constructor(private api: ApiService, private message: NzNotificationService) {
  }

  ngOnInit() {
    this.loadusers();
    this.loadloantypes();
    this.getAssitant();
    this.browserLang = localStorage.getItem('locale');
  }

  loadusers() {
    this.api.getAllBranches(0, 0, 'ID', "asc", "")
      .subscribe(successCode => {
        if (successCode['code'] == "200") {
          this.branchData = successCode['data'];
        }
      });
  }


  loadloantypes() {
    this.api.getAllLoanScheme(0, 0, "ID", "asc", " AND IS_ACTIVE = 1")
      .subscribe(successCode => {
        if (successCode['code'] == "200") {
          this.loanData = successCode['data'];
        }
      });
  }

  getFilter() {
    this.api.getUserFilterData(this.user_details.ID).subscribe({
      next: (res) => {
        if (res['code'] == 200) {
          if (this.user_details.ROLE_ID == 12) {
            this.selectedbranch = (res['data'].filter((val) => val.KEY == 'BRANCH_ID').length > 0 ? res['data'].filter((val) => val.KEY == 'BRANCH_ID')[0].VALUE : []);
            this.selectedloan = (res['data'].filter((val) => val.KEY == 'LOAN_TYPE_ID').length > 0 ? res['data'].filter((val) => val.KEY == 'LOAN_TYPE_ID')[0].VALUE : []);
            this.loanamountrange = (res['data'].filter((val) => val.KEY == 'LOAN_TYPE_ID').length > 0 ? res['data'].filter((val) => val.KEY == 'LOAN_TYPE_ID')[0].VALUE : { MIN: null, MAX: null });
          }
          else if (this.user_details.ROLE_ID == 14) {
            this.selectedAssistants = (res['data'].filter((val) => val.KEY == 'ASSISTANT_LO_ID').length > 0 ? res['data'].filter((val) => val.KEY == 'ASSISTANT_LO_ID')[0].VALUE : []);
          }
        }
        else {

        }
      },
      error: (error) => {
        console.log("Error in getFilter : ", error)
      }
    })
  }

  getAssitant() {
    let likeQuery = ` AND ROLE_ID = 12`
    this.api.getAllUsers(0, 0, 'ID', null, likeQuery).subscribe(data => {
      if (data['code'] == 200) {
        this.assistantUserData = data['data'];
      }
    }, err => {
      if (err['ok'] == false)
        this.message.error(this.api.translate.instant('common.Server_Not_Found'), "");
    });
  }



  close(): void {
    this.drawerClose();

    this.logtext = 'CLOSED - Branch form';
    this.api.addLog('A', this.logtext, this.api.emailId)
      .subscribe(successCode => {
        if (successCode['code'] == "200") {
          //console.log(successCode);
        }
        else {
          //console.log(successCode);
        }
      });

    this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
    this.userActivityLogData.ACTIVITY_DETAILS = "Branches - Close Clicked"
    this.userActivityLogData.ACTIVITY_TIME = new Date()
    this.api.createUserActivityLog(this.userActivityLogData)
      .subscribe(successCode => {
        if (successCode['code'] == "200") {

        }
        else {

        }
      });


  }

  save() {

    this.filterData.USER_ID = this.user_details.ID;

    if (this.user_details.ROLE_ID == 12) {
      this.filterData.FILTERS = [
        { VALUE: this.selectedbranch, TYPE: 'list', KEY: 'BRANCH_ID' },
        { VALUE: this.selectedloan, TYPE: 'list', KEY: 'LOAN_TYPE_ID' },
        { VALUE: { MIN: this.loanamountrange.MIN, MAX: this.loanamountrange.MAX }, TYPE: 'range', KEY: 'LOAN_AMOUNT' }
      ]
    }
    else if (this.user_details.ROLE_ID == 14) {
      this.filterData.FILTERS = [
        { VALUE: this.selectedAssistants, TYPE: 'list', KEY: 'ASSISTANT_LO_ID' }
      ]
    }

    this.api.createUserFilter(this.filterData).subscribe({
      next: (res) => {
        if (res['code'] == 200) {
          console.log("Call Successful")
          this.drawerClose();
        }

      }
    })
  }

  getdata() {
    var filter = " AND USER_ID=" + this.data.ID
    this.api.getAllAssignBranches1(0, 0, '', '', filter).subscribe(data => {

      this.data = data['data'];


      //  var name2 =  data['data']['NAME']
    }, err => {
      console.log(err);
    });
  }

  addNewUser() {
    this.userVisible = true;
    this.userTitle = this.api.translate.instant('branch.drawert1')
    this.userData = new User();
    this.userData.ROLE_ID = 16

    this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
    this.userActivityLogData.ACTIVITY_DETAILS = "User Add Clicked" + JSON.stringify(this.data)
    this.userActivityLogData.ACTIVITY_TIME = new Date()
    this.api.createUserActivityLog(this.userActivityLogData)
      .subscribe(successCode => {
        if (successCode['code'] == "200") {
          //console.log(successCode);
        }
        else {
          //console.log(successCode);
        }
      });
  }
  userClose(): void {
    this.loadusers()
    this.loadloantypes()
    this.userVisible = false;
  }

  get callbackPartClose() {
    return this.userClose.bind(this);
  }

}