import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FileAttachment } from "../../../core/models/FileAttachment.mode";
import { firstValueFrom, map } from "rxjs";
import { DataResponse } from "../model/DataRespone.model";
import { environment } from "../environment";
import { SaveReport } from "../model/request/SaveReport.model";
import { SaveComment } from "../model/request/SaveComent.model";


@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private _http: HttpClient) { }

  uploadFile(pathFile:string, files: FileAttachment[]) {
    let form: FormData = new FormData();
    form.append('pathFile',pathFile);
    files.forEach(f => { form.append('formFiles', f.file, f.file.name); });
    form.forEach(e =>  console.log(e));

    return firstValueFrom(this._http.post<DataResponse<any>>(`${environment.apis.server}/api/v1/Upload/saveImages`
      , form
      )
      .pipe(map(o => o)));
  }

  saveReport(report: SaveReport){
    return firstValueFrom(this._http.post<DataResponse<any>>(`${environment.apis.server}/api/v1/meesuanruam/saveReport`,report).pipe(map(o => o)));
  }

  saveComment(com: SaveComment){
    return firstValueFrom(this._http.post<DataResponse<any>>(`${environment.apis.server}/api/v1/meesuanruam/saveComment`,com).pipe(map(o => o)));
  }
}
