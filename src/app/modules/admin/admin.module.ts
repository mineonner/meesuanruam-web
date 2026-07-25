import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ControlsModule } from '../../../core/controls/controls.module';
import { AdminMenuSidebarComponent } from './admin-menu-sidebar/admin-menu-sidebar.component';
import { ReportManagementComponent } from './report-management/report-management.component';
import { CommentManagementComponent } from './comment-management/comment-management.component';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import { AdminRoutingModule } from './admin-routing.module';
import { ReportDialogComponent } from './report-management/report-dialog/report-dialog.component';
import { MeeViewComponent } from '../../share/mee-view/mee-view.component';
import { CommentDialogComponent } from './comment-management/comment-dialog/comment-dialog.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ReportDashboardComponent } from './dashboard/report-dashboard/report-dashboard.component';
import { CommentDashboardComponent } from './dashboard/comment-dashboard/comment-dashboard.component';
import { GuidePracticeComponent } from './guide-practice/guide-practice.component';
import { GuidePracticeEditComponent } from './guide-practice/guide-practice-edit/guide-practice-edit.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { MeasuresTwoComponent } from './guide-practice/measures-content/measures-two/measures-two.component';
import { MeasuresOneComponent } from './guide-practice/measures-content/measures-one/measures-one.component';
import { MeasuresThreeComponent } from './guide-practice/measures-content/measures-three/measures-three.component';
import { MeasuresFourComponent } from './guide-practice/measures-content/measures-four/measures-four.component';
import { MeasuresFiveComponent } from './guide-practice/measures-content/measures-five/measures-five.component';
import { MeasuresSixComponent } from './guide-practice/measures-content/measures-six/measures-six.component';
import { MeasuresSevenComponent } from './guide-practice/measures-content/measures-seven/measures-seven.component';
import { MeasuresEightComponent } from './guide-practice/measures-content/measures-eight/measures-eight.component';
import { MeasuresNineComponent } from './guide-practice/measures-content/measures-nine/measures-nine.component';
import { MeasuresTenComponent } from './guide-practice/measures-content/measures-ten/measures-ten.component';
import { MeasuresElevenComponent } from './guide-practice/measures-content/measures-eleven/measures-eleven.component';
import { MeasuresTwelveComponent } from './guide-practice/measures-content/measures-twelve/measures-twelve.component';

@NgModule({
  declarations: [
    AdminComponent,
    LoginComponent,
    AdminMenuSidebarComponent,
    ReportManagementComponent,
    CommentManagementComponent,
    ReportDialogComponent,
    MeeViewComponent,
    CommentDialogComponent,
    DashboardComponent,
    ReportDashboardComponent,
    CommentDashboardComponent,
    GuidePracticeComponent,
    GuidePracticeEditComponent,
    MeasuresOneComponent,
    MeasuresTwoComponent,
    MeasuresThreeComponent,
    MeasuresFourComponent,
    MeasuresFiveComponent,
    MeasuresSixComponent,
    MeasuresSevenComponent,
    MeasuresEightComponent,
    MeasuresNineComponent,
    MeasuresTenComponent,
    MeasuresElevenComponent,
    MeasuresTwelveComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FontAwesomeModule,
    ControlsModule,
    MatTableModule,
    MatSortModule,
    NgApexchartsModule,
    MatExpansionModule
  ]
})
export class AdminModule { }
