import { Component } from '@angular/core';
import { MUtilsService } from '../../../../core/services/util.service';
import { AdminService } from '../../../share/services/admin.service';
import { GetCommentModel } from '../../../share/model/respone/GetComment.model';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'comment-management',
  templateUrl: './comment-management.component.html',
  styleUrl: './comment-management.component.scss',
  standalone: false
})
export class CommentManagementComponent {
  data: GetCommentModel[] = [];
  sortedData: GetCommentModel[] = [];
  sortedDataClone: GetCommentModel[] = [];
  dataDialog:GetCommentModel;
  isShowDialog:boolean = false;

  genderOptions: object =
    {
      male: 'ชาย',
      female: 'หญิง',
    };

  planTopicOptions: object =
    {
      "Industrial-Engineering": 'แผนอุตสาหกรรมและการโยธา',
      "Another": 'อื่นๆ',
    };

  constructor(private _util: MUtilsService,
    private _adSer: AdminService
  ) {

  }

  ngAfterViewInit() {
    this.loadData();

  }

  async loadData() {
    this.data = await this._adSer.getComment();
    this.sortedData = this._util.clone(this.data);;
    this.sortedDataClone = this._util.clone(this.sortedData);
    console.log(this.data);
  }

  sortData(sort: Sort) {
    console.log('data');
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
        case 'gender':
          return this.compare(a.gender, b.gender, isAsc);
        case 'occupation':
          return this.compare(a.occupation, b.occupation, isAsc);
        case 'plan_topic':
          return this.compare(a.plan_topic, b.plan_topic, isAsc);
        default:
          return 0;
      }
    });

    this.sortedDataClone = this._util.clone(this.sortedData);
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  onChangePage(val){
    this.sortedData = val;
  }

  openReportForm(obj:GetCommentModel){
    this.dataDialog = obj;
    this.isShowDialog = true;
  }

  exportData() {
    let data = this._util.clone(this.data);

    data.forEach(obj => {
      obj['วันที่'] = obj['create_date'];
      obj['เพศ'] = this.genderOptions[obj['gender']];
      obj['อาชีพ'] = obj['occupation'];
      obj['ประเภทแผน'] = (obj['plan_topic'] == 'Another') ? `${this.planTopicOptions[obj['plan_topic']]} : ${obj['plan_another_detail']}` : this.planTopicOptions[obj['plan_topic']];

      delete obj["create_date"];
      delete obj["files"];
      delete obj["gender"];
      delete obj["location"];
      delete obj["occupation"];
      delete obj["plan_another_detail"];
      delete obj["plan_topic"];
    });

    let date = new Date();
    this._util.exportJsonToExcel(data, `${date.getTime().toString()}.xlsx`);
  }
}
