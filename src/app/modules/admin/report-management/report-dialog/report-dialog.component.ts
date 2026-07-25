import { Component, Input } from '@angular/core';
import { GetReportModel } from '../../../../share/model/respone/GetReport.model';

@Component({
  selector: 'report-dialog',
  templateUrl: './report-dialog.component.html',
  styleUrl: './report-dialog.component.scss',
  standalone:false
})
export class ReportDialogComponent {
  @Input() data:GetReportModel;

  persernalTypeOption:object = {
    personal : "เปิดเผยตัวตน",
    anonymous : "ไม่เปิดเผยตัวตน"
  }

  nameTitleOption:object = {
    'Mr.' : "นาย",
    'Mrs.' : "นาง",
    'Miss' : "นางสาว",
    'Another' : 'อื่นๆ'
  }
}
