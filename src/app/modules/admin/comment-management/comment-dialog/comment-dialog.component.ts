import { Component, Input } from '@angular/core';
import { GetCommentModel } from '../../../../share/model/respone/GetComment.model';

@Component({
  selector: 'comment-dialog',
  templateUrl: './comment-dialog.component.html',
  styleUrl: './comment-dialog.component.scss',
  standalone: false
})
export class CommentDialogComponent {
  @Input() data:GetCommentModel;

  genderOptions: object =
  {
    male: 'ชาย',
    female: 'หญิง',
  };

planTopicOptions: object =
  {
    "Industrial-Engineering": 'แผนอุตสาหกรรมและการโยธา',
    "Another": 'อื่นๆ',
  };
}
