import { Component, Input, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';
import { ApiService } from 'src/app/Service/api.service';
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {

  public mask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  autoCorrectedDatePipe = createAutoCorrectedDatePipe('dd/mm/yyyy HH:MM')

  constructor(private api: ApiService, private message: NzNotificationService) { }

  ngOnInit(): void {
    if (this.CID) {
      this.getData()
    }

  }

  @Input() CID: number
  Table = "customer_personal"

  personalData: Personal = new Personal();

  getData() {
    this.api.getCustomerData(this.CID, this.Table).subscribe({
      next: (res) => {
        if (res['code'] == 200 && res['data'].length > 0) {
          this.personalData = res['data'][0];
        }
      }
    })
  }

  save() {
    this.api.updateCustomerData([this.personalData], this.Table, 'CID').subscribe({
      next: (res) => {
        if (res['code'] == 200) {
          this.message.success("Updated Successfully", "");
        }
        else {
          this.message.error("Failed to update", "");
        }

      },
      error: (err) => {
        this.message.error("Failed to update", "");
      }
    })
  }

}

class Personal {
  ID: number
  CID: number;
  UID: number;
  NAME: string;
  DOB: string;
  GENDER: string;
  PAN: string;
  AADHAAR: string;
  EMAIL_ID: string;
  MOBILE_NO: string;
  RELIGION: string;
  EDUCATION: string;
}
