import { Component } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MUtilsService } from '../../../../core/services/util.service';
import { AdminService } from '../../../share/services/admin.service';
import { GetReportModel } from '../../../share/model/respone/GetReport.model';


@Component({
  selector: 'report-management',
  templateUrl: './report-management.component.html',
  styleUrl: './report-management.component.scss',
  standalone: false
})
export class ReportManagementComponent {
  data: GetReportModel[] = [];
  sortedData: GetReportModel[] = [];
  sortedDataClone: GetReportModel[] = [];

  dataDialog: GetReportModel;
  isShowDialog: boolean = false;

  persernalTypeOption: object = {
    personal: "เปิดเผยตัวตน",
    anonymous: "ไม่เปิดเผยตัวตน"
  }

  constructor(private _util: MUtilsService,
    private _adSer: AdminService
  ) {

  }

  ngAfterViewInit() {
    this.loadData();

  }

  async loadData() {
    this.data = await this._adSer.getReport();
    this.sortedData = this._util.clone(this.data);;
    this.sortedDataClone = this._util.clone(this.sortedData);
    console.log(this.data);
  }

  sortData(sort: Sort) {
    const data = this.data.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      this.sortedDataClone = this._util.clone(this.sortedData);
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'create_date':
          return this.compare(a.create_date, b.create_date, isAsc);
        case 'persernal_type':
          return this.compare(a.persernal_type, a.persernal_type, isAsc);
        case 'report_government_agencies':
          return this.compare(a.report_government_agencies, a.report_government_agencies, isAsc);
        case 'report_topic':
          return this.compare(a.report_topic.building_permit_issuance.toString(), a.report_topic.building_permit_issuance.toString(), isAsc);
        default:
          return 0;
      }
    });

    this.sortedDataClone = this._util.clone(this.sortedData);
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  onChangePage(val) {
    this.sortedData = val;
  }

  openReportForm(obj: GetReportModel) {
    this.dataDialog = obj;
    this.isShowDialog = true;
  }

  exportData() {
    let data = this._util.clone(this.data);

    data.forEach(obj => {
      obj['วันที่'] = obj['create_date'];
      obj['ประเภทบุคคล'] = this.persernalTypeOption[obj['persernal_type']];
      obj['ชื่อ-นามสกุล'] = obj['firstname'] ? `${obj['name_title_another']} ${obj['firstname']} ${obj['lastname']}` : '';
      obj['อีเมล'] = obj['email'];
      obj['เบอร์โทรศัพท์'] = obj['telephone'];
      obj['หน่วยงานที่แจ้ง'] = obj['report_government_agencies'];
      obj['การออกอนุญาติการก่อสร้าง'] = obj['report_topic']['building_permit_issuance'];
      obj['การจัดซื้อจัดจ้างในโครงการถนนในท้องถิ่น'] = obj['report_topic']['procurement_local_road'];
      obj['อื่นๆ'] = obj['report_topic']['another_detail'];
      obj['รายละเอียดร้องเรียน'] = obj['report_detail'];

      delete obj["create_date"];
      delete obj["email"];
      delete obj["files"];
      delete obj["firstname"];
      delete obj["lastname"];
      delete obj["name_title"];
      delete obj["name_title_another"];
      delete obj["persernal_type"];
      delete obj["report_detail"];
      delete obj["report_government_agencies"];
      delete obj["report_topic"];
      delete obj["telephone"];
    });

    let date = new Date();
    this._util.exportJsonToExcel(data, `${date.getTime().toString()}.xlsx`);
  }

}
