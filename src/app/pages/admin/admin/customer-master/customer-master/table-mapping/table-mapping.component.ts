import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';
import { ApiService } from 'src/app/Service/api.service';

@Component({
  selector: 'app-table-mapping',
  templateUrl: './table-mapping.component.html',
  styleUrls: ['./table-mapping.component.css']
})
export class TableMappingComponent implements OnInit {

  @Output() close: EventEmitter<any> = new EventEmitter<any>()
  constructor(private api: ApiService, private message: NzNotificationService) { }

  ngOnInit(): void {
    this.getTableList()
    this.getMapping()
  }

  src_table_list = []
  dest_table_list = []

  SRC_TABLE: string;
  DEST_TABLE: string;
  DEST_DEP_TABLE:string;
  DEST_DEP_FIELD:string;
  DEP_FIELD_NAME:string;
  IS_SINGLE:boolean;
  columns = []
  tableLoading: boolean = false;

  addMapping() {
    let data = {
      SRC_TABLE: this.SRC_TABLE,
      DEST_TABLE: this.DEST_TABLE,
      DEST_DEP_TABLE:this.DEST_DEP_TABLE,
      DEST_DEP_FIELD:this.DEST_DEP_FIELD,
      DEP_FIELD_NAME:this.DEP_FIELD_NAME,
      IS_SINGLE:this.IS_SINGLE
    }

    this.api.createMapping(data).subscribe({
      next: (res) => {
        if (res['code'] == 200) {
          this.message.success("Mapping created success fully", '');
          this.SRC_TABLE = null
          this.DEST_TABLE = null
          this.DEST_DEP_TABLE= null
          this.DEST_DEP_FIELD= null
          this.DEP_FIELD_NAME= null
          this.IS_SINGLE = false;

          this.getMapping();
        }
        else {
          this.message.error("Failed to create mapping", '')
        }
      },
      error: () => {
        this.message.error("Failed to create mapping", '')
      }
    })
  }

  getMapping() {
    this.api.getMappingList().subscribe({
      next: (res) => {
        if (res['code'] == 200) {
          this.columns = res['data'];
        }
      }
    })
  }

  getTableList() {
    this.api.getTableList().subscribe({
      next: (res) => {
        if (res['code'] == 200) {
          this.src_table_list = res['data'];
          this.dest_table_list = res['data'];
        }
      }
    })
  }

}
