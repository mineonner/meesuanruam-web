import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, firstValueFrom, map, throwError } from "rxjs";

import { DataResponse } from "../model/DataRespone.model";
import { environment } from "../environment";
import { removeItemLocalStorage } from "../../../core/services/local-storage.service";
import { UserModel } from "../model/respone/User.model";

import { AuthService } from "./auth.service";
import { GetReportModel } from "../model/respone/GetReport.model";
import { GetCommentModel } from "../model/respone/GetComment.model";
import { AlertService } from "../../../core/services/alert.service";
import { DashboardModel } from "../model/respone/Dashboard.model";
import { DateRangeModel } from "../../../core/models/DateRange.model";
import { ProjectInfoResModel } from "../model/respone/ProjectInfoRes.model";



@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private _http: HttpClient,
    private _auth: AuthService,
    private _alert: AlertService,
  ) { }

  login(user: UserModel) {
    return firstValueFrom(this._http.post<DataResponse<any>>(`${environment.apis.server}/api/v1/meesuanruamAd/login`, user).pipe(map(o => o)));
  }

  getReport() {
    const headers = { 'Authorization': `Bearer ${this._auth.accessToken}` }
    return firstValueFrom(this._http.get<DataResponse<GetReportModel[]>>(`${environment.apis.server}/api/v1/meesuanruamAd/getReport`, { headers })
      .pipe(catchError(error => { return this.handleError(error) }), map(o => o.result)));
  }

  getComment() {
    const headers = { 'Authorization': `Bearer ${this._auth.accessToken}` }
    return firstValueFrom(this._http.get<DataResponse<GetCommentModel[]>>(`${environment.apis.server}/api/v1/meesuanruamAd/getComment`, { headers }).pipe(catchError(error => { return this.handleError(error) }), map(o => o.result)));
  }

  getOTP(user: UserModel) {
    return firstValueFrom(this._http.post<DataResponse<any>>(`${environment.apis.server}/api/v1/meesuanruamAd/getOTP`, user).pipe(map(o => o)));
  }

  resetPassword(user: UserModel) {
    return firstValueFrom(this._http.post<DataResponse<any>>(`${environment.apis.server}/api/v1/meesuanruamAd/resetPassword`, user).pipe(map(o => o)));
  }

  getDashboard(dateRange: DateRangeModel) {
    let params = {
      start: dateRange.start,
      end: dateRange.end
    };
    const headers = { 'Authorization': `Bearer ${this._auth.accessToken}` }
    return firstValueFrom(this._http.get<DataResponse<DashboardModel>>(`${environment.apis.server}/api/v1/meesuanruamAd/getDashboard`, { params, headers }).pipe(map(o => o.result)));
  }

  getProjectList() {
    const headers = { 'Authorization': `Bearer ${this._auth.accessToken}` }
    return firstValueFrom(this._http.get<DataResponse<ProjectInfoResModel[]>>(`${environment.apis.server}/api/v1/meesuanruamAd/getProjectList`, { headers })
      .pipe(catchError(error => this.handleError(error)), map(o => o.result)));
  }

  getProjectInfo(projectCode: string) {
    const headers = { 'Authorization': `Bearer ${this._auth.accessToken}` }
    let params = {
      code: projectCode,
    };
    return firstValueFrom(this._http.get<DataResponse<ProjectInfoResModel>>(`${environment.apis.server}/api/v1/meesuanruamAd/getProjectInfo`, { params, headers })
      .pipe(catchError(error => this.handleError(error)), map(o => o.result)));
  }

  saveProjectInfo(body: ProjectInfoResModel) {
    const headers = { 'Authorization': `Bearer ${this._auth.accessToken}` };
    return firstValueFrom(this._http.post<DataResponse<any>>(`${environment.apis.server}/api/v1/meesuanruamAd/saveProjectInfo`, body, { headers })
      .pipe(catchError(error => this.handleError(error)), map(o => o)));
  }

  deleteProjectInfo(code: string) {
    const headers = { 'Authorization': `Bearer ${this._auth.accessToken}` }
    const params = new HttpParams()
      .set('code', code);
    return firstValueFrom(this._http.post<DataResponse<any>>(`${environment.apis.server}/api/v1/meesuanruamAd/deleteProjectInfo`, null, { headers, params })
      .pipe(catchError(error => this.handleError(error)), map(o => o)));
  }

  exportProjectInfo(code: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this._auth.accessToken}`
    });

    const params = new HttpParams()
      .set('code', code);

    return this._http.post(`${environment.apis.server}/api/v1/meesuanruamAd/exportProjectInfo`, null, {
      headers,
      params,
      responseType: 'blob'
    });
  }


  handleError(error: HttpErrorResponse) {
    console.log(error);
    if (error.status === 401) {
      this._auth.redirectLogin();
      this._alert.alert('error', 'ขออภัย!!', 'Token หมดอายุ');
    } else {
      this._alert.alert('error', 'ขออภัย!!', error.error.message ?? 'ระบบเกิดข้อผิดพลาด รอระบบปรับปรุง');
    }
    return throwError(() => new Error('ระบบเกิดข้อผิดพลาด รอระบบปรับปรุง'));
  }
}
