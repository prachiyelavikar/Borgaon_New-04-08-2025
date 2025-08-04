import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiService } from 'src/app/Service/api.service';

@Component({
  selector: 'app-file-template',
  templateUrl: './file-template.component.html',
  styleUrls: ['./file-template.component.css']
})
export class FileTemplateComponent implements OnInit {
  @Output() close: EventEmitter<any> = new EventEmitter<any>()
  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.getColumn()
  }

  columns = []
  SELECTED: number = 1;
  table_name = ''
  fileName = ''

  options = [
    { label: 'Personal', value: 1 },
    { label: 'Property', value: 2 },
    { label: 'Salary', value: 3 },
    { label: 'Business', value: 4 },
    { label: 'Profession', value: 5 },
    { label: 'Agriculture income', value: 6 },
    { label: 'Other income', value: 7 },
    { label: 'Loan Info', value: 8 },
    { label: 'Deposit Info', value: 9 },
    { label: 'Guarantor History', value: 10 },
    { label: 'Financial Info', value: 11 },
  ]




  getColumn() {
    switch (this.SELECTED) {
      case 1:
        this.table_name = 'customer_personal';
        this.fileName = 'Personal';
        break;

      case 2:
        this.table_name = 'customer_property';
        this.fileName = 'Property';
        break;

      case 3:
        this.table_name = 'customer_salary';
        this.fileName = 'Salary';
        break;

      case 4:
        this.table_name = 'customer_business';
        this.fileName = 'Business';
        break;

      case 5:
        this.table_name = 'customer_prof';
        this.fileName = 'Profession';
        break;

      case 6:
        this.table_name = 'customer_agri';
        this.fileName = 'Agriculture income';
        break;

      case 7:
        this.table_name = 'customer_other_income';
        this.fileName = 'Other income';
        break;

      case 8:
        this.table_name = 'customer_loan_taken';
        this.fileName = 'Loan Info';
        break;

      case 9:
        this.table_name = 'customer_deposit';
        this.fileName = 'Deposit Info';
        break;

      case 10:
        this.table_name = 'customer_guarantor_history';
        this.fileName = 'Guarantor History';
        break;

      case 11:
        this.table_name = 'customer_financial';
        this.fileName = 'Financial Info';
        break;

    }

    this.api.getColumn(this.table_name).subscribe({
      next: (res) => {
        if (res['code'] == 200) {
          this.columns = res['data'];
        }
      }
    })
  }

}
