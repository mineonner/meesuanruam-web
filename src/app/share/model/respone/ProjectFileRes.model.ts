export interface ProjectFileResModel {
  id: number;
  /** คีย์ของตัวชี้วัดที่ไฟล์นี้ผูกอยู่ เช่น Policy_Process_1 */
  measures_prefix: string;
  path?: string;
  name?: string;
  type?: string;
  size?: number;
}
