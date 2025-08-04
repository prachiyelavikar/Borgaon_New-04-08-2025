import { Component, OnInit, ViewChild } from '@angular/core';
import { Branchmaster } from 'src/app/Models/BasicForms/branchmaster';
import { ApiService } from 'src/app/Service/api.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Useractivitylog } from 'src/app/Models/Applicant/useractivitylog';
import { AssignBranchmaster } from 'src/app/Models/BasicForms/assignbranch';
import { AssignbranchesComponent } from '../assignbranches/assignbranches.component';

@Component({
  selector: 'app-assignbrancheslist',
  templateUrl: './assignbrancheslist.component.html',
  styleUrls: ['./assignbrancheslist.component.css']
})
export class AssignbrancheslistComponent implements OnInit {

  formTitle = this.api.translate.instant('branches.formTitle');
  pageIndex = 1;
  pageSize = 100;
  totalRecords = 1;
  dataList = [];
  loadingRecords = true;
  sortValue: string = "desc";
  sortKey: string = "id";
  searchText: string = "";
  filterQuery: string = "";
  isFilterApplied: string = "default";
  logtext: string = "";
  dataList1 = []
  browserLang = ''
  dataL = []
  assignho1 = []
  drawerData2: string[];
  columns: string[][] = [['NAME', this.api.translate.instant('branches.columns111')]]


  drawerVisible: boolean;
  drawerTitle: string;
  drawerData: AssignBranchmaster = new AssignBranchmaster();
  userActivityLogData: Useractivitylog = new Useractivitylog();

  constructor(private api: ApiService, private message: NzNotificationService) { }
  ngOnInit() {
    this.search();
    this.browserLang = localStorage.getItem('locale');

    this.logtext = "OPENED - Branches form KEYWORD[O - Branches] ";
    this.api.addLog('A', this.logtext, this.api.emailId)
      .subscribe(successCode => {
        if (successCode['code'] == "200") {

        }
        else {
        }
      });

    this.userActivityLogData.USER_ID = Number(sessionStorage.getItem('userId'))
    this.userActivityLogData.ACTIVITY_DETAILS = "Branches - Opened"
    this.userActivityLogData.ACTIVITY_TIME = new Date()
    this.api.createUserActivityLog(this.userActivityLogData)
      .subscribe(successCode => {
        if (successCode['code'] == "200") {

        }
        else {

        }
      });
  }

  sort(sort: { key: string; value: string }): void {
    this.sortKey = sort.key;
    this.sortValue = sort.value;
    this.search(true);
  }

  search(reset: boolean = false) {

    let likeQuery = ` AND ROLE_ID IN (12,14) `
    this.api.getAllUsers(this.pageIndex, this.pageSize, this.sortKey, null, likeQuery).subscribe(data => {
      this.loadingRecords = false;
      this.totalRecords = data['count'];
      this.dataList = data['data'];

      console.log(this.dataList)
    }, err => {
      if (err['ok'] == false)
        this.message.error(this.api.translate.instant('common.Server_Not_Found'), "");
    });
  }

  get closeCallback() {
    return this.drawerClose.bind(this);
  }

  @ViewChild(AssignbranchesComponent) assignFilter: AssignbranchesComponent;

  mapbranch(data): void {
    this.assignFilter.user_details = data;

    this.assignFilter.getFilter();

    this.drawerTitle = "Manage Branches";
    this.drawerVisible = true;
    // var filter = " AND USER_ID=" + data.ID
    // this.drawerData = Object.assign({}, data);
    // this.api.getAllAssignBranches1(this.pageIndex, this.pageSize, this.sortKey, '',filter).subscribe(data => {

    //   this.drawerData2 =data['data'];

    //   for (let i = 0; i < this.drawerData2.length; i++) {
    //     this.assignho1.push(this.drawerData2[i]['BRANCH_ID'])
    //     console.log(this.assignho1)
    //     if(i+1==this.drawerData2.length){
    //       this.drawerTitle = "Manage Branches";   
    //       this.drawerData.BRANCH_IDS=this.assignho1
    //       this.drawerVisible = true;
    //     }
    //   }

    //   }, err => {
    //   console.log(err);
    // });

  }

  drawerClose(): void {
    this.search();
    this.drawerVisible = false;
    this.assignho1 = []
  }
}


