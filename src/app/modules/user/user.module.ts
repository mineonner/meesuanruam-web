import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MenuSidebarComponent } from './menu-sidebar/menu-sidebar.component';
import { ReportComponent } from './report/report.component';
import { ControlsModule } from '../../../core/controls/controls.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommentComponent } from './comment/comment.component';



@NgModule({
  declarations: [
    UserComponent,
     MenuSidebarComponent,
     ReportComponent,
     CommentComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    FontAwesomeModule,
    ControlsModule,
    ReactiveFormsModule,
  ]
})
export class UserModule { }
