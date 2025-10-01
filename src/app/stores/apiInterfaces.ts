import { FrigateType, SettlementType } from '../lib/getNmsSave';

export interface ApiTaskData {
  frigates: FrigateType[];
  settlements: SettlementType[];
}

export type Nullable<T> = T | null;
