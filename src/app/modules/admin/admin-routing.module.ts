import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from '../../share/services/auth.guard';
import { ReportManagementComponent } from './report-management/report-management.component';
import { CommentManagementComponent } from './comment-management/comment-management.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GuidePracticeComponent } from './guide-practice/guide-practice.component';
import { GuidePracticeEditComponent } from './guide-practice/guide-practice-edit/guide-practice-edit.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    component: AdminComponent,
    children: [
      {
        path: '',
        canActivateChild: [authGuard],
        children: [
          { path: 'dashboard', component: DashboardComponent},
          { path: 'report-management', component: ReportManagementComponent},
          { path: 'comment-management', component: CommentManagementComponent},
          { path: 'guide-practice', component: GuidePracticeComponent},
          { path: 'guide-practice-edit', component: GuidePracticeEditComponent},
          { path: 'guide-practice-edit/:code', component: GuidePracticeEditComponent},
          { path: '',   redirectTo: '/admin/dashboard', pathMatch: 'full' }
        ]
      }
    ]
  }, {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
