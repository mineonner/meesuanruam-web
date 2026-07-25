
import { FileAttachment } from "../../../../core/models/FileAttachment.mode";
import { ReportTopic } from "./ReportTopic.model";

export class SaveReport {
  persernal_type: string;
  name_title: string | null;
  name_title_another: string | null;
  firstname: string | null;
  lastname: string | null;
  email: string | null;
  telephone: string | null;
  report_government_agencies: string;
  report_topic: ReportTopic;
  report_detail: string;
  files: FileAttachment[] | null;
}
