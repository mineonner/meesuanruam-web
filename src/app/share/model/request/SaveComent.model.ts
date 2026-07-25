import { FileAttachment } from "../../../../core/models/FileAttachment.mode";

export class SaveComment {
  gender: string;
  occupation: string;
  location: string;
  plan_topic: string;
  plan_another_detail: string;
  detail: string;
  files: FileAttachment[] | null;
}
