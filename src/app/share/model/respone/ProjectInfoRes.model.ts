import { IndicatorsActhievementResModel } from "./IndicatorsActhievementRes.model";
import { MeasuresResModel } from "./MeasuresRes.model";
import { ProcessResModel } from "./ProcessRes.model";

export interface ProjectInfoResModel {
  code: string;
  name: string;
  status: string;
  create_date: string;
  create_by: string;
  measures: MeasuresResModel[];
  process: ProcessResModel[];
  indicators_acthievement: IndicatorsActhievementResModel[];
}
