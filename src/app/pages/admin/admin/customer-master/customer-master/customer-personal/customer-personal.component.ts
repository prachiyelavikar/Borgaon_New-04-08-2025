import { computeMsgId } from '@angular/compiler';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';
import { ApiService } from 'src/app/Service/api.service';

@Component({
  selector: 'app-customer-personal',
  templateUrl: './customer-personal.component.html',
  styleUrls: ['./customer-personal.component.css']
})
export class CustomerPersonalComponent implements OnInit {

  constructor(private api: ApiService, private message: NzNotificationService) { }

  ngOnInit(): void {
    // this.errorList = Array(100)
    // for(let i=0;i<100;i++){
    //   this.errorList[i] = {
    //     title:`error : ${i+1}`,
    //     description:`this is description : ${i+1}`
    //   }
    // }
  }

  @Output() close: EventEmitter<any> = new EventEmitter<any>();

  preview: boolean = false
  mode: number = 1

  closedCard = true;


  acceptedFileFormats = ".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"

  uploadedFile: any

  fileData: PersonalFields[] = [];
  fileDataTest: PersonalFieldsTest[] = []

  columns = []

  downloadTestFile: boolean = false;

  loadTestTable = false;
  loadPreviewTable = false

  bulkUpload(file) {
    this.loadPreviewTable = true

    console.log("This is file", file)

    this.uploadedFile = file;
    this.closedCard = false;

    this.api.preProccessCustomerFile(this.uploadedFile, 'customer_personal', 'CID').subscribe({
      next: (res) => {
        if (res['code'] == 200) {
          this.downloadTestFile = false;
          this.fileData = res['FiletData']['data'];
          this.errorList = res['FiletData']['error'];
          this.columns = res['column'];
          this.preview = true;
          this.loadPreviewTable = false
        }

      }
    })
  }

  fileSizeParser(fileSize) {
    return fileSize >= (1024 * 1024) ? `${(fileSize / (1024 * 1024)).toFixed(2)}MB` : `${(fileSize / 1024).toFixed(2)}KB`
  }


  fileUpload() {
    document.getElementById("fileUpload").click();
  }

  getTestData() {
    this.fileDataTest = []
    this.loadTestTable = true;
    for (let i = 0; i < 100; i++) {
      this.fileDataTest.push(new PersonalFieldsTest())
    }

    console.table(this.fileDataTest)
    this.loadTestTable = false;
    this.preview = false;
    this.downloadTestFile = true;
  }

  closeTest() {
    this.downloadTestFile = false;
    if (this.uploadedFile) {
      this.preview = true;
    }
  }

  closeCard() {
    this.closedCard = true;
  }

  errorList = [];

  skipOne(rowNo, i) {
    this.fileData = this.fileData.filter(value => this.fileData[rowNo].CID != value.CID)
    this.errorList = this.errorList.filter(value => this.errorList[i].exact_row != value.exact_row);
  }

  overrideOne(rowNo, i) {
    this.api.updateCustomerData([this.fileData[rowNo]],'customer_personal','CID').subscribe({
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


  save() {
    this.api.createCustomerData(this.fileData,'customer_personal').subscribe({
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

  cancel() {
    this.close.emit();
  }

  skipAll() {
    this.fileData = this.fileData.filter(value => !value.error)
    this.errorList = [];
  }

  overrideAll() {
    let toOverride = []
    toOverride = this.fileData.filter(value => value.error);
    this.api.updateCustomerData(toOverride,'customer_personal','CID').subscribe({
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

class PersonalFields {
  CID: any;
  UID: any;
  NAME: string;
  DOB: string;
  GENDER: string;
  PAN: string;
  AADHAAR: string;
  error?: boolean = false;
}

class PersonalFieldsTest extends PersonalFields {
  CID: any = this.random(10000);
  UID: any = this.random(100);
  NAME: string = this.randomNameGenerator();
  DOB: string = this.generateDOB();
  GENDER: string = this.generateGender();
  PAN: string = this.generatePan();
  AADHAAR: string = this.generateAadhaar();

  randomNameGenerator() {

    let size1 = this.random(15 - 5) + 5
    let size2 = this.random(15 - 5) + 5
    let size3 = this.random(15 - 5) + 5

    let small_characters = 'abcdefghijklmnopqrstuvwxyz'
    let big_characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

    let first_name = ''
    let m_name = ''
    let last_name = ''


    for (let i = 0; i < size1; i++) {
      let char_index = this.random(52) % 26

      if (i == 0) {
        first_name += big_characters[char_index]
      }
      else {
        first_name += small_characters[char_index]
      }
    }

    for (let i = 0; i < size2; i++) {
      let char_index = this.random(52) % 26

      if (i == 0) {
        m_name += big_characters[char_index]
      }
      else {
        m_name += small_characters[char_index]
      }
    }

    for (let i = 0; i < size3; i++) {
      let char_index = this.random(52) % 26

      if (i == 0) {
        last_name += big_characters[char_index]
      }
      else {
        last_name += small_characters[char_index]
      }
    }

    return `${first_name} ${m_name} ${last_name}`;

  }

  generateDOB() {
    let dd = this.random(29) + 1
    let mm = this.random(11) + 1
    let yyyy = this.random(2004 - 1960) + 1960

    return `${dd < 10 ? '0' + dd : dd}/${mm < 10 ? '0' + mm : mm}/${yyyy}`
  }

  random(limit) {
    return Number((Math.random() * limit).toFixed(0))
  }

  generateGender() {
    let index = this.random(2);

    let genders = 'MFO'

    return genders[index];
  }

  generatePan() {
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

    let first_part = ''

    for (let i = 0; i < 5; i++) {
      let char_index = this.random(52) % 26
      // console.log("index",char_index)
      first_part += characters[char_index]
    }

    let secondPart = this.random(9999 - 1000) + 1000

    let last_part = characters[this.random(52) % 26]

    return `${first_part}${secondPart}${last_part}`
  }

  generateAadhaar() {
    return this.random(1000000000000).toString()
  }
}


