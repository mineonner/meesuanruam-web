import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AdminService } from '../../../share/services/admin.service';
import { ProjectInfoResModel } from '../../../share/model/respone/ProjectInfoRes.model';
import { MUtilsService } from '../../../../core/services/util.service';
import { AlertService } from '../../../../core/services/alert.service';

@Component({
  selector: 'guide-practice',
  standalone: false,
  templateUrl: './guide-practice.component.html',
  styleUrl: './guide-practice.component.scss'
})
export class GuidePracticeComponent implements AfterViewInit {
  dataList: ProjectInfoResModel[] = [];
  loader: boolean = false;
  sortedData: ProjectInfoResModel[] = [];
  pageIndex: number = 0;

  constructor(private _service: AdminService
    , private _util: MUtilsService
    , private _alert: AlertService
  ) {

  }

  async ngAfterViewInit() {
    this.loader = true;
    await this.loadData();
    this.loader = false;
  }

  async loadData() {
    try {
      this.dataList = await this._service.getProjectList();
    } catch (ex) {
      this.dataList = [];
    }

    this.sortedData = this._util.clone(this.dataList);
  }

  onChangePage(val) {
    this.sortedData = val;
    console.log(this.sortedData);
  }

  async deleteProject(item: ProjectInfoResModel) {
    let conf = await this._alert.confirmAlert(`แจ้งเตือน`, `ต้องการลบข้อมูล ${item.name} หรือไม่`);
    if (conf.isConfirmed) {
      try {
        let res = await this._service.deleteProjectInfo(item.code);
        console.log(res);
        if (res.status == 'success') {
          this._alert.alert('success', '', `ลบข้อมูล ${item.name} สำเร็จ`);
          await this.loadData();
        }
      } catch (ex) {

      }
    }
  }

  exportProjectInfo(item: ProjectInfoResModel){
        this._service.exportProjectInfo(item.code).subscribe({
      next: (blob: Blob) => {
        // สร้างลิงก์สำหรับดาวน์โหลด
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `Export-${new Date().toISOString().slice(0, 19).replace(/:/g, '')}.xlsx`;

        // เพิ่มลิงก์ลงใน DOM และคลิก
        document.body.appendChild(link);
        link.click();

        // ลบลิงก์และ URL object
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      },
      error: (error) => {
        console.error('Error downloading file:', error);
        this._alert.alert('error', '', 'ไม่สามารถ Export ได้');
      }
    },)
  }

}
