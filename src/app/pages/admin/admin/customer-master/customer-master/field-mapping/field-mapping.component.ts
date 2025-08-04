import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';
import { ApiService } from 'src/app/Service/api.service';

@Component({
  selector: 'app-field-mapping',
  templateUrl: './field-mapping.component.html',
  styleUrls: ['./field-mapping.component.css']
})
export class FieldMappingComponent implements OnInit {

  @Output() close: EventEmitter<any> = new EventEmitter<any>()

  options = []
  columns = []

  src_field_list = []
  dest_field_list = []
  tableLoading: boolean = false;
  SELECTED
  SRC_FIELD: string;
  DEST_FIELD: string

  constructor(private api: ApiService, private message: NzNotificationService) { }

  ngOnInit(): void {
    this.getMappings()
  }

  getFields() {
    console.log(this.SELECTED)
    let selectedOption = this.options.filter(value => value.ID == this.SELECTED)[0]
    console.log(selectedOption)
    this.api.getFieldList(selectedOption.SRC_TABLE).subscribe({
      next: (res) => {
        if (res['code'] == 200) {
          this.src_field_list = res['data']
        }
      }
    })

    this.api.getFieldList(selectedOption.DEST_TABLE).subscribe({
      next: (res) => {
        if (res['code'] == 200) {
          this.dest_field_list = res['data']
        }
      }
    })

    this.getFieldMappingList()

  }

  // getMappingName(id){
  //   let selectedOption = this.options.filter(value => value.ID == id)[0]
  //   return selectedOption.NAME
  // }

  addFieldMapping() {
    let data = {
      MAPPING_ID: this.SELECTED,
      SRC_FIELD: this.SRC_FIELD,
      DEST_FIELD: this.DEST_FIELD
    }
    this.api.createFieldMapping(data).subscribe({
      next: (res) => {
        if (res['code'] == 200) {
          // this.SELECTED = null;
          this.SRC_FIELD = null;
          this.DEST_FIELD = null;
          this.getFieldMappingList()
          this.message.success('Field mapping created.', '')
        }
        else {
          this.message.success('Failed to create Field mapping.', '')
        }
      },
      error: () => {
        this.message.success('Failed to create Field mapping.', '')
      }
    })
  }

  getMappings() {
    this.api.getJointMapping().subscribe({
      next: (res) => {
        if (res['code'] == 200) {
          this.options = res['data'];
        }
      }
    })
  }

  getFieldMappingList() {
    this.api.getFieldMappingList(this.SELECTED).subscribe({
      next: (res) => {
        if (res['code'] == 200) {
          this.columns = res['data'];
        }
      }
    })
  }

}
