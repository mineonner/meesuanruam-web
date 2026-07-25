import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProjectInfoResModel } from '../../../../../share/model/respone/ProjectInfoRes.model';

@Component({
  selector: 'measures-ten',
  standalone: false,
  templateUrl: './measures-ten.component.html',
  styleUrl: './measures-ten.component.scss'
})
export class MeasuresTenComponent {
  @Input() data: ProjectInfoResModel;
  @Output() dataChange: EventEmitter<ProjectInfoResModel> = new EventEmitter();
  measuresPrefix: string = 'Prevention_Suppression'
  disableProcess: boolean = false;
  disableActhievement: boolean = false;

  measuresData: { [key: string]: boolean } = {
    [`${this.measuresPrefix}_Check_1`]: false,
    [`${this.measuresPrefix}_Check_2`]: false,
    [`${this.measuresPrefix}_Check_3`]: false,
    [`${this.measuresPrefix}_Check_4`]: false,
    [`${this.measuresPrefix}_Check_5`]: false,
  }

  processData: { [key: string]: string } = {
    [`${this.measuresPrefix}_Process_1`]: '0'
  }

  acthievementData: { [key: string]: string } = {
    [`${this.measuresPrefix}_Acthievement_1`]: '0'
  }

  async ngAfterViewInit() {
    while (!this.data) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    this.initData();
  }

  initData() {
    this.data.measures.map(o => {
      this.measuresData[o.measures_name] = o.measures_checked
    });

    this.data.process.map(o => {
      this.processData[o.process_name] = o.process_value
    });

    this.data.indicators_acthievement.map(o => {
      this.acthievementData[o.acthievement_name] = o.acthievement_value
    });
  }

  measuresCheckChange(name: string, val: boolean) {
    this.data.measures = this.data.measures ?? [];
    let i = this.data.measures.findIndex(o => o.measures_name == name);
    if (i > -1) {
      this.data.measures[i].measures_checked = val;
    } else {
      this.data.measures.push({
        id: 0,
        measures_name: name,
        measures_checked: val
      });
    }

    let processValue = this.data.measures.filter(o => o.measures_checked && o.measures_name.includes(this.measuresPrefix)).length.toString();
    this.processChange(`${this.measuresPrefix}_Process_1`, processValue);

    this.emitData();
  }

  processChange(name: string, val: string) {
    this.processData[name] = val
    this.data.process = this.data.process ?? [];

    let i = this.data.process.findIndex(o => o.process_name == name);

    if (i > -1) {
      this.data.process[i].process_value = val;
    } else {
      this.data.process.push({
        id: 0,
        process_name: name,
        process_value: val
      });
    }

    this.emitData();
  }

  acthievementChange(name: string, val: string) {
    this.acthievementData[name] = val
    this.data.indicators_acthievement = this.data.indicators_acthievement ?? [];

    let i = this.data.indicators_acthievement.findIndex(o => o.acthievement_name == name);

    if (i > -1) {
      this.data.indicators_acthievement[i].acthievement_value = val;
    } else {
      this.data.indicators_acthievement.push({
        id: 0,
        acthievement_name: name,
        acthievement_value: val
      });
    }

    this.emitData();
  }

  emitData() {
    this.dataChange.emit(this.data);
  }
}
