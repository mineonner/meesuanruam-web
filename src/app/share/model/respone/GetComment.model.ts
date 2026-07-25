import { FileAttachment } from "../../../../core/models/FileAttachment.mode";

export class GetCommentModel {
  gender: string;
  occupation: string;
  location: string;
  plan_topic: string;
  plan_another_detail: string;
  create_date: string;
  detail: string;
  files: FileAttachment[] | null;
}
