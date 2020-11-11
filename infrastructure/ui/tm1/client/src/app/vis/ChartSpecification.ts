export type ChartType = "bar" | "line"
export type SizeClass = "fixedSize" | "autoSize"
export type OutcomeCategories = 'Alive' | 'Breast Cancer' | 'Other' | 'Disease Of Heart' 
export type PerformanceMeasures = 'Specificity' | 'Sensitivity' | 'Accuracy'
export type DescriptiveMeasures = 'Number of Cases'
export type NoLabel = ''
export var Pallette: Array<string>= ['#DEEAEE', '#B1CBBB', '#EEA29A', '#C94C4C']

export interface AxisData {
  perspective: Array<OutcomeCategories|PerformanceMeasures|NoLabel|DescriptiveMeasures> 
  x:string,
  y:Array<number>
}

export interface ChartJSYAxisData {
  label: string,
  data: Array<number>
  backgroundColor: string
}

export interface DataView {
  id: string
  sizeClass: SizeClass
  vis: ChartType
  title: string
  data: Array<AxisData>
}