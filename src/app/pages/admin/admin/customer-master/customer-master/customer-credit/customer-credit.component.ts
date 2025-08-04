import { Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { NzDrawerRef, NzDrawerService, NzNotificationService } from 'ng-zorro-antd';
import { ApiService } from 'src/app/Service/api.service';

@Component({
    selector: 'app-credit-master',
    templateUrl: './customer-credit.component.html',
    styleUrls: ['./customer-credit.component.css']
})
export class CustomerCreditComponent implements OnInit {

    acceptedFileFormats = ".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel";

    @Output() close: EventEmitter<any> = new EventEmitter<any>()

    ngOnInit(): void {

    }

    constructor(private api: ApiService, private message: NzNotificationService) { }


    clickUploadButton(credit_type: number) {

        switch (credit_type) {
            case 1:

                this.table_name = 'customer_loan_taken';
                break;

            case 2:

                this.table_name = 'customer_guarantor_history';
                break;

            case 3:

                this.table_name = 'customer_deposit';
                break;

        }

        document.getElementById("fileUpload").click();

    }

    loadPreviewTable: boolean = false;
    preview: boolean = false;
    columns = []
    errorList = []
    fileData = []
    table_name = ''

    bulkUpload(file) {
        this.loadPreviewTable = true

        console.log("This is file", file)

        // this.uploadedFile = file;
        // this.closedCard = false;

        this.api.preProccessCustomerFile(file, this.table_name, 'UID').subscribe({
            next: (res) => {
                if (res['code'] == 200) {
                    // this.downloadTestFile = false;
                    this.fileData = res['FiletData']['data'];
                    this.errorList = res['FiletData']['error'];
                    this.columns = res['column'];
                    this.preview = true;
                    (document.getElementById("fileUpload") as HTMLInputElement).value = ''
                    this.loadPreviewTable = false
                }

            }
        })
    }

    skipOne(rowNo, i) {
        this.fileData = this.fileData.filter(value => this.fileData[rowNo].CID != value.CID)
        this.errorList = this.errorList.filter(value => this.errorList[i].exact_row != value.exact_row);
    }

    overrideOne(rowNo, i) {
        this.api.updateCustomerData([this.fileData[rowNo]], this.table_name, 'UID').subscribe({
            next: (res) => {
                if (res['code'] == 200) {
                    this.skipOne(rowNo, i);
                    this.message.success("Successfully override", '')
                }
                else {
                    this.message.error("failed to override", '')
                }
            },
            error: () => {
                this.message.error("failed to override", '')
            }
        })
    }

    cancel() {
        this.close.emit();
    }

    save() {
        this.api.createCustomerData(this.fileData, this.table_name).subscribe({
            next: (res) => {
                if (res['code'] == 200) {
                    this.message.success("Created Successfully.", '');
                    this.close.emit();
                }
                else {
                    this.message.error("Encounter some problem", '')
                }
            },
            error: () => {
                this.message.error("Encounter some problem", '')
            }
        })
    }

    skipAll() {
        this.fileData = this.fileData.filter(value => !value.error)
        this.errorList = [];
    }

    overrideAll() {
        let toOverride = []
        toOverride = this.fileData.filter(value => value.error);
        this.api.updateCustomerData(toOverride, this.table_name, 'UID').subscribe({
            next: (res) => {
                if (res['code'] == 200) {
                    this.skipAll()
                    this.message.success("Successfully override", '')
                }
                else {
                    this.message.error("failed to override", '')
                }
            },
            error: () => {
                this.message.error("failed to override", '')
            }
        })
    }
}