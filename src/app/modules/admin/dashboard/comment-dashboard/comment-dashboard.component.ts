import { Component, Input, SimpleChanges } from '@angular/core';
import { DashboardModel } from '../../../../share/model/respone/Dashboard.model';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  title: ApexTitleSubtitle;
  fill: ApexFill;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  annotations: ApexAnnotations;
  colors: any;
  toolbar: any;
};

@Component({
  selector: 'comment-dashboard',
  templateUrl: './comment-dashboard.component.html',
  styleUrl: './comment-dashboard.component.scss',
  standalone: false
})
export class CommentDashboardComponent {
  commentTotalChartOptions: Partial<ChartOptions>;


  @Input() data: DashboardModel;

  ngOnChanges(changes: SimpleChanges): void {
    if ('data' in changes) {
      if (changes['data']?.currentValue && this.commentTotalChartOptions) {
        this.commentTotalChartOptions.series = [
          {
            name: "จำนวนความคิดเห็น",
            data: this.data.building_permit_issuance
          },
        ]
      }
    }
  }

  ngOnInit(): void {
    this.initChart();
  }

  initChart() {
    this.commentTotalChartOptions = {
      series: [
        {
          name: "จำนวนความคิดเห็น",
          data: this.data.building_permit_issuance
        },
      ],
      chart: {
        type: "bar",
        height: 350,
      },
      dataLabels: {
        enabled: false
      },
      markers: {
        size: 0
      },
      xaxis: {
        type: "datetime",
      },
      tooltip: {
        x: {
          format: "dd MMM yyyy"
        }
      },
      fill: {
        opacity: 1
      },
      title: {
        text: 'สรุปรายการแสดงความคิดเห็น'
      }
    };
  }
}
