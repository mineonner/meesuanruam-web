import { AdminService } from '../../../../../share/services/admin.service';
import { AlertService } from '../../../../../../core/services/alert.service';
import { FileAttachment } from '../../../../../../core/models/FileAttachment.mode';
import { ProjectFileResModel } from '../../../../../share/model/respone/ProjectFileRes.model';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProjectInfoResModel } from '../../../../../share/model/respone/ProjectInfoRes.model';

@Component({
  selector: 'measures-three',
  standalone: false,
  templateUrl: './measures-three.component.html',
  styleUrl: './measures-three.component.scss'
})
export class MeasuresThreeComponent {
  @Input() data: ProjectInfoResModel;
  @Output() dataChange: EventEmitter<ProjectInfoResModel> = new EventEmitter();
  measuresPrefix: string = 'Budget_Road'

  constructor(private _admin: AdminService, private _alert: AlertService) { }
  disableProcess: boolean = false;
  disableActhievement: boolean = false;

  measuresData: { [key: string]: boolean } = {
    [`${this.measuresPrefix}_Check_1`]: false,
    [`${this.measuresPrefix}_Check_2`]: false,
    [`${this.measuresPrefix}_Check_3`]: false,
    [`${this.measuresPrefix}_Check_4`]: false,
    [`${this.measuresPrefix}_Check_5`]: false,
  }

  processData: { [key: string]: string } = {
    [`${this.measuresPrefix}_Process_1`]: '0'
  }

  acthievementData: { [key: string]: string } = {
    [`${this.measuresPrefix}_Acthievement_1`]: '0'
  }

  async ngAfterViewInit() {
    while (!this.data) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    this.initData();
  }

  initData() {
    this.data.measures.map(o => {
      this.measuresData[o.measures_name] = o.measures_checked
    });

    this.data.process.map(o => {
      this.processData[o.process_name] = o.process_value
    });

    this.data.indicators_acthievement.map(o => {
      this.acthievementData[o.acthievement_name] = o.acthievement_value
    });

    this.initFiles();
  }

  measuresCheckChange(name: string, val: boolean) {
    this.data.measures = this.data.measures ?? [];
    let i = this.data.measures.findIndex(o => o.measures_name == name);
    if (i > -1) {
      this.data.measures[i].measures_checked = val;
    } else {
      this.data.measures.push({
        id: 0,
        measures_name: name,
        measures_checked: val
      });
    }

    let processValue = this.data.measures.filter(o => o.measures_checked && o.measures_name.includes(this.measuresPrefix)).length.toString();
    this.processChange(`${this.measuresPrefix}_Process_1`, processValue);

    this.emitData();
  }

  processChange(name: string, val: string) {
    this.processData[name] = val
    this.data.process = this.data.process ?? [];

    let i = this.data.process.findIndex(o => o.process_name == name);

    if (i > -1) {
      this.data.process[i].process_value = val;
    } else {
      this.data.process.push({
        id: 0,
        process_name: name,
        process_value: val
      });
    }

    this.emitData();
  }

  acthievementChange(name: string, val: string) {
    this.acthievementData[name] = val
    this.data.indicators_acthievement = this.data.indicators_acthievement ?? [];

    let i = this.data.indicators_acthievement.findIndex(o => o.acthievement_name == name);

    if (i > -1) {
      this.data.indicators_acthievement[i].acthievement_value = val;
    } else {
      this.data.indicators_acthievement.push({
        id: 0,
        acthievement_name: name,
        acthievement_value: val
      });
    }

    this.emitData();
  }

  emitData() {
    this.dataChange.emit(this.data);
  }

  // รหัสโครงการที่เข้ารหัสแล้ว ว่างแปลว่ายังไม่เคยบันทึก จึงยังแนบไฟล์ไม่ได้
  @Input() projectCode: string | null = null;

  // แยกไฟล์เป็นถังตามคีย์ตัวชี้วัด เพื่อให้ m-input-file ผูกกับ array ได้ตรงๆ
  fileBuckets: { [key: string]: FileAttachment[] } = {};
  private fileIds: { [key: string]: { [name: string]: number } } = {};

  filesOf(key: string): FileAttachment[] {
    return this.fileBuckets[key] = this.fileBuckets[key] ?? [];
  }

  initFiles() {
    this.fileBuckets = {};
    this.fileIds = {};
    (this.data.files ?? []).forEach(f => {
      this.filesOf(f.measures_prefix).push({
        path: f.path, name: f.name, type: f.type, size: f.size, file: null
      });
      this.fileIds[f.measures_prefix] = this.fileIds[f.measures_prefix] ?? {};
      this.fileIds[f.measures_prefix][f.name ?? ''] = f.id;
    });
  }

  async onFilesChange(key: string, files: FileAttachment[]) {
    const pending = files.filter(f => f.file);
    if (pending.length == 0) return;

    if (!this.projectCode) {
      this._alert.alert('error', 'แนบไฟล์ไม่ได้', 'กรุณาบันทึกโครงการก่อน');
      pending.forEach(f => files.splice(files.indexOf(f), 1));
      return;
    }

    const res = await this._admin.uploadProjectFiles(this.projectCode, key, pending);
    if (res.status == 'success') {
      // endpoint คืนแถวที่สร้างมาให้ จึงได้ id ไว้สั่งลบทันทีโดยไม่ต้องโหลดหน้าใหม่
      (res.result ?? []).forEach((r: ProjectFileResModel) => {
        this.fileIds[key] = this.fileIds[key] ?? {};
        this.fileIds[key][r.name ?? ''] = r.id;
        const local = files.find(f => f.name == r.name);
        if (local) { local.file = null; local.path = r.path; }
      });
    } else {
      this._alert.alert('error', 'แนบไฟล์ไม่สำเร็จ', res.message ?? '');
      pending.forEach(f => { const i = files.indexOf(f); if (i > -1) files.splice(i, 1); });
    }
  }

  async onFileRemoved(key: string, file: FileAttachment) {
    const id = this.fileIds[key]?.[file.name ?? ''];
    if (!id) return;
    await this._admin.deleteProjectFile(id);
    delete this.fileIds[key][file.name ?? ''];
  }
}
