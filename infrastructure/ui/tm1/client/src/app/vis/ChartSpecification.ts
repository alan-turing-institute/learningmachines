export type ChartType = "bar" | "line"
export type SizeClass = "fixedSize" | "autoSize"
export type OutcomeCategories = 'Alive' | 'Breast Cancer' | 'Other' | 'Disease Of Heart' | ''

export interface AxisData {
  perspective: Array<OutcomeCategories> 
  x:string,
  y:Array<number>
}
export interface DataView {
  id: string
  sizeClass: SizeClass
  vis: ChartType
  title: string
  data: Array<AxisData>
}