import { Injectable } from '@angular/core';
import { FileAttachment } from '../../../core/models/FileAttachment.mode';

/**
 * พักไฟล์ที่ผู้ใช้เลือกไว้ในหน้าแบบประเมิน แล้วอัปทีเดียวตอนกดบันทึก
 *
 * ทำแบบเดียวกับหน้าแสดงความคิดเห็น: บันทึกข้อมูลก่อน แล้วค่อยส่งไฟล์ตามด้วยรหัสที่ได้กลับมา
 * ต้องพักไว้เพราะโครงการที่เพิ่งสร้างยังไม่มีรหัสจนกว่าจะบันทึกสำเร็จ
 *
 * กล่องแนบไฟล์ทั้ง 12 มาตรการอยู่คนละ component จึงต้องมีที่กลางให้หน้าแม่มาเก็บตอนบันทึก
 */
@Injectable({ providedIn: 'root' })
export class ProjectFileQueueService {
  private queue: { [measuresPrefix: string]: FileAttachment[] } = {};

  reset() {
    this.queue = {};
  }

  /** ไฟล์ที่ยังไม่ถูกอัป (ไม่มี id จากเซิร์ฟเวอร์) ของตัวชี้วัดหนึ่งข้อ */
  set(measuresPrefix: string, files: FileAttachment[]) {
    const pending = files.filter(f => f.file);
    if (pending.length > 0) {
      this.queue[measuresPrefix] = pending;
    } else {
      delete this.queue[measuresPrefix];
    }
  }

  pending(): { measuresPrefix: string, files: FileAttachment[] }[] {
    return Object.keys(this.queue).map(k => ({ measuresPrefix: k, files: this.queue[k] }));
  }

  get count(): number {
    return Object.keys(this.queue).reduce((n, k) => n + this.queue[k].length, 0);
  }
}
