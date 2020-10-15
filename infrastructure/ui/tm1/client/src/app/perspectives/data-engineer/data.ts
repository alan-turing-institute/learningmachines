type dataPurpose = 'test' | 'train' | 'unseen' 
type iconShape = 'success-standard' | 'circle' | 'dot-circle'

export interface YearSelection {
  value: string
  purpose: dataPurpose
  icon: iconShape
  numberOfRows: number
}