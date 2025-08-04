import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';
import { RemarkList } from 'src/app/Models/PersonalProposal/remarklist';
import { ApiService } from 'src/app/Service/api.service';

@Component({
  selector: 'app-remarklist',
  templateUrl: './remarklist.component.html',
  styleUrls: ['./remarklist.component.css']
})
export class RemarklistComponent implements OnInit {


  @Input() PROPOSAL_ID: Number;
  @Input() oldIndex: number;
  @Input() CURRENT_STAGE_ID: number

  data:RemarkList = new RemarkList
  dataList = [];
  pageIndex = 1;
  pageSize = 10;
  totalRecords = 1;
  // dataList = [];
  loadingRecords = true;
  sortValue: string = "desc";
  sortKey: string = "ID";
  searchText: string = "";

  columns: string[][] =[["EMP_ID", this.api.translate.instant('remarklist.label')], 
                        ["DATE", this.api.translate.instant('remarklist.label1')], 
                        ["TYPE", this.api.translate.instant('remarklist.label2')], 
                        ['REMARK', this.api.translate.instant('remarklist.label3')]]

  constructor(private api: ApiService, private datePipe: DatePipe, private message: NzNotificationService ) { }

  ngOnInit(): void {

    this.getRemark()
  }


  getRemark(): void {
    //var likeQuery = "EMAIL_ID=" + emailId + "";
    this.api.getAllRemark(this.pageIndex, this.pageSize, this.sortKey, '', '').subscribe(data => {
      this.loadingRecords = false;
      // this.totalRecords = data['count'];
      this.dataList = data['data'];
    }, err => {
      console.log(err);
      if (err['ok'] == false)
        {
          
        }
    });
  }

  save(addNew: boolean): void {
  
   // this.isSpinning = true;
    if (this.data.ID) {

      // this.data.EMP_ID = this.data.EMP_ID
      // this.data.
  
      this.api.createremark(this.data,this.data.ID)
        .subscribe(successCode => {
          if (successCode['code'] == "200") {
            this.message.success(this.api.translate.instant('user.message3'), "");
          //   if (!addNew)
          //     this.drawerClose();
          //   else {
          //     this.data = new User();
          //   }
          //   this.isSpinning = false;
          }// }

          else {
            this.message.error(this.api.translate.instant('user.message4'), "");
            // this.isSpinning = false;
          }
        });
    }
  }

}
