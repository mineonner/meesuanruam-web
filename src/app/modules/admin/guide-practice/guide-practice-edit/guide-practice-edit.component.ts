import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../../../share/services/admin.service';
import { ProjectInfoResModel } from '../../../../share/model/respone/ProjectInfoRes.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseOptionDropdownModel } from '../../../../../core/models/BaseOptionDropdown.model';
import { AlertService } from '../../../../../core/services/alert.service';
import { DataResponse } from '../../../../share/model/DataRespone.model';

@Component({
  selector: 'guide-practice-edit',
  templateUrl: './guide-practice-edit.component.html',
  styleUrl: './guide-practice-edit.component.scss',
  standalone: false
})
export class GuidePracticeEditComponent {
  projectCode: string;
  data: ProjectInfoResModel;
  form: FormGroup;
  isLoaderSave: boolean = false;
  option: BaseOptionDropdownModel[] = [
    {
      id: 'Complete',
      name: 'เสร็จสิ้น'
    }, {
      id: 'Process',
      name: 'กำลังดำเนินการ'
    },
  ];

  constructor(private route: ActivatedRoute,
    private _service: AdminService,
    private fb: FormBuilder,
    private _alert: AlertService,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.projectCode = this.route.snapshot.paramMap.get('code');
    this.getProjectInfo();
  }

  async getProjectInfo() {
    try {
      this.data = await this._service.getProjectInfo(this.projectCode ?? '');
      this.form.patchValue(this.data);
    } catch (ex) {
      this.router.navigate(['/admin/guide-practice']);
    }
  }

  async save() {

    try {
      let errMsgs = this.validate();
      if (errMsgs.length > 0) {
        this._alert.showAlertArr('error', 'ตรวจสอบข้อมูล', errMsgs);
      } else {
        this.isLoaderSave = true;
        this.data = { ...this.data, ...this.form.getRawValue() };
        let res: DataResponse<any> = await this._service.saveProjectInfo(this.data);
        if (res.status == 'success') {
          this._alert.alert('success', '', res.message);
          this.router.navigate(['/admin/guide-practice']);
        }
      }
    } catch (ex) {

    }

    this.isLoaderSave = false
  }

  validate() {
    let errMsgs: string[] = [];

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      errMsgs.push('กรุณากรอกข้อมูลให้ครบถ้วน');
    }

    return errMsgs;
  }

  exportProjectInfo() {
    this._service.exportProjectInfo(this.projectCode).subscribe({
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

  get f() { return this.form.controls; }
}
