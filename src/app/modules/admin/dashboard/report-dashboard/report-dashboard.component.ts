import { AfterViewInit, Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { DashboardModel } from '../../../../share/model/respone/Dashboard.model';
import { AdminService } from '../../../../share/services/admin.service';
import { ChartComponent } from 'ng-apexcharts';



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
  selector: 'report-dashboard',
  templateUrl: './report-dashboard.component.html',
  styleUrl: './report-dashboard.component.scss',
  standalone: false
})
export class ReportDashboardComponent implements OnInit {
  reportTypeChartOptions: Partial<ChartOptions>;
  reportTotalChartOptions: Partial<ChartOptions>;

  @ViewChild("test") chart: ChartComponent;

  @Input() data: DashboardModel;
  constructor(private _adSer: AdminService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('data' in changes) {
      if (changes['data']?.currentValue && this.reportTypeChartOptions && this.reportTotalChartOptions) {
        this.reportTypeChartOptions.series = [
          {
            name: "การออกใบอนุญาตการก่อสร้าง",
            data: this.data.building_permit_issuance
          },
          {
            name: "การจัดซื้อจัดจ้างในโครงการทางหลวงท้องถิ่น",
            data: this.data.procurement_local_road
          },
          {
            name: "อื่นๆ",
            data: this.data.another
          },
        ];

        this.reportTotalChartOptions.series = [
          {
            data: this.data.report_per_day
          },
        ]
      }
    }
  }

  ngOnInit(): void {
    this.initChart();
  }


  initChart() {
    this.reportTypeChartOptions = {
      series: [
        {
          name: "การออกใบอนุญาตการก่อสร้าง",
          data: this.data.building_permit_issuance
        },
        {
          name: "การจัดซื้อจัดจ้างในโครงการทางหลวงท้องถิ่น",
          data: this.data.procurement_local_road
        },
        {
          name: "อื่นๆ",
          data: this.data.another
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
        text: 'สรุปรายการร้องเรียนแยกตามประเภท'
      }
    };

    this.reportTotalChartOptions = {
      series: [
        {
          data: this.data.report_per_day
        },
      ],
      chart: {
        type: "area",
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
        text: 'สรุปรายการร้องเรียนแยกตามประเภท'
      }
    };
  }

  changChart() {
    // this.chartOptions.series = [
    //   {
    //     name: "Free Cash Flow",
    //     data: data
    //   }
    // ];
  }

}
