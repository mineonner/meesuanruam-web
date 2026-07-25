import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FileAttachment } from '../../../../core/models/FileAttachment.mode';
import { SaveReport } from '../../../share/model/request/SaveReport.model';
import { AlertService } from '../../../../core/services/alert.service';
import { DataResponse } from '../../../share/model/DataRespone.model';
import { UserService } from '../../../share/services/user.service';
import { BrowserScreenService } from '../../../../core/services/browser-screen.service';
import { DataShareService } from '../../../../core/services/data-share.service';

@Component({
    selector: 'report',
    templateUrl: './report.component.html',
    styleUrl: './report.component.scss',
    standalone: false
})
export class ReportComponent {
  personType: number;
  form: FormGroup;
  persenForm: FormGroup;
  topicForm: FormGroup;
  loader: boolean = true;
  radioOptions: object[] = [
    {
      text: 'นาย',
      value: 'Mr.',
    },
    {
      text: 'นาง',
      value: 'Mrs.',
    },
    {
      text: 'นางสาว',
      value: 'Miss',
    },
    {
      text: 'อื่นๆ',
      value: 'Another',
    }
  ];

  files: FileAttachment[] = [];
  data: SaveReport = new SaveReport();

  sentLoader:boolean = false;

  constructor(private fb: FormBuilder,
    private _alert: AlertService,
    private _uSer: UserService,
    public _dataShare:DataShareService
  ) {
    this.form = this.fb.group({
      persernal_type: ['personal', Validators.required],
      report_government_agencies: ['', Validators.required],
      report_detail: ['', Validators.required],
    });

    this.persenForm = this.fb.group({
      name_title: ['', Validators.required],
      name_title_another: [''],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: [''],
      telephone: ['', Validators.required],
    });

    this.topicForm = this.fb.group({
      building_permit_issuance: [false, Validators.required],
      procurement_local_road: [false, Validators.required],
      another: [false, Validators.required],
      another_detail: [''],
    })
  }

  ngOnInit(): void {

  }

  setAnonymous(value:string){
    this.f['persernal_type'].setValue(value);
    this.persenForm.reset();
  }

  nameAnotherChange() {
    this.fPer['name_title_another'].setValue('');
  }

  topicAnotherChange() {
    this.fTop['another_detail'].setValue('');
    (this.fTop['another'].value) ? this.fTop['another_detail'].addValidators(Validators.required) : this.fTop['another_detail'].removeValidators(Validators.required)
  }

  // changeAnonymous(){
  //   console.log()
  //   this.persenForm.reset();
  // }

  async sentReport() {
    let errMsgs = this.validate();
    if (errMsgs.length > 0) {
      this._alert.showAlertArr('error', 'ตรวจสอบข้อมูล', errMsgs);
    } else {
      if(!this.sentLoader){
        this.sentLoader = true;
        this.data = { ...this.data, ...this.form.getRawValue() };
        this.data = { ...this.data, ...this.persenForm.getRawValue() };
        this.data.report_topic = { ...this.data.report_topic, ...this.topicForm.getRawValue() };
        this.data.files = this.files;
        try{
          let result: DataResponse<any> = await this._uSer.saveReport(this.data);

          if (result.status == "success") {
            if (this.files.length > 0) {
              let res = await this._uSer.uploadFile(result.message, this.files);
            }
            this.sentLoader = false;
            this._alert.alert('success', 'ส่งข้อมูลสำเร็จ', '');
          } else {
            this.sentLoader = false;
            this._alert.alert('error', 'ขออภัย!!', 'ระบบเกิดข้อผิดพลาด รอระบบปรับปรุง');
          }
        }catch(err){
          this._alert.alert('error', 'ขออภัย!!', 'ระบบเกิดข้อผิดพลาด รอระบบปรับปรุง');
          this.sentLoader = false;
        }


      }

    }
  }

  validate() {
    let errMsgs: string[] = [];

    if (this.f['persernal_type'].value == 'personal' && this.persenForm.invalid) {
      this.persenForm.markAllAsTouched();
      errMsgs.push('กรุณากรอกข้อมูลส่วนบุคคลผู้ร้องเรียนให้ครบถ้วน');
    }

    if (this.form.invalid || this.topicForm.invalid) {
      this.form.markAllAsTouched();
      this.topicForm.markAllAsTouched();
      errMsgs.push('กรุณากรอกรายละเอียดให้ครบถ้วน');
    }
    return errMsgs;
  }

  get f() { return this.form.controls; }
  get fPer() { return this.persenForm.controls; }
  get fTop() { return this.topicForm.controls; }
}
