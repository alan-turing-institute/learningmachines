export type dataPurpose = 'test' | 'train' | 'unseen' 
export type dataAccessMode = 'online' | 'offline'
type iconShape = 'success-standard' | 'circle' | 'dot-circle'

export interface YearSelection {
  value: Date
  purpose: dataPurpose
  icon: iconShape
  numberOfRows: number
  valueAsSortable(value):number
}

export interface Incidences {
  "year":number,
  "numCases":number
}
