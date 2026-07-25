import { FileAttachment } from "../../../../core/models/FileAttachment.mode";
import { ReportTopic } from "../request/ReportTopic.model";

export interface GetReportModel {
  persernal_type: string;
  name_title: string;
  name_title_another: string;
  firstname: string;
  lastname: string;
  email: string;
  telephone: string;
  report_government_agencies: string;
  report_detail: string;
  create_date: string;
  report_topic: ReportTopic;
  files: FileAttachment[];
}
