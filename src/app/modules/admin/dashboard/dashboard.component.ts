import { Component } from '@angular/core';
import { AdminService } from '../../../share/services/admin.service';
import { DashboardModel } from '../../../share/model/respone/Dashboard.model';
import { FormControl, Validators } from '@angular/forms';
import { DateRangeModel } from '../../../../core/models/DateRange.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  standalone: false
})
export class DashboardComponent {
  data: DashboardModel;


  dateRange:DateRangeModel = new DateRangeModel();

  constructor(private _adSer: AdminService,
    private datePipe: DatePipe
  ) {
  }

  ngAfterViewInit() {
    this.loadData();
  }

  async loadData() {
    let startDate = new Date();
    startDate.setDate(startDate.getDate() + (-30));
    this.dateRange = {
      start : this.datePipe.transform(startDate, 'yyyy-MM-dd'),
      end: this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
    };
    this.data = await this._adSer.getDashboard(this.dateRange);
  }

  async search(){
    this.data = await this._adSer.getDashboard(this.dateRange);
  }
}
