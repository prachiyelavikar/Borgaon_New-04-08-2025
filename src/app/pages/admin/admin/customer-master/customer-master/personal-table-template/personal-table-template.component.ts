import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-personal-table-template',
  templateUrl: './personal-table-template.component.html',
  styleUrls: ['./personal-table-template.component.css']
})
export class PersonalTableTemplateComponent implements OnInit {

  @Input() data
  @Input() loading
  @Input() columns
  constructor() { }

  ngOnInit(): void {
  }

}
