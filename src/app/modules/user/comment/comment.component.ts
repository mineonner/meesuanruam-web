import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileAttachment } from '../../../../core/models/FileAttachment.mode';
import { UserService } from '../../../share/services/user.service';
import { SaveComment } from '../../../share/model/request/SaveComent.model';
import { AlertService } from '../../../../core/services/alert.service';
import { DataResponse } from '../../../share/model/DataRespone.model';

@Component({
    selector: 'comment',
    templateUrl: './comment.component.html',
    styleUrl: './comment.component.scss',
    standalone: false
})
export class CommentComponent {
  genderOptions: object[] = [
    {
      text: 'ชาย',
      value: 'male',
    },
    {
      text: 'หญิง',
      value: 'female',
    },
  ];

  form: FormGroup;
  files:FileAttachment[] = [];
  data: SaveComment = new SaveComment();
  location:string;
  sentLoader:boolean = false;

  constructor(private fb: FormBuilder,
    private _uSer: UserService,
    private _alert: AlertService,
  ) {
    this.form = this.fb.group({
      gender: ['', Validators.required],
      occupation: ['', Validators.required],
      plan_topic: ['', Validators.required],
      plan_another_detail: [''],
      detail: ['', Validators.required],
    })
  }

  async sentfile(){
    if(this.files.length > 0){
      let res =  await this._uSer.uploadFile('comment/C1', this.files);
      console.log(res);
    }
  }

  topicAnotherChange(){
    this.f['plan_another_detail'].setValue('');
    (this.f['plan_topic'].value == 'another') ? this.f['plan_another_detail'].addValidators(Validators.required) : this.f['plan_another_detail'].removeValidators(Validators.required)
  }

  async sentComment() {
    let errMsgs = this.validate();
    if (errMsgs.length > 0) {
      this._alert.showAlertArr('error', 'ตรวจสอบข้อมูล', errMsgs);
    }else{
      if(!this.sentLoader){
        this.sentLoader = true;
        this.data = { ...this.data, ...this.form.getRawValue() };
        this.data.files = this.files;
        this.data.location = this.location;

        let result: DataResponse<any> = await this._uSer.saveComment(this.data);
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
      }

    }
  }

  validate() {
    let errMsgs: string[] = [];
      if(this.form.invalid) {
        this.form.markAllAsTouched();
        errMsgs.push('กรุณากรอกข้อมูลให้ครบถ้วน');
      }
    return errMsgs;
  }

  get f() { return this.form.controls; }
}
