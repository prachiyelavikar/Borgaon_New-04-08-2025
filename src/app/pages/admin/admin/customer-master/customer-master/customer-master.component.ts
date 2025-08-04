import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NzDrawerRef, NzDrawerService, NzModalContainerComponent, NzModalService } from 'ng-zorro-antd';
import { ApiService } from 'src/app/Service/api.service';

@Component({
  selector: 'app-customer-master',
  templateUrl: './customer-master.component.html',
  styleUrls: ['./customer-master.component.css']
})
export class CustomerMasterComponent implements OnInit {

  constructor(private api: ApiService, private drawerService: NzDrawerService, private model: NzModalService) { }

  ngOnInit(): void {
    this.getCustomerData();
  }

  @ViewChild('personalDrawer', { static: false }) personalDrawer?: TemplateRef<{
    $implicit: {};
    drawerRef: NzDrawerRef<string>;
  }>;

  @ViewChild('incomeDrawer', { static: false }) incomeDrawer?: TemplateRef<{
    $implicit: {};
    drawerRef: NzDrawerRef<string>;
  }>;

  @ViewChild('financialDrawer', { static: false }) financialDrawer?: TemplateRef<{
    $implicit: {};
    drawerRef: NzDrawerRef<string>;
  }>;


  @ViewChild('propertyDrawer', { static: false }) propertyDrawer?: TemplateRef<{
    $implicit: {};
    drawerRef: NzDrawerRef<string>;
  }>;


  @ViewChild('creditDrawer', { static: false }) creditDrawer?: TemplateRef<{
    $implicit: {};
    drawerRef: NzDrawerRef<string>;
  }>;

  @ViewChild('multiDrawer', { static: false }) multiDrawer?: TemplateRef<{
    $implicit: {};
    drawerRef: NzDrawerRef<string>;
  }>;

  @ViewChild('fileTemplate', { static: false }) fileTemplate?: TemplateRef<{
    $implicit: {};
    drawerRef: NzDrawerRef<string>;
  }>;

  @ViewChild('addColumnTemplate', { static: false }) addColumnTemplate?: TemplateRef<{
    $implicit: {};
    drawerRef: NzDrawerRef<string>;
  }>;

  @ViewChild('view', { static: false }) view?: TemplateRef<{
    $implicit: {};
    drawerRef: NzDrawerRef<string>;
  }>;



  customerData = [];
  tableLoading = false;

  currentDrawerRef: NzDrawerRef<string>;

  CID: number;

  getCustomerData() {
    this.api.getCustomerPersonal().subscribe({
      next: (res) => {
        if (res['code'] == 200) {
          this.customerData = res['data'];
          this.tableLoading = false;
        }
        else {
          this.tableLoading = false;
        }
      },
      error: () => {
        this.tableLoading = false;
      }
    })
  }

  viewCustomerData(data) {
    this.CID = data.CID
    this.openDrawer(`View Customer Data (Customer ID = ${this.CID})`, this.view);
  }

  openPersonalDrawer(): void {
    this.openDrawer('Upload Personal', this.personalDrawer);
  }

  openIncomeDrawer(): void {
    this.openDrawer('Upload Income', this.incomeDrawer);
  }

  openFinancialDrawer(): void {
    this.openDrawer('Upload Financial', this.financialDrawer);
  }

  openPropertyDrawer(): void {
    this.openDrawer('Upload Property', this.propertyDrawer);
  }

  openCreditDrawer(): void {
    this.openDrawer('Upload Credit', this.creditDrawer);
  }



  openDrawer(title: string, templateRef): void {
    const drawerRef = this.drawerService.create({
      nzTitle: title,
      nzContent: templateRef,
      nzWidth: 1050
    });

    drawerRef.afterOpen.subscribe(() => {
      console.log('Drawer(Template) open');
    });

    drawerRef.afterClose.subscribe(() => {
      console.log('Drawer(Template) close');
      this.currentDrawerRef = null
    });

    this.currentDrawerRef = drawerRef;
  }

  closeDrawer() {
    this.tableLoading = true;
    this.currentDrawerRef.close();
    this.getCustomerData();
  }

  openMultiDrawer(): void {
    this.openDrawer('Upload Multiple Files', this.multiDrawer);
  }

  downloadFileTemp() {
    this.model.create({
      nzTitle: "Download Template File.",
      nzContent: this.fileTemplate,
      nzFooter: ''
    })
  }

}
