import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../../share/services/auth.service';
import { Router } from '@angular/router';
import { AlertService } from '../../../../core/services/alert.service';
import { AdminService } from '../../../share/services/admin.service';
import { DataResponse } from '../../../share/model/DataRespone.model';
import { UserModel } from '../../../share/model/respone/User.model';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    standalone: false
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  formResetPassword: FormGroup;
  data:UserModel;
  sentLoader:boolean = false;
  isShowDialog:boolean = false;

  constructor(private authService: AuthService,
    private _fb: FormBuilder,
    private _alert: AlertService,
    private router: Router,
    private _adSer:AdminService) {
    this.form = _fb.group({
      user_email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });

    this.formResetPassword = _fb.group({
      user_email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      password_confrim: new FormControl('', Validators.required),
      user_otp: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    localStorage.clear();
  }

  async login() {
    if(this.form.invalid){
      this.form.markAllAsTouched();
      this._alert.alert('error', 'ตรวจสอบข้อผิดพลาด', 'กรุณากรอกข้อมูลให้ครบถ้วน');
    }else{
      this.data = {...this.data, ...this.form.value};
      try{
        if(!this.sentLoader){
          this.sentLoader = true;
          let res:DataResponse<UserModel> = await this._adSer.login(this.data);
          if(res.status == "success"){
            this.authService.accessToken = res.result.token;
            this.authService.userEmail = res.result.user_email;
            this.router.navigate(['/admin']);
          }else if(res.status == "password expired"){
            this._alert.alert('error', 'Password หมดอายุ', '');
            this.isShowDialog = true;
          }
          else{
              this._alert.alert('error', 'ไม่สามารถเข้าสู่ระบบได้', '');
          }
          this.sentLoader = false;
        }

      }catch(ex){
        this.sentLoader = false;
        this._alert.alert('error', 'ตรวจสอบข้อผิดพลาด', 'ระบบขัดข้อง รอปรับปรุงระบบใหม่');
      }

    }
  }

  async getOTP(){
    if(!!this.fRe['user_email'].value){
      let data:UserModel;
      data = {...data, ...this.formResetPassword.value};
      try{
        let result:DataResponse<any> = await this._adSer.getOTP(data);

        if(result.status == "success"){
          this._alert.alert('success', 'ส่งเลข OTP ไปที่อยู่อีเมลแล้ว', 'หากไม่พบลองตรวจสอบในไฟล์ถังขยะ');
        }else{
          this._alert.alert('error', 'ตรวจสอบข้อผิดพลาด', result.message);
        }
      }catch(ex){
        this._alert.alert('error', 'ตรวจสอบข้อผิดพลาด', 'ระบบขัดข้อง รอปรับปรุงระบบใหม่');
      }

    }else{
      this.formResetPassword.controls['user_email'].markAllAsTouched();
      this._alert.alert('error', 'ตรวจสอบข้อผิดพลาด', 'กรุณากรอก Email');
    }
  }

  async resetPassword(){

    let errMsgs = this.resetPasswordValidate();
    if (errMsgs.length > 0) {
      this._alert.showAlertArr('error', 'ตรวจสอบข้อมูล', errMsgs);
    }else{
      let data:UserModel;
      data = {...data, ...this.formResetPassword.value};
      let result:DataResponse<any> = await this._adSer.resetPassword(data);

      if(result.status == "success"){
        this.isShowDialog = false;
        this._alert.alert('success', 'password reset successfully', 'กรุณาลองเข้าระบบใหม่อีกครั้ง');
      }else{
        this._alert.alert('error', 'ตรวจสอบข้อผิดพลาด', result.message);
      }
    }
  }

  resetPasswordValidate(){
    let errMsgs: string[] = [];
    if(this.formResetPassword.invalid){
      this.formResetPassword.markAllAsTouched();
      errMsgs.push('กรุณากรอกข้อมูลให้ครบถ้วน');
    }

    if(this.fRe['password'].value !=  this.fRe['password_confrim'].value){
      errMsgs.push('รหัสผ่านไม่ตรงกัน');
    }

    return errMsgs;
  }

  showResetPassword(){
    this.isShowDialog = !this.isShowDialog;
  }

  get f() {return this.form.controls}
  get fRe() {return this.formResetPassword.controls}

}
