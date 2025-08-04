import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';
import { ApiService } from 'src/app/Service/api.service';

@Component({
  selector: 'app-add-column',
  templateUrl: './add-column.component.html',
  styleUrls: ['./add-column.component.css']
})
export class AddColumnComponent implements OnInit {
  @Output() close: EventEmitter<any> = new EventEmitter<any>()
  constructor(private api: ApiService, private message: NzNotificationService) { }

  ngOnInit(): void {
    this.getColumns();
  }

  NAME: string = ''
  TYPE: string = ''

  tableLoading

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

  columns = []
  SELECTED: number = 1;
  table_name = ''

  getColumns() {
    switch (this.SELECTED) {
      case 1:
        this.table_name = 'customer_personal'
        break;

      case 2:
        this.table_name = 'customer_property'
        break;

      case 3:
        this.table_name = 'customer_salary'
        break;

      case 4:
        this.table_name = 'customer_business'
        break;

      case 5:
        this.table_name = 'customer_prof'
        break;

      case 6:
        this.table_name = 'customer_agri'
        break;

      case 7:
        this.table_name = 'customer_other_income'
        break;

      case 8:
        this.table_name = 'customer_loan_taken'
        break;

      case 9:
        this.table_name = 'customer_deposit'
        break;

      case 10:
        this.table_name = 'customer_guarantor_history'
        break;

      case 11:
        this.table_name = 'customer_financial'
        break;

    }

    this.api.getColumn(this.table_name, true).subscribe({
      next: (res) => {
        if (res['code'] == 200) {
          this.columns = res['data'];
        }
      }
    })
  }

  addColumn() {
    this.api.createColumn(this.table_name, this.NAME, this.TYPE).subscribe(
      {
        next: (res) => {
          if (res['code'] == 200) {
            this.message.success("Successfully Added new Column", '');
            this.NAME = ''
            this.TYPE = ''
            this.getColumns()

          }
        }
      }
    )
  }

}
