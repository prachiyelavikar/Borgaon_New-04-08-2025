import { Component, Input, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';
import { BmScrutiny } from 'src/app/Models/PersonalProposal/scrutiny';
import { ApiService } from 'src/app/Service/api.service';

@Component({
  selector: 'app-scrutiny',
  templateUrl: './scrutiny.component.html',
  styleUrls: ['./scrutiny.component.css']
})
export class ScrutinyComponent implements OnInit {
  data: BmScrutiny = new BmScrutiny();
  @Input() PROPOSAL_ID
  browserLang
  isSpinning = false
  isButtonSpinning = false;
  constructor(private api: ApiService, private message: NzNotificationService) { }

  ngOnInit(): void {
    this.getData()
  }


  save() {
    if (this.data.ID) {
      this.api.updateBmScrutiny(this.data).subscribe({
        next: (res) => {
          if (res['code'] == 200) {
            this.getData()
            this.message.success("Successfully updated Information", '');
          }
          else {
            this.message.error("Failed to update Information", '');
          }
        },
        error: () => {
          this.message.error("Failed to update Information", '');
        }
      })
    }
    else {
      this.data.PROPOSAL_ID = this.PROPOSAL_ID;
      this.api.createBmScrutiny(this.data).subscribe({
        next: (res) => {
          if (res['code'] == 200) {
            this.getData()
            this.message.success("Successfully create Information", '');
          }
          else {
            this.message.error("Failed to create Information", '');
          }
        },
        error: () => {
          this.message.error("Failed to create Information", '');
        }
      })
    }
  }

  getData() {
    this.data = new BmScrutiny()
    this.api.getBmScrutiny(this.PROPOSAL_ID).subscribe({
      next: (res) => {
        if (res['code'] == 200 && res['data'].length > 0) {
          this.data = res['data'][0]
          console.log("THIS IS DATA OF BM SCRUTINY", this.data)
          //this.getLowest();
        }
        else {
          this.data = new BmScrutiny()
        }

      },
      error: () => {
        this.data = new BmScrutiny()
      }
    });

  }

}
